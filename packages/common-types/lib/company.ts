import { z } from 'zod';
import { CompanySchema } from './generated';

export const Social = z
  .object({
    facebook: z.string().optional().nullable(),
    twitter: z.string().optional().nullable(),
    linkedin: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    youtube: z.string().optional().nullable(),
    other: z.string().optional().nullable(),
  })
  .default({});

export const CompanyData = CompanySchema.extend({
  social: Social.optional().nullable().default({}),
  website: z.string().nullish().optional(),
  image: z.string().nullish().optional(),
});

export const CompanyUpdateInput = CompanyData.omit({
  createdAt: true,
  updatedAt: true,
});

export type CompanyUpdateInput = z.infer<typeof CompanyUpdateInput>;
export const CompanyInput = CompanyUpdateInput.partial({
  id: true,
});
export type CompanyInput = z.infer<typeof CompanyInput>;

export type CompanyData = z.infer<typeof CompanyData>;
