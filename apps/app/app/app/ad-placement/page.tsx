import { Container } from '@repo/design-system/components/ui/container';
import { redirect } from 'next/navigation';
import { auth } from '../../../../../packages/auth/auth';
import { Header } from '../components/header';
import { AdPlacementCard } from './components/ad-placement-card';

const AdPlacementPage = async () => {
  const session = await auth();

  if (!session?.user.currentOrganizationId) {
    redirect('/');
  }

  // const caller = await trpcCaller();

  return (
    <>
      <Header page="Companies" pages={[]} />

      <Container className="flex flex-col gap-4">
        <AdPlacementCard />
      </Container>
    </>
  );
};

export default AdPlacementPage;
