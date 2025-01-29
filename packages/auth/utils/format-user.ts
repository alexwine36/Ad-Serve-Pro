import type { PrismaClient } from '../../database';

export const formatUser = <
  T extends {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  },
>(
  user: T
) => {
  const display = (user.name ? user.name : user.email) || '';
  return {
    ...user,
    image: user.image || undefined,
    name: user.name || '',
    initials: display
      ? display.split(' ').reduce((acc, cur) => {
          return acc + cur[0].toUpperCase();
        }, '')
      : '',
  };
};

export const populateUser = async <
  T extends {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  },
>(
  user: T,
  prisma: PrismaClient
) => {
  if (!user.email) {
    return formatUser({
      email: '',

      ...user,
    });
  }
  let dbUser = await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
    select: {
      currentOrganizationId: true,
      currentMembership: {
        select: {
          role: true,
        },
      },
    },
  });
  if (dbUser && !dbUser.currentOrganizationId) {
    const userOrgs = await prisma.member.findMany({
      where: {
        email: user.email,
      },
    });
    if (userOrgs.length) {
      dbUser = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          currentOrganizationId: userOrgs[0].organizationId,
        },

        select: {
          currentOrganizationId: true,
          currentMembership: {
            select: {
              role: true,
            },
          },
        },
      });
    }
  }

  return {
    ...user,

    currentOrganizationId: dbUser?.currentOrganizationId,
    currentRole: dbUser?.currentMembership?.role,
    ...formatUser(user),
  };
};
