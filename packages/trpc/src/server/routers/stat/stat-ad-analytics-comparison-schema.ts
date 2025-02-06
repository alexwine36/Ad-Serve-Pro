import { StatsCompareInput } from '@repo/common-types';
import type { z } from 'zod';
import { BaseStatAdAnalyticsSchema } from './stat-ad-analytics-schema';

export const StatAdAnalyticsComparisonSchema = StatsCompareInput.merge(
  BaseStatAdAnalyticsSchema
).extend({
  // Define your schema here
  //   type: AnalyticsType.optional(),
});

export type StatAdAnalyticsComparisonSchema = z.infer<
  typeof StatAdAnalyticsComparisonSchema
>;
