import { z } from "zod";
import { AdPlacementInput } from "@repo/common-types";

export const AdPlacementCreateSchema =
AdPlacementInput;

export type AdPlacementCreateSchema = z.infer<typeof AdPlacementCreateSchema>;