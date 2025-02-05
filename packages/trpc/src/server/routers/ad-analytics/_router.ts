import authedProcedure from '@/server/procedures/authed-procedure';
import { AdAnalyticsCreateSchema } from './ad-analytics-create-schema'
import { adAnalyticsCreateHandler } from './ad-analytics-create-handler'
import { AdAnalyticsGetAllSchema } from './ad-analytics-get-all-schema'
import { adAnalyticsGetAllHandler } from './ad-analytics-get-all-handler'
import { router } from '@/server/trpc';

// Imports

export const adAnalyticsRouter = router({
    // Handlers

create: authedProcedure.input(AdAnalyticsCreateSchema).mutation(adAnalyticsCreateHandler),

getAll: authedProcedure.input(AdAnalyticsGetAllSchema).query(adAnalyticsGetAllHandler),
});