import { z } from 'zod';

export const OrganizationGetOneSchema = z.object({
  // Define your schema here
  id: z.string().cuid(),
});

export type OrganizationGetOneSchema = z.infer<typeof OrganizationGetOneSchema>;
