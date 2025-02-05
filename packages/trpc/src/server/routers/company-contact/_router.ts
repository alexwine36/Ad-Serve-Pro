import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { companyContactCreateHandler } from './company-contact-create-handler';
import { CompanyContactCreateSchema } from './company-contact-create-schema';
import { companyContactDeleteHandler } from './company-contact-delete-handler';
import { CompanyContactDeleteSchema } from './company-contact-delete-schema';
import { companyContactGetAllHandler } from './company-contact-get-all-handler';
import { CompanyContactGetAllSchema } from './company-contact-get-all-schema';
import { companyContactGetOneHandler } from './company-contact-get-one-handler';
import { CompanyContactGetOneSchema } from './company-contact-get-one-schema';
import { companyContactUpdateHandler } from './company-contact-update-handler';
import { CompanyContactUpdateSchema } from './company-contact-update-schema';

// Imports

export const companyContactRouter = router({
  // Handlers

  delete: authedProcedure
    .input(CompanyContactDeleteSchema)
    .mutation(companyContactDeleteHandler),

  update: authedProcedure
    .input(CompanyContactUpdateSchema)
    .mutation(companyContactUpdateHandler),

  create: authedProcedure
    .input(CompanyContactCreateSchema)
    .mutation(companyContactCreateHandler),

  getOne: authedProcedure
    .input(CompanyContactGetOneSchema)
    .query(companyContactGetOneHandler),

  getAll: authedProcedure
    .input(CompanyContactGetAllSchema)
    .query(companyContactGetAllHandler),
});
