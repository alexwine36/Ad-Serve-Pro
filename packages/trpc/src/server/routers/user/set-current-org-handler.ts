import type { TRPCContextInner } from '@repo/trpc/src/server/create-context';
import type { SetCurrentOrgSchema } from './set-current-org-schema.ts';

type SetCurrentOrgOptions = {
  ctx: TRPCContextInner;
  input: SetCurrentOrgSchema;
};

export const setCurrentOrgHandler = async ({
  ctx,
  input,
}: SetCurrentOrgOptions) => {
  const { prisma, session } = ctx;

  if (!session) {
    throw new Error('Unauthorized');
  }

  const requestedOrg = await prisma.member.findFirst({
    where: {
      email: session.user.email,
      organizationId: input.organizationId,
    },
  });
  if (!requestedOrg) {
    throw new Error('Unauthorized');
  }

  const res = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      currentOrganizationId: input.organizationId,
    },
  });

  return res;
};

export type SetCurrentOrgResponse = ReturnType<typeof setCurrentOrgHandler>;
