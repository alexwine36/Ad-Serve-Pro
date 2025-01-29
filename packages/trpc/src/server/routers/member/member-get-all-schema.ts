import { z } from 'zod';

export const MemberGetAllSchema = z.object({
  // Define your schema here
});

export type MemberGetAllSchema = z.infer<typeof MemberGetAllSchema>;
