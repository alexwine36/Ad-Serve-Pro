import { z } from "zod";

export const CampaignUpdateSchema = z.object({
    // Define your schema here
})

export type CampaignUpdateSchema = z.infer<typeof CampaignUpdateSchema>;