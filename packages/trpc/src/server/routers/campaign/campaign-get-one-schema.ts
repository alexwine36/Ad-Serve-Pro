import { z } from "zod";

export const CampaignGetOneSchema = z.object({
    // Define your schema here
})

export type CampaignGetOneSchema = z.infer<typeof CampaignGetOneSchema>;