import { router } from '@/server/trpc';
import publicProcedure from '../../procedures/public-procedure';
import { adServerGetAdsHandler } from './ad-server-get-ads-handler';
import { AdServerGetAdsSchema } from './ad-server-get-ads-schema';

// Imports

export const adServerRouter = router({
  // Handlers

  getAds: publicProcedure
    .input(AdServerGetAdsSchema)
    .query(adServerGetAdsHandler),
});
