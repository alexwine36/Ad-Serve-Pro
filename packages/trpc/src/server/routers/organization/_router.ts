import { router } from '@repo/trpc/src/server/trpc';
import authedProcedure from '../../procedures/authed-procedure';
// Imports

import { organizationCreateHandler } from './organization-create-handler';
import { OrganizationCreateSchema } from './organization-create-schema';
import { organizationGetAllHandler } from './organization-get-all-handler';
import { OrganizationGetAllSchema } from './organization-get-all-schema';
import { organizationGetOneHandler } from './organization-get-one-handler';
import { OrganizationGetOneSchema } from './organization-get-one-schema';
import { organizationUpdateHandler } from './organization-update-handler';
import { OrganizationUpdateSchema } from './organization-update-schema';
export const organizationRouter = router({
  // Handlers

  update: authedProcedure
    .input(OrganizationUpdateSchema)
    .mutation(organizationUpdateHandler),

  getOne: authedProcedure
    .input(OrganizationGetOneSchema)
    .query(organizationGetOneHandler),

  create: authedProcedure
    .input(OrganizationCreateSchema)
    .mutation(organizationCreateHandler),

  getAll: authedProcedure
    .input(OrganizationGetAllSchema)
    .query(organizationGetAllHandler),

  // getAll: authedProcedure.query(async ({ ctx }) => {
  //   const data = await ctx.prisma.page.findMany();
  //   const orgs = await ctx.prisma.user.findMany();
  //   return {
  //     data,
  //     orgs,
  //   };
  // }),
});
