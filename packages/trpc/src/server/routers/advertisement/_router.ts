import authedProcedure from '@/server/procedures/authed-procedure';
import { AdvertisementUpdateSchema } from './advertisement-update-schema'
import { advertisementUpdateHandler } from './advertisement-update-handler'
import { AdvertisementCreateSchema } from './advertisement-create-schema'
import { advertisementCreateHandler } from './advertisement-create-handler'
import { AdvertisementGetOneSchema } from './advertisement-get-one-schema'
import { advertisementGetOneHandler } from './advertisement-get-one-handler'
import { AdvertisementGetAllSchema } from './advertisement-get-all-schema'
import { advertisementGetAllHandler } from './advertisement-get-all-handler'
import { router } from '@/server/trpc';

// Imports

export const advertisementRouter = router({
    // Handlers

update: authedProcedure.input(AdvertisementUpdateSchema).mutation(advertisementUpdateHandler),

create: authedProcedure.input(AdvertisementCreateSchema).mutation(advertisementCreateHandler),

getOne: authedProcedure.input(AdvertisementGetOneSchema).query(advertisementGetOneHandler),

getAll: authedProcedure.input(AdvertisementGetAllSchema).query(advertisementGetAllHandler),
});