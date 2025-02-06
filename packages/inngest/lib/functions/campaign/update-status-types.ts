import type { LiteralZodEventSchema } from 'inngest';
import { z } from 'zod';
import { CampaignData, CampaignStatus } from '../../../../common-types';

export const eventKey = 'campaign/update.status' as const;

export const CampaignDataStep = CampaignData.extend({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CampaignUpdateStatusEvent = z.object({
  name: z.literal(eventKey),
  data: z.object({
    type: CampaignStatus,
    items: z.array(CampaignDataStep),
  }),
}) satisfies LiteralZodEventSchema;
export type CampaignUpdateStatusEvent = z.infer<
  typeof CampaignUpdateStatusEvent
>;
