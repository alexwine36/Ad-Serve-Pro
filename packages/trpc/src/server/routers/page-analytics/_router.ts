import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { PageAnalyticsCreateSchema } from './page-analytics-create-schema'
import { pageAnalyticsCreateHandler } from './page-analytics-create-handler'
import { PageAnalyticsGetAllSchema } from './page-analytics-get-all-schema'
import { pageAnalyticsGetAllHandler } from './page-analytics-get-all-handler'
import { router } from '@repo/trpc/src/server/trpc';

// Imports

export const pageAnalyticsRouter = router({
// Handlers

create: authedProcedure.input(PageAnalyticsCreateSchema).mutation(pageAnalyticsCreateHandler),

getAll: authedProcedure.input(PageAnalyticsGetAllSchema).query(pageAnalyticsGetAllHandler),
});