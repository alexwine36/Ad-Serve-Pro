import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { CompanyGetOneSchema } from './company-get-one-schema';

type CompanyGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyGetOneSchema;
};

export const companyGetOneHandler = async ({
  ctx,
  input,
}: CompanyGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.company.findFirst({
    where: {
      OR: [
        {
          id: input.id || input.unknown,
          organizationId: session?.user.currentOrganizationId,
        },
        {
          slug: input.slug || input.unknown,
          organizationId: session?.user.currentOrganizationId,
        },
      ],
    },
  });
  return res;
};

export type CompanyGetOneResponse = Awaited<
  ReturnType<typeof companyGetOneHandler>
>;
