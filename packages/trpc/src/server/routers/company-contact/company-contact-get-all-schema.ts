import { z } from "zod";

export const CompanyContactGetAllSchema = z.object({
  companyId: z.string(),
  // Define your schema here
});

export type CompanyContactGetAllSchema = z.infer<
  typeof CompanyContactGetAllSchema
>;
