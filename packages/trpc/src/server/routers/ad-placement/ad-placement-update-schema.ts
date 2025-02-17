import { z } from "zod";
import { AdPlacementUpdateInput } from "@repo/common-types";

export const AdPlacementUpdateSchema =
AdPlacementUpdateInput;

export type AdPlacementUpdateSchema = z.infer<typeof AdPlacementUpdateSchema>;