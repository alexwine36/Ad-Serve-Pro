import { CompanyData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { TRPCError } from '@trpc/server';
import type { CompanyCreateSchema } from './company-create-schema';

type CompanyCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyCreateSchema;
};

export const companyCreateHandler = async ({
  ctx,
  input,
}: CompanyCreateOptions) => {
  const { prisma, session } = ctx;
  const { currentOrganizationId } = session.user;

  if (!currentOrganizationId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'No current organization',
    });
  }

  const { social, ...rest } = input;
  const res = await prisma.company.create({
    data: {
      ...rest,
      organizationId: currentOrganizationId,
    },
  });

  return CompanyData.parse(res);
};

export type CompanyCreateResponse = Awaited<
  ReturnType<typeof companyCreateHandler>
>;
