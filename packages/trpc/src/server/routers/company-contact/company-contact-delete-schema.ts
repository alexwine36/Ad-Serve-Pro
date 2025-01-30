import { z } from "zod";

export const CompanyContactDeleteSchema = z.object({
  // Define your schema here
  id: z.string(),
});

export type CompanyContactDeleteSchema = z.infer<
  typeof CompanyContactDeleteSchema
>;
