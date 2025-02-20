import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { adPlacementCreateHandler } from './ad-placement-create-handler';
import { AdPlacementCreateSchema } from './ad-placement-create-schema';
import { adPlacementDeleteHandler } from './ad-placement-delete-handler';
import { AdPlacementDeleteSchema } from './ad-placement-delete-schema';
import { adPlacementGetAllHandler } from './ad-placement-get-all-handler';
import { AdPlacementGetAllSchema } from './ad-placement-get-all-schema';
import { adPlacementGetOneHandler } from './ad-placement-get-one-handler';
import { AdPlacementGetOneSchema } from './ad-placement-get-one-schema';
import { adPlacementUpdateHandler } from './ad-placement-update-handler';
import { AdPlacementUpdateSchema } from './ad-placement-update-schema';

// Imports

export const adPlacementRouter = router({
  // Handlers

  delete: authedProcedure
    .input(AdPlacementDeleteSchema)
    .mutation(adPlacementDeleteHandler),

  update: authedProcedure
    .input(AdPlacementUpdateSchema)
    .mutation(adPlacementUpdateHandler),

  create: authedProcedure
    .input(AdPlacementCreateSchema)
    .mutation(adPlacementCreateHandler),

  getOne: authedProcedure
    .input(AdPlacementGetOneSchema)
    .query(adPlacementGetOneHandler),

  getAll: authedProcedure
    .input(AdPlacementGetAllSchema)
    .query(adPlacementGetAllHandler),
});
