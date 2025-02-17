import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementUpdateSchema } from './ad-placement-update-schema'
import { z } from 'zod';
import { formatAdPlacementData,
adPlacementSelectFields
 } from "@repo/common-types";

type AdPlacementUpdateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: AdPlacementUpdateSchema;
}

export const adPlacementUpdateHandler = async ({ ctx, input }: AdPlacementUpdateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.adPlacement.update({
          where: {
            id: input.id
          },
          data: {...input},
          ...adPlacementSelectFields
        });
    return formatAdPlacementData(res);
}

export type AdPlacementUpdateResponse = Awaited<ReturnType<typeof adPlacementUpdateHandler>>;