import type { TRPCContextInnerWithSession } from '@/server/create-context';
import { CompanyData } from '@repo/common-types';
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
    throw new Error('No current organization');
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
