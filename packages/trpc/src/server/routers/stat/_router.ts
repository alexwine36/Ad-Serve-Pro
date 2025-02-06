import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { statAdAnalyticsComparisonHandler } from './stat-ad-analytics-comparison-handler';
import { StatAdAnalyticsComparisonSchema } from './stat-ad-analytics-comparison-schema';
import { statAdAnalyticsHandler } from './stat-ad-analytics-handler';
import { StatAdAnalyticsSchema } from './stat-ad-analytics-schema';

// Imports

export const statRouter = router({
  // Handlers

  adAnalyticsComparison: authedProcedure
    .input(StatAdAnalyticsComparisonSchema)
    .query(statAdAnalyticsComparisonHandler),

  adAnalytics: authedProcedure
    .input(StatAdAnalyticsSchema)
    .query(statAdAnalyticsHandler),
});
