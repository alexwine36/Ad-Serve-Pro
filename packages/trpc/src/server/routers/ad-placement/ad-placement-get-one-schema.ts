import { z } from 'zod';

export const AdPlacementGetOneSchema = z.object({
  // Define your schema here
  id: z.string(),
});

export type AdPlacementGetOneSchema = z.infer<typeof AdPlacementGetOneSchema>;
