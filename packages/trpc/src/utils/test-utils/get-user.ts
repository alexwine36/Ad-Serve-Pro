import type { Session } from '@repo/auth/types';
import { populateUser } from '@repo/auth/utils/format-user';
import type { PrismaClient, User as PrismaUser } from '@repo/database';
import { getDbUser } from './get-db-user';
import type { TestUserTypes } from './types';

export const formatUser = async (
  data: Session['user'] | PrismaUser | undefined | null,
  prisma: PrismaClient
): Promise<Session['user'] | undefined | null> => {
  if (data) {
    const res = await populateUser(data, prisma);

    // biome-ignore lint/suspicious/noExplicitAny: any
    return res as any;
  }
  return data;
};

export const getUser = async (
  userType: TestUserTypes,
  prisma: PrismaClient
): Promise<Session['user'] | undefined | null> => {
  const data = await getDbUser(userType, prisma);
  return formatUser(data, prisma);
};
