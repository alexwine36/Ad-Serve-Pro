import { faker } from '@faker-js/faker';
import { type Organization, type Prisma, PrismaClient } from '@repo/database';
import { keys } from './keys';
import { seedCompanies } from './lib/company';
import { generatePages } from './lib/page';

const _env = keys();

const prisma = new PrismaClient();

const getOrganization = async (
  data: Omit<Prisma.OrganizationCreateInput, 'type'>
) => {
  const org = await prisma.organization.findFirst({
    where: {
      name: data.name,
    },
  });
  if (org) {
    return org;
  }
  return prisma.organization.create({
    data: {
      ...data,
      type: 'Something',
      members: {
        create: {
          role: 'OWNER',
          email: 'alexwine36@gmail.com',
        },
      },
    },
  });
};

const seedMembers = async (org: Organization) => {
  const members = await prisma.member.count({
    where: {
      organizationId: org.id,
    },
  });
  if (members > 5) {
    return;
  }

  new Array(faker.number.int({ min: 5, max: 10 })).fill(0).map(async () => {
    await prisma.member.create({
      data: {
        role: faker.helpers.arrayElement(['ADMIN', 'MEMBER']),
        email: faker.internet.email(),
        organizationId: org.id,
      },
    });
  });
};

(async () => {
  try {
    const org = await getOrganization({
      name: 'Acme Inc.',
      slug: 'acme-inc',
    });
    await seedMembers(org);
    await seedCompanies(org, prisma);
    const _otherOrg = await getOrganization({
      name: "Bob's Burgers",
      slug: 'bobs-burgers',
    });
    const _pages = await generatePages(prisma);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
