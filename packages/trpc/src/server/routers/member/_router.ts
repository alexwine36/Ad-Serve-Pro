import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';

// Imports

import { memberCreateHandler } from './member-create-handler';
import { MemberCreateSchema } from './member-create-schema';
import { memberGetAllHandler } from './member-get-all-handler';
import { MemberGetAllSchema } from './member-get-all-schema';
import { memberUpdateHandler } from './member-update-handler';
import { MemberUpdateSchema } from './member-update-schema';
export const memberRouter = router({
  // Handlers

  create: authedProcedure
    .input(MemberCreateSchema)
    .mutation(memberCreateHandler),

  update: authedProcedure
    .input(MemberUpdateSchema)
    .mutation(memberUpdateHandler),

  getAll: authedProcedure.input(MemberGetAllSchema).query(memberGetAllHandler),
});
