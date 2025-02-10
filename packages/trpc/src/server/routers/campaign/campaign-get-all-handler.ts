import { campaignSelectFields, formatCampaignQuery } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CampaignGetAllSchema } from './campaign-get-all-schema';

type CampaignGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CampaignGetAllSchema;
};

export const campaignGetAllHandler = async ({
  ctx,
  input,
}: CampaignGetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.campaign.findMany({
    where: {
      company: {
        organizationId: session?.user.currentOrganizationId,
      },

      companyId: input.companyId,
    },
    include: campaignSelectFields.include,
  });

  return res.map((campaign) => formatCampaignQuery(campaign));
};

export type CampaignGetAllResponse = Awaited<
  ReturnType<typeof campaignGetAllHandler>
>;
