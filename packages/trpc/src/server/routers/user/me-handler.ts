import type { TRPCContextInner } from '@repo/trpc/src/server/create-context';
import type { MeSchema } from './me-schema.ts';

type MeOptions = {
  ctx: TRPCContextInner;
  input: MeSchema;
};

export const meHandler = async ({ ctx, input }: MeOptions) => {
  const { prisma, session } = ctx;

  return session?.user;
};

export type MeResponse = ReturnType<typeof meHandler>;
