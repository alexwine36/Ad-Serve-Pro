import { generateMock } from '@anatine/zod-mock';
import { faker } from '@faker-js/faker';
import { CompanyInput } from '@repo/common-types';
import type { Organization, PrismaClient } from '@repo/database';

export const seedCompanies = async (
  org: Organization,
  prisma: PrismaClient
) => {
  const companies = await prisma.company.count({
    where: {
      organizationId: org.id,
    },
  });
  if (companies > 5) {
    return;
  }
  new Array(faker.number.int({ min: 5, max: 10 })).fill(0).map(async () => {
    const companyMock = generateMock(
      CompanyInput.omit({
        id: true,
      })
    );

    await prisma.company.create({
      data: {
        ...companyMock,
        social: companyMock.social || {},
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        website: faker.internet.url(),
        organizationId: org.id,
      },
    });
  });
};
