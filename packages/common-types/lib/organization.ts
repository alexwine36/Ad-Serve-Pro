import type { z } from 'zod';
import { OrganizationSchema } from './generated';

export const OrganizationUpdateInput = OrganizationSchema.omit({
  createdAt: true,
  updatedAt: true,
  //   social: true,
});
export type OrganizationUpdateInput = z.infer<typeof OrganizationUpdateInput>;
export const OrganizationInput = OrganizationUpdateInput.partial({
  id: true,
});
export type OrganizationInput = z.infer<typeof OrganizationInput>;
