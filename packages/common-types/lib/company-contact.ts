import type { z } from "zod";
import { CompanyContactSchema } from "./generated";

export const CompanyContactData = CompanyContactSchema.extend({
  // Update base types here
});

export type CompanyContactData = z.infer<typeof CompanyContactData>;

export const CompanyContactUpdateInput = CompanyContactData.omit({
  createdAt: true,
  updatedAt: true,
  // organizationId: true,
});

export type CompanyContactUpdateInput = z.infer<
  typeof CompanyContactUpdateInput
>;

export const CompanyContactInput = CompanyContactUpdateInput;
export type CompanyContactInput = z.infer<typeof CompanyContactInput>;
