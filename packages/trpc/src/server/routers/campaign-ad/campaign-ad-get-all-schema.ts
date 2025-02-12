import { z } from 'zod';

const SourceEnum = z.enum(['CAMPAIGN', 'ADVERTISEMENT']);

const BaseInput = z.object({
  source: SourceEnum,
  campaignId: z.string().optional(),
  advertisementId: z.string().optional(),
});

export const CampaignAdGetAllSchema = z.discriminatedUnion('source', [
  BaseInput.extend({
    source: z.literal(SourceEnum.Values.CAMPAIGN),
  }).required({
    campaignId: true,
  }),
  BaseInput.extend({
    source: z.literal(SourceEnum.Values.ADVERTISEMENT),
  }).required({
    advertisementId: true,
  }),
]);
//  z.union([
//   BaseInput,
//   BaseInput.required({
//     campaignId: true,
//   }),
//   BaseInput.required({
//     advertisementId: true,
//   }),
//   //   z.object({
//   //     campaignId: z.string(),
//   //     advertisementId: z.string().optional(),
//   //   }),
//   //   z.object({
//   //     campaignId: z.string().optional(),
//   //     advertisementId: z.string(),
//   //   }),
// ]);
// z.object({
//     // Define your schema here
// })

export type CampaignAdGetAllSchema = z.infer<typeof CampaignAdGetAllSchema>;
