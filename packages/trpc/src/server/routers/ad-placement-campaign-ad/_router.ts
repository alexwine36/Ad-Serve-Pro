import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { adPlacementCampaignAdCreateHandler } from './ad-placement-campaign-ad-create-handler';
import { AdPlacementCampaignAdCreateSchema } from './ad-placement-campaign-ad-create-schema';
import { adPlacementCampaignAdGetAllHandler } from './ad-placement-campaign-ad-get-all-handler';
import { AdPlacementCampaignAdGetAllSchema } from './ad-placement-campaign-ad-get-all-schema';
import { adPlacementCampaignAdGetOneHandler } from './ad-placement-campaign-ad-get-one-handler';
import { AdPlacementCampaignAdGetOneSchema } from './ad-placement-campaign-ad-get-one-schema';
import { adPlacementCampaignAdUpdateHandler } from './ad-placement-campaign-ad-update-handler';
import { AdPlacementCampaignAdUpdateSchema } from './ad-placement-campaign-ad-update-schema';

// Imports

export const adPlacementCampaignAdRouter = router({
  // Handlers

  update: authedProcedure
    .input(AdPlacementCampaignAdUpdateSchema)
    .mutation(adPlacementCampaignAdUpdateHandler),

  create: authedProcedure
    .input(AdPlacementCampaignAdCreateSchema)
    .mutation(adPlacementCampaignAdCreateHandler),

  getOne: authedProcedure
    .input(AdPlacementCampaignAdGetOneSchema)
    .query(adPlacementCampaignAdGetOneHandler),

  getAll: authedProcedure
    .input(AdPlacementCampaignAdGetAllSchema)
    .query(adPlacementCampaignAdGetAllHandler),
});
