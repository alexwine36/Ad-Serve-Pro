import { z } from 'zod';
import { AdAnalyticsSchema, AnalyticsTypeSchema } from './generated';

export const AnalyticsType = AnalyticsTypeSchema;
export type AnalyticsType = z.infer<typeof AnalyticsType>;

export const AdAnalyticsData = AdAnalyticsSchema.extend({
  // Update base types here
  metadata: z.object({}).default({}),
});

export type AdAnalyticsData = z.infer<typeof AdAnalyticsData>;

export const AdAnalyticsUpdateInput = AdAnalyticsData.omit({
  // createdAt: true,
  // updatedAt: true,
  // organizationId: true,
});

export type AdAnalyticsUpdateInput = z.infer<typeof AdAnalyticsUpdateInput>;

export const AdAnalyticsInput = AdAnalyticsUpdateInput.partial({
  id: true,
}).extend({
  timestamp: z.number().transform((val) => new Date(val)),
});
export type AdAnalyticsInput = z.infer<typeof AdAnalyticsInput>;
