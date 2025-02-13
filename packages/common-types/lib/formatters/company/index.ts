import { Prisma } from '@repo/database';
import { z } from 'zod';
import { CompanyData } from '../../company';

export const ExtendedCompanyData = CompanyData.extend({
  activeCampaigns: z.number(),
  activeCampaignAds: z.number(),
});

export type ExtendedCompanyData = z.infer<typeof ExtendedCompanyData>;

export const extendedCompanySelectFields =
  Prisma.validator<Prisma.CompanyDefaultArgs>()({
    include: {
      campaigns: {
        where: {
          status: 'ACTIVE',
        },
      },
      campaignAds: {
        where: {
          isActive: true,
          ad: {
            isActive: true,
          },
          campaign: {
            status: 'ACTIVE',
          },
        },
      },
    },
  });

type ExtendedCompanyWithData = Prisma.CompanyGetPayload<
  typeof extendedCompanySelectFields
>;
export const formatExtendedCompanyData = (
  company: ExtendedCompanyWithData
): ExtendedCompanyData => {
  return {
    ...CompanyData.parse(company),
    activeCampaigns: company.campaigns.length,
    activeCampaignAds: company.campaignAds.length,
  };
};
