import { z } from 'zod';

export const SetCurrentOrgSchema = z.object({
  // Define your schema here
  organizationId: z.string().cuid(),
});

export type SetCurrentOrgSchema = z.infer<typeof SetCurrentOrgSchema>;
