import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';

// Imports

import { meHandler } from './me-handler';
import { MeSchema } from './me-schema';
import { setCurrentOrgHandler } from './set-current-org-handler';
import { SetCurrentOrgSchema } from './set-current-org-schema';
export const userRouter = router({
  // Handlers

  setCurrentOrg: authedProcedure
    .input(SetCurrentOrgSchema)
    .mutation(setCurrentOrgHandler),

  me: authedProcedure.input(MeSchema).query(meHandler),
});
