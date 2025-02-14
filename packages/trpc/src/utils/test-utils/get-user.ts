import { faker } from '@faker-js/faker';
import type { Session } from '@repo/auth/types';
import { populateUser } from '@repo/auth/utils/format-user';
import type { PrismaClient, User as PrismaUser } from '@repo/database';
import type { OrganizationCreateSchema } from '../../server';

export type TestUserTypes = 'guest' | 'user' | 'org-admin' | 'create';

const users: Record<
  Exclude<TestUserTypes, 'guest'>,
  Omit<
    PrismaUser,
    'id' | 'emailVerified' | 'updatedAt' | 'currentOrganizationId' | 'createdAt'
  >
> = {
  create: {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  },
  user: {
    email: 'sample@example.com',
    name: 'Sample User',
    image: faker.image.avatarGitHub(),
  },
  'org-admin': {
    email: 'admin@sample.org',
    name: 'Admin User',
    image: faker.image.avatarGitHub(),
  },
};

const orgs: Record<
  Exclude<TestUserTypes, 'guest' | 'user' | 'create'>,
  OrganizationCreateSchema
> = {
  'org-admin': {
    name: 'TEST SAMPLE ORG',
    image: faker.image.avatar(),
  },
};

const getOrgAdminUser = async (prisma: PrismaClient): Promise<PrismaUser> => {
  let org = await prisma.organization.findFirst({
    where: {
      name: orgs['org-admin'].name,
    },
  });
  if (!org) {
    org = await prisma.organization.create({
      data: {
        ...orgs['org-admin'],
        members: {
          create: {
            role: 'ADMIN',
            email: users['org-admin'].email,
          },
        },
      },
    });
  }

  const res = await prisma.user.upsert({
    where: {
      email: users['org-admin'].email,
    },
    create: {
      ...users['org-admin'],
      emailVerified: new Date(),
      currentOrganizationId: org.id,
    },
    update: {
      currentOrganizationId: org.id,
    },
  });

  return res;
};

const getDbUser = async (
  userType: TestUserTypes,
  prisma: PrismaClient
): Promise<PrismaUser | undefined | null> => {
  switch (userType) {
    case 'create':
      return prisma.user.create({
        data: {
          ...users.create,
          emailVerified: new Date(),
        },
      });
    case 'guest':
      return undefined;
    case 'user':
      return prisma.user.upsert({
        where: {
          email: users.user.email,
        },
        create: {
          ...users.user,
          emailVerified: new Date(),
        },
        update: {
          // emailVerified: true,
        },
      });

    case 'org-admin':
      return await getOrgAdminUser(prisma);

    default:
      throw new Error('NOT IMPLEMENTED');
  }
};

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
