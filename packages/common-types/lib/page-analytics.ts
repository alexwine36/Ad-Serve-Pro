import { z } from 'zod';
import { PageAnalyticsSchema, PageAnalyticsTypeSchema } from './generated';

export const PageAnalyticsType = PageAnalyticsTypeSchema;
export type PageAnalyticsType = z.infer<typeof PageAnalyticsType>;

export const PageAnalyticsData = PageAnalyticsSchema.extend({
  // Update base types here
  metadata: z.object({}).default({}),
});

export type PageAnalyticsData = z.infer<typeof PageAnalyticsData>;

export const PageAnalyticsUpdateInput = PageAnalyticsData.omit({
  // createdAt: true,
  // updatedAt: true,
  // organizationId: true,
});

export type PageAnalyticsUpdateInput = z.infer<typeof PageAnalyticsUpdateInput>;

export const PageAnalyticsInput = PageAnalyticsUpdateInput.partial({
  id: true,
  clientId: true,
}).extend({
  timestamp: z.number(),
});
export type PageAnalyticsInput = z.infer<typeof PageAnalyticsInput>;
