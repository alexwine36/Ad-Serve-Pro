import { AdAnalyticsInput, ClientInput } from '@repo/common-types';
import { z } from 'zod';

export const AdAnalyticsCreateSchema = z.object({
  // Define your schema here
  client: ClientInput,
  events: AdAnalyticsInput.omit({
    clientId: true,
  })
    .array()
    .default([]),
});

export type AdAnalyticsCreateSchema = z.infer<typeof AdAnalyticsCreateSchema>;
