// import { initTRPC } from '@trpc/server';
// import superjson from 'superjson';
import type { PrismaClient } from '@repo/database';
import { type TestUserTypes, getUser } from './get-user';

export const getTestContext = async (
  userType: TestUserTypes,
  prisma: PrismaClient
) => {
  const user = await getUser(userType, prisma);
  return {
    prisma,
    session: user
      ? {
          expires: '',
          user,
        }
      : null,
  };
};
