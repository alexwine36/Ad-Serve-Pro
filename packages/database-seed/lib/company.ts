import { generateMock } from '@anatine/zod-mock';
import { faker } from '@faker-js/faker';
import { CompanyInput, slugify } from '@repo/common-types';
import type { Organization, PrismaClient } from '@repo/database';

export const seedCompanies = async (
  org: Organization,
  prisma: PrismaClient
) => {
  const companies = await prisma.company.findMany({
    where: {
      organizationId: org.id,
    },
  });
  if (companies.length > 5) {
    return companies;
  }
  return Promise.all(
    new Array(faker.number.int({ min: 10, max: 20 })).fill(0).map(async () => {
      const companyMock = generateMock(
        CompanyInput.omit({
          id: true,
        })
      );
      const name = faker.company.name();
      const res = await prisma.company.create({
        data: {
          ...companyMock,
          name,
          slug: slugify(name),
          social: companyMock.social || {},

          description: faker.company.catchPhrase(),
          website: faker.internet.url(),
          organizationId: org.id,
        },
      });
      return res;
    })
  );
};
