import { z } from 'zod';
const BaseInput = z.object({
  adPlacementId: z.string().optional(),
  campaignAdId: z.string().optional(),
});
export const AdPlacementCampaignAdGetAllSchema = z.union([
  BaseInput.required({
    adPlacementId: true,
  }),
  BaseInput.required({
    campaignAdId: true,
  }),
]);

export type AdPlacementCampaignAdGetAllSchema = z.infer<
  typeof AdPlacementCampaignAdGetAllSchema
>;
