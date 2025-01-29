import { auth } from '@repo/auth/auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Container } from '@repo/design-system/components/ui/container';
import { redirect } from 'next/navigation';
import { Header } from '../components/header';
import { MemberTable } from './components/member-table';
import { OrganizationProvider } from './components/organization-provider';
const Settings = async () => {
  const session = await auth();

  if (
    !session?.user.currentOrganizationId ||
    session.user.currentRole === 'MEMBER'
  ) {
    redirect('/');
  }

  return (
    <>
      <Header page="Settings" pages={[]} />
      <Container className="flex flex-1 flex-col gap-4 ">
        <Card>
          <CardHeader>
            <CardTitle>Organization Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <OrganizationProvider
              organizationId={session.user.currentOrganizationId}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberTable />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Settings;
