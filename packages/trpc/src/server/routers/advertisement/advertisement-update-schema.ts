import { AdvertisementUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const AdvertisementUpdateSchema = AdvertisementUpdateInput;

export type AdvertisementUpdateSchema = z.infer<
  typeof AdvertisementUpdateSchema
>;
