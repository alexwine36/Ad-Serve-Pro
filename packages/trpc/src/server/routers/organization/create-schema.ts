import { OrganizationInput } from '@repo/common-types';
import type { z } from 'zod';

export const CreateSchema = OrganizationInput;

export type CreateSchema = z.infer<typeof CreateSchema>;
