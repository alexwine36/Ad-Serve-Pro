import { z } from 'zod';
import { AdAnalyticsInput } from './ad-analytics';
import { ClientInput } from './client';
import { PageAnalyticsInput } from './page-analytics';

export const AdvertisementAnalyticsEventInput = z.discriminatedUnion('type', [
  AdAnalyticsInput,
  PageAnalyticsInput,
]);

export type AdvertisementAnalyticsEventInput = z.infer<
  typeof AdvertisementAnalyticsEventInput
>;

export const AdvertisementAnalyticsInput = z.object({
  client: ClientInput,
  events: AdvertisementAnalyticsEventInput.array().default([]),
});

export type AdvertisementAnalyticsInput = z.infer<
  typeof AdvertisementAnalyticsInput
>;

export const parseDataToHandlers = (data: AdvertisementAnalyticsInput) => {
  return data.events.reduce(
    (acc, event) => {
      if (event.type === 'PAGE_VIEW') {
        acc.page.push(event);
      } else {
        acc.ad.push(event);
      }
      return acc;
    },
    {
      ad: [] as AdAnalyticsInput[],
      page: [] as PageAnalyticsInput[],
      client: data.client,
    }
  );
};
