import { z } from 'zod';
import { CompanyContactSchema } from './generated';

export const CompanyContactData = CompanyContactSchema.extend({
  // Update base types here
  email: z.union([z.string().email(), z.literal('')]).nullish(),
  name: z.string().min(2),
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

export const CompanyContactInput = CompanyContactUpdateInput.partial({
  id: true,
}).default({
  // Define default values here
  name: '',
  email: undefined,
  companyId: '',
});
export type CompanyContactInput = z.infer<typeof CompanyContactInput>;
