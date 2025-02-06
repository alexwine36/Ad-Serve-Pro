import { database } from '@repo/database/database';
import { inngest } from '@repo/inngest/lib/client';
import { groupBy, isNonNullish } from 'remeda';
import {
  CampaignDataStep,
  CampaignUpdateStatusEvent,
  eventKey,
} from './update-status-types';

export const campaignUpdateStatusFunction = inngest.createFunction(
  {
    id: 'campaign.update.status',
  },
  {
    event: eventKey,
  },
  async ({ event, step, runId }) => {
    const { data } = CampaignUpdateStatusEvent.parse(event);
    const { type, items } = data;
    console.log(type, items);
    if (type === 'ACTIVE') {
      const res = items.filter((i) => i.endDate < new Date());

      if (res.length) {
        await step.run('update active campaigns', async () => {
          const resp = await database.campaign.updateMany({
            where: {
              id: {
                in: res.map((i) => i.id),
              },
            },
            data: {
              status: 'COMPLETED',
            },
          });
          return resp;
        });
      } else {
        return 'No active campaigns to update';
      }
    }
    if (type === 'SCHEDULED') {
      const res = items.filter((i) => i.startDate < new Date());

      if (res.length) {
        await step.run('update to active', async () => {
          const resp = await database.campaign.updateMany({
            where: {
              id: {
                in: res.map((i) => i.id),
              },
            },
            data: {
              status: 'ACTIVE',
            },
          });
          return resp;
        });
      } else {
        return 'No scheduled campaigns to update';
      }
    }
  }
);

export const campaignUpdateStatusCronFunction = inngest.createFunction(
  {
    id: 'campaign.update.status.cron',
  },
  {
    cron: 'TZ=Europe/Paris 0 12 * * 5',
  },
  async ({ step }) => {
    const data = await step.run('get campaigns', async () => {
      const res = await database.campaign.findMany({
        where: {
          OR: [
            {
              status: 'ACTIVE',
              endDate: {
                lt: new Date(),
              },
            },
            {
              status: 'SCHEDULED',
              startDate: {
                lte: new Date(),
              },
            },
          ],
        },
      });
      return res;
    });

    const eventMap = groupBy(
      data.map((i) => CampaignDataStep.safeParse(i).data).filter(isNonNullish),
      (item) => item.status
    );

    const activeEvents = eventMap.ACTIVE;
    const scheduledEvents = eventMap.SCHEDULED;

    if (activeEvents?.length) {
      await step.sendEvent(eventKey, {
        name: eventKey,
        data: {
          type: 'ACTIVE',
          items: activeEvents,
        },
      });
    }

    if (scheduledEvents?.length) {
      await step.sendEvent(eventKey, {
        name: eventKey,
        data: {
          type: 'SCHEDULED',
          items: scheduledEvents,
        },
      });
    }
    return {
      activeEvents,
      scheduledEvents,
    };
  }
);
