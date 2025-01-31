import { z } from 'zod';

export const AdvertisementGetOneSchema = z.object({
  // Define your schema here
  id: z.string(),
});

export type AdvertisementGetOneSchema = z.infer<
  typeof AdvertisementGetOneSchema
>;
