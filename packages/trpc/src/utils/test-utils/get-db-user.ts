import { faker } from '@faker-js/faker';
import type { PrismaClient, User as PrismaUser } from '@repo/database';
import type { OrganizationCreateSchema } from '../../server';
import type { TestUserTypes } from './types';

export const generateUser = () => {
  return {
    email: `test-${faker.internet.email()}`,
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  };
};

const users: Record<
  Exclude<TestUserTypes, 'guest'>,
  Omit<
    PrismaUser,
    'id' | 'emailVerified' | 'updatedAt' | 'currentOrganizationId' | 'createdAt'
  >
> = {
  create: generateUser(),
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

export const getDbUser = async (
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
