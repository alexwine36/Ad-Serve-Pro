import { z } from 'zod';

export const MeSchema = z.object({
  // Define your schema here
});

export type MeSchema = z.infer<typeof MeSchema>;
