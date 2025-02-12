import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { campaignAdCreateHandler } from './campaign-ad-create-handler';
import { CampaignAdCreateSchema } from './campaign-ad-create-schema';
import { campaignAdGetAllHandler } from './campaign-ad-get-all-handler';
import { CampaignAdGetAllSchema } from './campaign-ad-get-all-schema';
import { campaignAdUpdateHandler } from './campaign-ad-update-handler';
import { CampaignAdUpdateSchema } from './campaign-ad-update-schema';

// Imports

export const campaignAdRouter = router({
  // Handlers

  update: authedProcedure
    .input(CampaignAdUpdateSchema)
    .mutation(campaignAdUpdateHandler),

  create: authedProcedure
    .input(CampaignAdCreateSchema)
    .mutation(campaignAdCreateHandler),

  getAll: authedProcedure
    .input(CampaignAdGetAllSchema)
    .query(campaignAdGetAllHandler),
});
