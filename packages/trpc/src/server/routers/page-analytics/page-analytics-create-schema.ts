import { ClientInput, PageAnalyticsInput } from '@repo/common-types';
import { z } from 'zod';

export const PageAnalyticsCreateSchema = z.object({
  client: ClientInput,
  events: PageAnalyticsInput.omit({
    clientId: true,
  })
    .array()
    .default([]),
});

export type PageAnalyticsCreateSchema = z.infer<
  typeof PageAnalyticsCreateSchema
>;
