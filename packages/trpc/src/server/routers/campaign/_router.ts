import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { campaignCreateHandler } from './campaign-create-handler';
import { CampaignCreateSchema } from './campaign-create-schema';
import { campaignGetAllHandler } from './campaign-get-all-handler';
import { CampaignGetAllSchema } from './campaign-get-all-schema';
import { campaignGetOneHandler } from './campaign-get-one-handler';
import { CampaignGetOneSchema } from './campaign-get-one-schema';
import { campaignUpdateHandler } from './campaign-update-handler';
import { CampaignUpdateSchema } from './campaign-update-schema';

// Imports

export const campaignRouter = router({
  // Handlers

  update: authedProcedure
    .input(CampaignUpdateSchema)
    .mutation(campaignUpdateHandler),

  create: authedProcedure
    .input(CampaignCreateSchema)
    .mutation(campaignCreateHandler),

  getOne: authedProcedure
    .input(CampaignGetOneSchema)
    .query(campaignGetOneHandler),

  getAll: authedProcedure
    .input(CampaignGetAllSchema)
    .query(campaignGetAllHandler),
});
