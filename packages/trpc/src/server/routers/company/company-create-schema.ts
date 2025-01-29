import { CompanyInput } from '@repo/common-types';
import type { z } from 'zod';

export const CompanyCreateSchema = CompanyInput;

export type CompanyCreateSchema = z.infer<typeof CompanyCreateSchema>;
