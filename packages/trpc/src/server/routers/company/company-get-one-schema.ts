import { CompanyData } from '@repo/common-types';
import { z } from 'zod';

const BaseSchema = CompanyData.pick({
  id: true,
  slug: true,
}).partial();

export const CompanyGetOneSchema = z.union([
  BaseSchema.required({
    id: true,
  }),
  BaseSchema.required({
    slug: true,
  }),
]);

export type CompanyGetOneSchema = z.infer<typeof CompanyGetOneSchema>;
