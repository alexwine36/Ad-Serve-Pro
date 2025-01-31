import { generateMock } from '@anatine/zod-mock';
import { faker } from '@faker-js/faker';
import type { Company, PrismaClient } from '@repo/database';
import { ADVERTISEMENT_SIZES, AdvertisementInput } from '../../common-types';

export const seedCompaniesAdvertisements = async (
  companies: Company[],
  db: PrismaClient
) => {
  return Promise.all(
    companies.map((company) => seedAdvertisements(company, db))
  );
};

export const seedAdvertisements = async (
  company: Company,
  db: PrismaClient
) => {
  const advertisements = await db.advertisement.findMany({
    where: {
      companyId: company.id,
    },
  });

  if (advertisements.length > 2) {
    return advertisements;
  }

  return Promise.all(
    new Array(faker.number.int({ min: 1, max: 5 })).fill(0).map(async () => {
      const rawAdvertisementMock = generateMock(
        AdvertisementInput.omit({
          id: true,
        })
      );

      const adSize = rawAdvertisementMock.metadata.size;

      const advertisementMock: AdvertisementInput = {
        ...rawAdvertisementMock,
        name: [
          faker.commerce.productAdjective(),
          faker.commerce.product(),
        ].join(' '),
        type: 'IMAGE',
        content: faker.image.urlLoremFlickr(ADVERTISEMENT_SIZES[adSize]),
        metadata: {
          size: adSize,
        },
        companyId: company.id,
      };

      const res = await db.advertisement.create({
        data: advertisementMock,
      });

      return res;
    })
  );
};
