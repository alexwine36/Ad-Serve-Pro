import { OrganizationUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const OrganizationUpdateSchema = OrganizationUpdateInput;

export type OrganizationUpdateSchema = z.infer<typeof OrganizationUpdateSchema>;
