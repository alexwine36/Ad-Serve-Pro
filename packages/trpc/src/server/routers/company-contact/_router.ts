import authedProcedure from "@/server/procedures/authed-procedure";
import { router } from "@/server/trpc";
import { companyContactGetAllHandler } from "./company-contact-get-all-handler";
import { CompanyContactGetAllSchema } from "./company-contact-get-all-schema";

// Imports

export const companyContactRouter = router({
  // Handlers

  getAll: authedProcedure
    .input(CompanyContactGetAllSchema)
    .query(companyContactGetAllHandler),
});
