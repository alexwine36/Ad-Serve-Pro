import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
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
      organizationId: session?.user.currentOrganizationId,
      OR: [
        {
          id: input.id || input.unknown,
        },
        {
          slug: input.slug || input.unknown,
        },
      ],
    },
  });
  return res;
};

export type CompanyGetOneResponse = Awaited<
  ReturnType<typeof companyGetOneHandler>
>;
