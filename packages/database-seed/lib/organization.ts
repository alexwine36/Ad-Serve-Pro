import { faker } from "@faker-js/faker";
import type { Organization, Prisma, PrismaClient } from "@repo/database";

export const getOrganization = async (
  data: Omit<Prisma.OrganizationCreateInput, "type">,
  prisma: PrismaClient
) => {
  const org = await prisma.organization.findFirst({
    where: {
      name: data.name,
    },
  });
  if (org) {
    return org;
  }

  const image = `https://loremflickr.com/320/320?lock=${faker.number.int({
    min: 1,
    max: 100,
  })}`;
  return prisma.organization.create({
    data: {
      image,
      ...data,

      members: {
        create: {
          role: "OWNER",
          email: "alexwine36@gmail.com",
        },
      },
    },
  });
};

export const seedMembers = async (org: Organization, prisma: PrismaClient) => {
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
        role: faker.helpers.arrayElement(["ADMIN", "MEMBER"]),
        email: faker.internet.email(),
        organizationId: org.id,
      },
    });
  });
};
