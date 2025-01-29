import { router } from '@/server/trpc';
import authedProcedure from '../../procedures/authed-procedure';
// Imports

import { createHandler } from './create-handler';
import { CreateSchema } from './create-schema';
import { getOneHandler } from './get-one-handler';
import { GetOneSchema } from './get-one-schema';
import { organizationGetAllHandler } from './organization-get-all-handler';
import { OrganizationGetAllSchema } from './organization-get-all-schema';
import { updateHandler } from './update-handler';
import { UpdateSchema } from './update-schema';
export const organizationRouter = router({
  // Handlers

  getAll: authedProcedure
    .input(OrganizationGetAllSchema)
    .query(organizationGetAllHandler),

  update: authedProcedure.input(UpdateSchema).mutation(updateHandler),

  create: authedProcedure.input(CreateSchema).mutation(createHandler),

  getOne: authedProcedure.input(GetOneSchema).query(getOneHandler),

  // getAll: authedProcedure.query(async ({ ctx }) => {
  //   const data = await ctx.prisma.page.findMany();
  //   const orgs = await ctx.prisma.user.findMany();
  //   return {
  //     data,
  //     orgs,
  //   };
  // }),
});
