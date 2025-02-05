import authedProcedure from '@repo/trpc/src/server/procedures/authed-procedure';
import { router } from '@repo/trpc/src/server/trpc';
import { advertisementCreateHandler } from './advertisement-create-handler';
import { AdvertisementCreateSchema } from './advertisement-create-schema';
import { advertisementGetAllHandler } from './advertisement-get-all-handler';
import { AdvertisementGetAllSchema } from './advertisement-get-all-schema';
import { advertisementGetOneHandler } from './advertisement-get-one-handler';
import { AdvertisementGetOneSchema } from './advertisement-get-one-schema';
import { advertisementUpdateHandler } from './advertisement-update-handler';
import { AdvertisementUpdateSchema } from './advertisement-update-schema';

// Imports

export const advertisementRouter = router({
  // Handlers

  update: authedProcedure
    .input(AdvertisementUpdateSchema)
    .mutation(advertisementUpdateHandler),

  create: authedProcedure
    .input(AdvertisementCreateSchema)
    .mutation(advertisementCreateHandler),

  getOne: authedProcedure
    .input(AdvertisementGetOneSchema)
    .query(advertisementGetOneHandler),

  getAll: authedProcedure
    .input(AdvertisementGetAllSchema)
    .query(advertisementGetAllHandler),
});
