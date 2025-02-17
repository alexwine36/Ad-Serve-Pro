import { z } from 'zod';

export const AdPlacementDeleteSchema = z.object({
  // Define your schema here
  id: z.string(),
});

export type AdPlacementDeleteSchema = z.infer<typeof AdPlacementDeleteSchema>;
