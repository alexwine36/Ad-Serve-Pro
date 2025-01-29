import captureErrorsMiddleware from '../middlewares/capture-errors-middleware';
import perfMiddleware from '../middlewares/perf-middleware';
import {
  isAdminMiddleware,
  isAuthed,
  isOrgAdminMiddleware,
} from '../middlewares/session-middleware';
import { procedure } from '../trpc';
import publicProcedure from './public-procedure';

/*interface IRateLimitOptions {
  intervalInMs: number;
  limit: number;
}
const isRateLimitedByUserIdMiddleware = ({ intervalInMs, limit }: IRateLimitOptions) =>
  middleware(({ ctx, next }) => {
      // validate user exists
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { isRateLimited } = rateLimit({ intervalInMs }).check(limit, ctx.user.id.toString());

      if (isRateLimited) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      }

      return next({ ctx: { user: ctx.user, session: ctx.session } });
    });
*/
const authedProcedure = procedure
  .use(captureErrorsMiddleware)
  .use(perfMiddleware)
  .use(isAuthed);
/*export const authedRateLimitedProcedure = ({ intervalInMs, limit }: IRateLimitOptions) =>
authedProcedure.use(isRateLimitedByUserIdMiddleware({ intervalInMs, limit }));*/
export const authedAdminProcedure = publicProcedure
  .use(captureErrorsMiddleware)
  .use(isAdminMiddleware);
export const authedOrgAdminProcedure = publicProcedure
  .use(captureErrorsMiddleware)
  .use(isOrgAdminMiddleware);

export default authedProcedure;
