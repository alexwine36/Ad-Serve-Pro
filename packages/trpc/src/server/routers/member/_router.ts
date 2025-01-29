import authedProcedure from '@/server/procedures/authed-procedure';
import { router } from '@/server/trpc';

// Imports

import { memberGetAllHandler } from './member-get-all-handler';
import { MemberGetAllSchema } from './member-get-all-schema';
export const memberRouter = router({
  // Handlers

  getAll: authedProcedure.input(MemberGetAllSchema).query(memberGetAllHandler),
});
