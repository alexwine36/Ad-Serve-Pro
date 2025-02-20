import { AdPlacementInput } from '@repo/common-types';
import type { z } from 'zod';

export const AdPlacementCreateSchema = AdPlacementInput;

export type AdPlacementCreateSchema = z.infer<typeof AdPlacementCreateSchema>;
