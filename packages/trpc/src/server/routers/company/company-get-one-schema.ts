import { CompanyData } from '@repo/common-types';
import { z } from 'zod';

const BaseSchema = CompanyData.pick({
  id: true,
  slug: true,
})
  .extend({
    unknown: z.string().optional(),
  })
  .partial();

export const CompanyGetOneSchema = z.union([
  BaseSchema.required({
    id: true,
  }),
  BaseSchema.required({
    slug: true,
  }),
  BaseSchema.required({
    unknown: true,
  }),
]);

export type CompanyGetOneSchema = z.infer<typeof CompanyGetOneSchema>;
