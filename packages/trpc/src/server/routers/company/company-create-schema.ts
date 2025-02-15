import { CompanyInput } from '@repo/common-types';
import type { z } from 'zod';

export const CompanyCreateSchema = CompanyInput.omit({
  organizationId: true,
  id: true,
});

export type CompanyCreateSchema = z.infer<typeof CompanyCreateSchema>;
