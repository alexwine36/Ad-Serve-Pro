import { AdvertisementInput } from '@repo/common-types';
import type { z } from 'zod';

export const AdvertisementCreateSchema = AdvertisementInput;

export type AdvertisementCreateSchema = z.infer<
  typeof AdvertisementCreateSchema
>;
