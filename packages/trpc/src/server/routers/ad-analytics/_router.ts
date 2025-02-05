import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { AdAnalyticsStatsSchema } from './ad-analytics-stats-schema'
import { adAnalyticsStatsHandler } from './ad-analytics-stats-handler'
import { router } from '@repo/trpc/src/server/trpc';
import { adAnalyticsCreateHandler } from './ad-analytics-create-handler';
import { AdAnalyticsCreateSchema } from './ad-analytics-create-schema';
import { adAnalyticsGetAllHandler } from './ad-analytics-get-all-handler';
import { AdAnalyticsGetAllSchema } from './ad-analytics-get-all-schema';

// Imports

export const adAnalyticsRouter = router({
  // Handlers

stats: authedProcedure.input(AdAnalyticsStatsSchema).query(adAnalyticsStatsHandler),

  create: authedProcedure
    .input(AdAnalyticsCreateSchema)
    .mutation(adAnalyticsCreateHandler),

  getAll: authedProcedure
    .input(AdAnalyticsGetAllSchema)
    .query(adAnalyticsGetAllHandler),
});
