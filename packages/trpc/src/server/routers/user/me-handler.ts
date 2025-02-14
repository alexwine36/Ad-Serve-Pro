import type { TRPCContextInner } from '@repo/trpc/src/server/create-context';
import { populateUser } from '../../../../../auth/utils/format-user.js';
import type { MeSchema } from './me-schema.ts';

type MeOptions = {
  ctx: TRPCContextInner;
  input: MeSchema;
};

export const meHandler = async ({ ctx, input }: MeOptions) => {
  const { prisma, session } = ctx;

  if (!session) {
    return session;
  }
  return await populateUser(session?.user, prisma);
};

export type MeResponse = ReturnType<typeof meHandler>;
