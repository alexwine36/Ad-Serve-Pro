import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { CompanyContactDeleteSchema } from './company-contact-delete-schema'
import { z } from 'zod';

type CompanyContactDeleteOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CompanyContactDeleteSchema;
}

export const companyContactDeleteHandler = async ({ ctx, input }: CompanyContactDeleteOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.companyContact.delete({
          where: {
            id: input.id
          }
        });
    return res;
}

export type CompanyContactDeleteResponse = Awaited<ReturnType<typeof companyContactDeleteHandler>>;