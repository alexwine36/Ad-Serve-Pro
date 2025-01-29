import captureErrorsMiddleware from '../middlewares/capture-errors-middleware';
import perfMiddleware from '../middlewares/perf-middleware';
import { procedure } from '../trpc';

const publicProcedure = procedure
  .use(captureErrorsMiddleware)
  .use(perfMiddleware);

export default publicProcedure;
