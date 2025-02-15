import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { OrganizationCreateSchema } from './organization-create-schema';

type OrganizationCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: OrganizationCreateSchema;
};

export const organizationCreateHandler = async ({
  ctx,
  input,
}: OrganizationCreateOptions) => {
  const { prisma, session } = ctx;
  if (!session) {
    throw new Error('Not authenticated');
  }
  const user = session.user;

  const res = await prisma.organization.create({
    data: {
      ...input,
      members: {
        create: {
          role: 'OWNER',
          email: user.email,
        },
      },
    },
  });
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      currentOrganizationId: res.id,
    },
  });
  return res;
};

export type OrganizationCreateResponse = Awaited<
  ReturnType<typeof organizationCreateHandler>
>;
