// import { initTRPC } from '@trpc/server';
// import superjson from 'superjson';
import { PrismaClient } from '@repo/database';
import { appRouter } from '@repo/trpc/src/server/routers/_app';
import { createCallerFactory } from '@repo/trpc/src/server/trpc';
import { getTestContext } from './get-context';
import type { TestUserTypes } from './types';

const prisma = new PrismaClient();

export const getTestCaller = async (userType: TestUserTypes) => {
  const createCaller = createCallerFactory(appRouter);
  const ctx = await getTestContext(userType, prisma);
  const caller = createCaller(ctx);
  return caller;
};
