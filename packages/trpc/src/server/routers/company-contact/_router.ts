import authedProcedure from '@/server/procedures/authed-procedure';
import { CompanyContactDeleteSchema } from './company-contact-delete-schema'
import { companyContactDeleteHandler } from './company-contact-delete-handler'
import { CompanyContactUpdateSchema } from './company-contact-update-schema'
import { companyContactUpdateHandler } from './company-contact-update-handler'
import { CompanyContactCreateSchema } from './company-contact-create-schema'
import { companyContactCreateHandler } from './company-contact-create-handler'
import { CompanyContactGetOneSchema } from './company-contact-get-one-schema'
import { companyContactGetOneHandler } from './company-contact-get-one-handler'
import { CompanyContactGetAllSchema } from './company-contact-get-all-schema'
import { companyContactGetAllHandler } from './company-contact-get-all-handler'
import { router } from '@/server/trpc';

// Imports

export const companyContactRouter = router({
    // Handlers

delete: authedProcedure.input(CompanyContactDeleteSchema).mutation(companyContactDeleteHandler),

update: authedProcedure.input(CompanyContactUpdateSchema).mutation(companyContactUpdateHandler),

create: authedProcedure.input(CompanyContactCreateSchema).mutation(companyContactCreateHandler),

getOne: authedProcedure.input(CompanyContactGetOneSchema).query(companyContactGetOneHandler),

getAll: authedProcedure.input(CompanyContactGetAllSchema).query(companyContactGetAllHandler),
});