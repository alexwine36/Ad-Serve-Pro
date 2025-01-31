import { z } from 'zod';
import { AdvertisementSchema } from './generated';

// const HalfPageAd = z.object({
//   name: z.literal('Half-page Ad'),
//   // width: z.literal(300),
//   // height: z.literal(600),
// });

// const StandardBanner = z.object({
//   name: z.literal('Standard Banner'),
//   // width: z.literal(468),
//   // height: z.literal(60),
// });

// const LargeMobileBanner = z.object({
//   name: z.literal('Large Mobile Banner'),
//   // width: z.literal(320),
//   // height: z.literal(100),
// });

// const Skyscraper = z.object({
//   name: z.literal('Skyscraper'),
//   // width: z.literal(160),
//   // height: z.literal(600),
// });

// const LargeBanner = z.object({
//   name: z.literal('Large Banner'),
//   // width: z.literal(320),
//   // height: z.literal(90),
// });

// const MediumBanner = z.object({
//   name: z.literal('Medium Banner'),
//   // width: z.literal(300),
//   // height: z.literal(250),
// });

// const Leaderboard = z.object({
//   name: z.literal('Leaderboard'),
//   // width: z.literal(728),
//   // height: z.literal(90),
// });

// const SingleImageAd = z.object({
//   name: z.literal('Single Image Ad'),
//   width: z.number().min(1080),
//   height: z.number().min(1080),
// });

// const Custom = z.object({
//   name: z.literal('Custom'),
//   width: z.number(),
//   height: z.number(),
// });
const AdvertisementSizes = z.enum([
  'halfPageAd',
  'standardBanner',
  'largeMobileBanner',
  'skyscraper',
  'largeBanner',
  'mediumBanner',
  'leaderboard',
  'singleImageAd',
  'custom',
]);
export type AdvertisementSizes = z.infer<typeof AdvertisementSizes>;
export const ADVERTISEMENT_SIZES: Record<
  AdvertisementSizes,
  {
    name: string;
    width: number;
    height: number;
  }
> = {
  halfPageAd: {
    name: 'Half-page Ad',
    width: 300,
    height: 600,
  },
  standardBanner: {
    name: 'Standard Banner',
    width: 468,
    height: 60,
  },
  largeMobileBanner: {
    name: 'Large Mobile Banner',
    width: 320,
    height: 100,
  },
  skyscraper: {
    name: 'Skyscraper',
    width: 160,
    height: 600,
  },
  largeBanner: {
    name: 'Large Banner',
    width: 320,
    height: 90,
  },
  mediumBanner: {
    name: 'Medium Banner',
    width: 300,
    height: 250,
  },
  leaderboard: {
    name: 'Leaderboard',
    width: 728,
    height: 90,
  },
  singleImageAd: {
    name: 'Single Image Ad',
    width: 1080,
    height: 1080,
  },
  custom: {
    name: 'Custom',
    width: 0,
    height: 0,
  },
} as const;

// export const AdvertisementSize = z.discriminatedUnion('name', [
//   HalfPageAd,
//   StandardBanner,
//   LargeMobileBanner,
//   Skyscraper,
//   LargeBanner,
//   MediumBanner,
//   Leaderboard,
//   SingleImageAd,
//   Custom,
// ]);

export const AdvertisementMetadata = z.object({
  size: AdvertisementSizes.default(AdvertisementSizes.Enum.standardBanner),
  // url: z.string().url(),
  // altText: z.string().optional(),
  // targetUrl: z.string().optional(),
  // // Add more metadata here
});

export const AdvertisementData = AdvertisementSchema.extend({
  // Update base types here
  name: z.string().min(2).default(''),
  isActive: z.boolean().default(true),
  metadata: AdvertisementMetadata,
});

export type AdvertisementData = z.infer<typeof AdvertisementData>;

export const AdvertisementUpdateInput = AdvertisementData.omit({
  createdAt: true,
  updatedAt: true,
  // organizationId: true,
});

export type AdvertisementUpdateInput = z.infer<typeof AdvertisementUpdateInput>;

export const AdvertisementInput = AdvertisementUpdateInput.partial({
  id: true,
});
export type AdvertisementInput = z.infer<typeof AdvertisementInput>;
