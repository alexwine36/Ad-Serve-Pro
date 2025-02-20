import { Container } from '@repo/design-system/components/ui/container';
import { trpcCaller } from '../../../../utils/trpc-server';
import { AdvertisementCard } from '../../advertisement/components/advertisement-card';
import { CampaignCard } from '../../campaign/components/campaign-card';
import { Header } from '../../components/header';
import { CompanyContactCard } from './components/company-contact-card';

const CompanyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const caller = await trpcCaller();
  const { id } = await params;
  const company = await caller.company.getOne({ unknown: id });

  if (!company) {
    return <div>Company not found</div>;
  }
  return (
    <>
      <Header
        page={company?.name}
        pages={[{ label: 'Companies', href: '/app/company' }]}
      />
      <Container className="flex flex-col gap-4">
        <CampaignCard companyId={company.id} />
        <AdvertisementCard companyId={company.id} />

        <CompanyContactCard companyId={company.id} />
      </Container>
    </>
  );
};

export default CompanyPage;
