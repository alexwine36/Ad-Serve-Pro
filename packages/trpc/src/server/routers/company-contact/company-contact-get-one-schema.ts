import { z } from "zod";

export const CompanyContactGetOneSchema = z.object({
  // Define your schema here
  id: z.string(),
});

export type CompanyContactGetOneSchema = z.infer<
  typeof CompanyContactGetOneSchema
>;
