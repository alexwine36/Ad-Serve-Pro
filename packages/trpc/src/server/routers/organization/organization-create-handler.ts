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
      // name,
      // slug: slug || slugify(name),
      // type: 'Something',
      ...input,
      members: {
        create: {
          role: 'OWNER',
          email: user.email,
        },
      },
    },
  });
  return res;
};

export type OrganizationCreateResponse = Awaited<
  ReturnType<typeof organizationCreateHandler>
>;
