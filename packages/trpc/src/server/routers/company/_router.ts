import authedProcedure from '@/server/procedures/authed-procedure';
import { router } from '@/server/trpc';

// Imports

import { companyCreateHandler } from './company-create-handler';
import { CompanyCreateSchema } from './company-create-schema';
import { companyEditHandler } from './company-edit-handler';
import { CompanyEditSchema } from './company-edit-schema';
import { companyGetAllHandler } from './company-get-all-handler';
import { CompanyGetAllSchema } from './company-get-all-schema';
export const companyRouter = router({
  // Handlers

  edit: authedProcedure.input(CompanyEditSchema).mutation(companyEditHandler),

  create: authedProcedure
    .input(CompanyCreateSchema)
    .mutation(companyCreateHandler),

  getAll: authedProcedure
    .input(CompanyGetAllSchema)
    .query(companyGetAllHandler),
});
