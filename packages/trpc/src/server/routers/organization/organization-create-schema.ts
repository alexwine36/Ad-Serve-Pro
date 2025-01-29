import { OrganizationInput } from '@repo/common-types';
import type { z } from 'zod';

export const OrganizationCreateSchema = OrganizationInput;

export type OrganizationCreateSchema = z.infer<typeof OrganizationCreateSchema>;
