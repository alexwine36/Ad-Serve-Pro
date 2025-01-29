import { auth } from '@repo/auth/auth';
import type { Session } from '@repo/auth/types';
import { database } from '@repo/database/database';

export const getContext = async (session?: Session | null) => {
  let sessionData = session;
  if (!session) {
    sessionData = await auth();
  }
  return {
    session: sessionData || null,
    prisma: database,
  };
};
