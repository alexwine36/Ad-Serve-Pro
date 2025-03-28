import { generateMock } from '@anatine/zod-mock';
import { faker } from '@faker-js/faker';
import type { Company, PrismaClient } from '@repo/database';
import type { z } from 'zod';
import {
  CampaignStatus,
  CampaignInput as RawCampaignInput,
} from '../../common-types';
import { getDateStatus, getToFromDate } from './utils';

const CampaignInput = RawCampaignInput.extend({
  status: CampaignStatus,
});
type CampaignInput = z.infer<typeof CampaignInput>;

export const seedCampaigns = async (company: Company, prisma: PrismaClient) => {
  const campaigns = await prisma.campaign.findMany({
    where: {
      companyId: company.id,
    },
  });

  if (campaigns.length > 5) {
    return campaigns;
  }

  return Promise.all(
    new Array(faker.number.int({ min: 1, max: 5 })).fill(0).map(async () => {
      const rawCampaignMock = generateMock(
        CampaignInput.extend({
          status: CampaignStatus,
        }).omit({
          companyId: true,
          organizationId: true,
          id: true,
        })
      );

      const { from, to } = getToFromDate();

      const dateStatus = getDateStatus(new Date(), { from, to });
      const baseStatus: CampaignInput['status'][] = [
        'CANCELLED',
        'PAUSED',
        'DRAFT',
      ];
      if (dateStatus === 'before') {
        rawCampaignMock.status = faker.helpers.arrayElement([
          ...baseStatus,
          'SCHEDULED',
        ]);
      }
      if (dateStatus === 'after') {
        rawCampaignMock.status = faker.helpers.arrayElement([
          ...baseStatus,
          'COMPLETED',
        ]);
      }
      if (dateStatus === 'between') {
        rawCampaignMock.status = faker.helpers.arrayElement([
          ...baseStatus,
          'ACTIVE',
        ]);
      }

      const campaignMock: CampaignInput = {
        ...rawCampaignMock,
        name: [
          faker.commerce.productAdjective(),
          faker.commerce.product(),
        ].join(' '),

        startDate: from,
        endDate: to,
        companyId: company.id,

        organizationId: company.organizationId,
      };

      const res = await prisma.campaign.create({
        data: {
          ...campaignMock,
        },
      });
      return res;
    })
  );
};

export const seedCompanysCampaigns = async (
  companies: Company[],
  prisma: PrismaClient
) => {
  const res = await Promise.all(
    companies.map((company) => seedCampaigns(company, prisma))
  );
  return res.flat();
};
