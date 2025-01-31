import { z } from 'zod';

export const AdvertisementGetAllSchema = z.object({
  // Define your schema here
  companyId: z.string(),
});

export type AdvertisementGetAllSchema = z.infer<
  typeof AdvertisementGetAllSchema
>;
