import authedProcedure from '@/server/procedures/authed-procedure';
import { CampaignUpdateSchema } from './campaign-update-schema'
import { campaignUpdateHandler } from './campaign-update-handler'
import { CampaignCreateSchema } from './campaign-create-schema'
import { campaignCreateHandler } from './campaign-create-handler'
import { CampaignGetOneSchema } from './campaign-get-one-schema'
import { campaignGetOneHandler } from './campaign-get-one-handler'
import { CampaignGetAllSchema } from './campaign-get-all-schema'
import { campaignGetAllHandler } from './campaign-get-all-handler'
import { router } from '@/server/trpc';

// Imports

export const campaignRouter = router({
    // Handlers

update: authedProcedure.input(CampaignUpdateSchema).mutation(campaignUpdateHandler),

create: authedProcedure.input(CampaignCreateSchema).mutation(campaignCreateHandler),

getOne: authedProcedure.input(CampaignGetOneSchema).query(campaignGetOneHandler),

getAll: authedProcedure.input(CampaignGetAllSchema).query(campaignGetAllHandler),
});