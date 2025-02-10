import { Container } from '@repo/design-system/components/ui/container';
import { redirect } from 'next/navigation';
import { trpcCaller } from '../../../../../../utils/trpc-server';
import { AdvertisementContent } from '../../../../advertisement/components/advertisement-content';
import { Header } from '../../../../components/header';

const AdvertisementPage = async ({
  params,
}: { params: Promise<{ adId: string; id: string }> }) => {
  const caller = await trpcCaller();
  const { adId, id } = await params;
  const advertisement = await caller.advertisement.getOne({ id: adId });
  const company = await caller.company.getOne({ unknown: id });
  if (!advertisement) {
    return redirect('/app/company');
  }
  return (
    <>
      <Header
        page={`${advertisement?.name} Advertisement`}
        pages={[
          { label: 'Companies', href: '/app/company' },
          { label: company?.name || '', href: `/app/company/${id}` },
          //   { label: 'Advertisements', href: `/app/company/${id}/advertisement` },
        ]}
      />
      <Container className="flex flex-col gap-4">
        <AdvertisementContent {...advertisement} />
        {/* <AdvertisementCard advertisementId={advertisement.id} />
        <CampaignCard advertisementId={advertisement.id} />
        <CompanyContactCard advertisementId={advertisement.id} /> */}
      </Container>
    </>
  );
};

export default AdvertisementPage;
