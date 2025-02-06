import { AnalyticsType, StatsInput } from '@repo/common-types';
import { z } from 'zod';

export const BaseStatAdAnalyticsSchema = z.object({
  type: AnalyticsType.optional(),
});

export const StatAdAnalyticsSchema = StatsInput.merge(
  BaseStatAdAnalyticsSchema
);

export type StatAdAnalyticsSchema = z.infer<typeof StatAdAnalyticsSchema>;
