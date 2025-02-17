import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementGetOneSchema } from './ad-placement-get-one-schema'
import { z } from 'zod';
import { formatAdPlacementData,
adPlacementSelectFields
 } from "@repo/common-types";

type AdPlacementGetOneOptions = {
    ctx: TRPCContextInnerWithSession;
    input: AdPlacementGetOneSchema;
}

export const adPlacementGetOneHandler = async ({ ctx, input }: AdPlacementGetOneOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.adPlacement.findFirst({
          where: {
            id: input.id
          },
          ...adPlacementSelectFields
        });
    return formatAdPlacementData(res);
}

export type AdPlacementGetOneResponse = Awaited<ReturnType<typeof adPlacementGetOneHandler>>;