import { AdPlacementUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const AdPlacementUpdateSchema = AdPlacementUpdateInput;

export type AdPlacementUpdateSchema = z.infer<typeof AdPlacementUpdateSchema>;
