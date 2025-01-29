import { CompanyUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const CompanyEditSchema = CompanyUpdateInput;
export type CompanyEditSchema = z.infer<typeof CompanyEditSchema>;
