import { z } from 'zod';

export const OrganizationGetAllSchema = z.object({
  // Define your schema here
});

export type OrganizationGetAllSchema = z.infer<typeof OrganizationGetAllSchema>;
