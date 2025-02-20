import { router } from '../trpc';
import { adPlacementCampaignAdRouter } from './ad-placement-campaign-ad/_router';

import { adPlacementRouter } from './ad-placement/_router';

import { pageAnalyticsRouter } from './page-analytics/_router';

import { campaignAdRouter } from './campaign-ad/_router';

import { statRouter } from './stat/_router';

import { adAnalyticsRouter } from './ad-analytics/_router';

import { adServerRouter } from './ad-server/_router';

import { advertisementRouter } from './advertisement/_router';

import { campaignRouter } from './campaign/_router';

import { companyContactRouter } from './company-contact/_router';

import { z } from 'zod';
import publicProcedure from '../procedures/public-procedure';

import { companyRouter } from './company/_router';

import { memberRouter } from './member/_router';

import { userRouter } from './user/_router';

import { organizationRouter } from './organization/_router'; //'./organization/_router';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  // Handlers

  adPlacementCampaignAd: adPlacementCampaignAdRouter,

  adPlacement: adPlacementRouter,

  pageAnalytics: pageAnalyticsRouter,

  campaignAd: campaignAdRouter,

  stat: statRouter,

  adAnalytics: adAnalyticsRouter,

  adServer: adServerRouter,

  advertisement: advertisementRouter,

  campaign: campaignRouter,

  companyContact: companyContactRouter,

  company: companyRouter,

  member: memberRouter,

  user: userRouter,

  organization: organizationRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
