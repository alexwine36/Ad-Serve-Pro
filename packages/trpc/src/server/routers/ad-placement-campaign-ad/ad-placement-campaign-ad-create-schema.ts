import { z } from "zod";
import { AdPlacementCampaignAdInput } from "@repo/common-types";

export const AdPlacementCampaignAdCreateSchema =
AdPlacementCampaignAdInput;

export type AdPlacementCampaignAdCreateSchema = z.infer<typeof AdPlacementCampaignAdCreateSchema>;