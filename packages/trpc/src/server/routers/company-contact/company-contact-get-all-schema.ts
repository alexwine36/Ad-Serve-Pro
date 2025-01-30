import { z } from "zod";

export const CompanyContactGetAllSchema = z.object({
  // Define your schema here
  companyId: z.string(),
});

export type CompanyContactGetAllSchema = z.infer<
  typeof CompanyContactGetAllSchema
>;
