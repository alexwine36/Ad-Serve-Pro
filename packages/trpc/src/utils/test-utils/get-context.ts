// import { initTRPC } from '@trpc/server';
// import superjson from 'superjson';
import type { PrismaClient } from '@repo/database';
import { getUser } from './get-user';
import type { TestUserTypes } from './types';

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
