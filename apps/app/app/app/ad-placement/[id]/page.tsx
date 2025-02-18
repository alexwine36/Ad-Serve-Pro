import { Container } from '@repo/design-system/components/ui/container';
import { redirect } from 'next/navigation';
import { auth } from '../../../../../../packages/auth/auth';
import { trpcCaller } from '../../../../utils/trpc-server';
import { AdPlacementCampaignAdCard } from '../../ad-placement-campaign-ad/components/ad-placement-campaign-ad-card';
import { Header } from '../../components/header';
import { AdPlacementCode } from '../components/ad-placement-code';

const AdPlacementPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const session = await auth();
  const caller = await trpcCaller();
  if (!session?.user.currentOrganizationId) {
    redirect('/');
  }

  const { id } = await params;
  const adPlacement = await caller.adPlacement.getOne({ id });

  // const caller = await trpcCaller();

  return (
    <>
      <Header
        page={adPlacement.name}
        pages={[
          {
            label: 'Ad Placements',
            href: '/app/ad-placement',
          },
        ]}
      />

      <Container className="flex flex-col gap-4">
        <AdPlacementCode adPlacement={adPlacement} />
        <AdPlacementCampaignAdCard adPlacementId={id} />
      </Container>
    </>
  );
};

export default AdPlacementPage;
