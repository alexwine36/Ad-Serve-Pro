import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { StatAdAnalyticsComparisonSchema } from './stat-ad-analytics-comparison-schema'
import { statAdAnalyticsComparisonHandler } from './stat-ad-analytics-comparison-handler'
import { StatAdAnalyticsSchema } from './stat-ad-analytics-schema'
import { statAdAnalyticsHandler } from './stat-ad-analytics-handler'
import { router } from '@repo/trpc/src/server/trpc';

// Imports

export const statRouter = router({
// Handlers

adAnalyticsComparison: authedProcedure.input(StatAdAnalyticsComparisonSchema).query(statAdAnalyticsComparisonHandler),

adAnalytics: authedProcedure.input(StatAdAnalyticsSchema).query(statAdAnalyticsHandler),
});