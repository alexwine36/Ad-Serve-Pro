import { Container } from '@repo/design-system/components/ui/container';
import { redirect } from 'next/navigation';
import { trpcCaller } from '../../../../../../utils/trpc-server';

import { CampaignAdCard } from '../../../../campaign-ad/components/campaign-ad-card';
import { Header } from '../../../../components/header';

const CampaignPage = async ({
  params,
}: { params: Promise<{ campaignId: string; id: string }> }) => {
  const caller = await trpcCaller();
  const { campaignId, id } = await params;
  const campaign = await caller.campaign.getOne({ id: campaignId });
  const company = await caller.company.getOne({ unknown: id });
  if (!campaign || !company) {
    return redirect('/app/company');
  }
  return (
    <>
      <Header
        page={`${campaign?.name} Campaign`}
        pages={[
          { label: 'Companies', href: '/app/company' },
          { label: company?.name || '', href: `/app/company/${id}` },
          //   { label: 'Campaigns', href: `/app/company/${id}/campaign` },
        ]}
      />
      <Container className="flex flex-col gap-4">
        {/* <CampaignContent {...campaign}>
          <CampaignDialog
            companyId={company.id}
            campaign={campaign}
            showTrigger
          />
        </CampaignContent> */}
        <CampaignAdCard source="CAMPAIGN" campaignId={campaignId} />

        {/* <CampaignCard campaignId={campaign.id} />
        <CampaignCard campaignId={campaign.id} />
        <CompanyContactCard campaignId={campaign.id} /> */}
      </Container>
    </>
  );
};

export default CampaignPage;
