import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { CompanyContactGetOneSchema } from './company-contact-get-one-schema'
import { z } from 'zod';
import { CompanyContactData } from "@repo/common-types";

type CompanyContactGetOneOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CompanyContactGetOneSchema;
}

export const companyContactGetOneHandler = async ({ ctx, input }: CompanyContactGetOneOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.companyContact.findFirst({
          where: {
            id: input.id
          }
        });
    return CompanyContactData.parse(res);
}

export type CompanyContactGetOneResponse = Awaited<ReturnType<typeof companyContactGetOneHandler>>;