import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { OrganizationUpdateSchema } from './organization-update-schema';

type OrganizationUpdateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: OrganizationUpdateSchema;
};

export const organizationUpdateHandler = async ({
  ctx,
  input,
}: OrganizationUpdateOptions) => {
  const { prisma, session } = ctx;
  // const { social, ...rest } = input;
  const res = await prisma.organization.update({
    where: {
      id: input.id,
      members: {
        some: {
          email: session?.user?.email,
        },
      },
    },
    data: {
      ...input,
    },
  });

  return res;
};

export type OrganizationUpdateResponse = Awaited<
  ReturnType<typeof organizationUpdateHandler>
>;
