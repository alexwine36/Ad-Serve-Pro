import { z } from "zod";
import { AdPlacementCampaignAdUpdateInput } from "@repo/common-types";

export const AdPlacementCampaignAdUpdateSchema =
AdPlacementCampaignAdUpdateInput;

export type AdPlacementCampaignAdUpdateSchema = z.infer<typeof AdPlacementCampaignAdUpdateSchema>;