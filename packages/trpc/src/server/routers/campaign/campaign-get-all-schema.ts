import { z } from "zod";

export const CampaignGetAllSchema = z.object({
    // Define your schema here
    companyId: z.string(),
})

export type CampaignGetAllSchema = z.infer<typeof CampaignGetAllSchema>;