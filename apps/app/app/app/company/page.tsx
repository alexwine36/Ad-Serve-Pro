import {
  BanCard,
  type BanCardProps,
} from '@repo/design-system/components/custom/ban-card';
import { Container } from '@repo/design-system/components/ui/container';
import { BriefcaseBusiness, Calendar, DollarSign, Users } from 'lucide-react';
import { redirect } from 'next/navigation';
import { auth } from '../../../../../packages/auth/auth';
import { trpcCaller } from '../../../utils/trpc-server';
import { Header } from '../components/header';
import { CompanyCard } from './components/company-card';
const CompanyPage = async () => {
  const session = await auth();

  if (!session?.user.currentOrganizationId) {
    redirect('/');
  }

  const caller = await trpcCaller();

  const companies = await caller.company.getAll({});

  const stats: BanCardProps[] = [
    {
      title: 'Total Revenue',
      value: 45231.89,
      decimalPlaces: 2,
      prefix: '$',
      icon: (
        <DollarSign
          style={{
            width: '1em',
            height: '1em',
          }}
        />
      ),
      description: '+20.1% from last month',
    },
    {
      title: 'Subscriptions',
      description: '+180.1% from last month',
      value: 231,
      prefix: '+',
      icon: (
        <Users
          style={{
            width: '1em',
            height: '1em',
          }}
        />
      ),
    },
    {
      title: 'Sales',
      value: 12234,
      prefix: '+',
      icon: (
        <Calendar
          style={{
            width: '1em',
            height: '1em',
          }}
        />
      ),
      description: '+10.1% from last month',
    },
    {
      title: 'Companies',
      value: companies.length || 0,
      description: 'Total number of companies in your organization',
      icon: (
        <BriefcaseBusiness
          style={{
            width: '1em',
            height: '1em',
          }}
        />
      ),
    },
  ];
  return (
    <>
      <Header page="Companies" pages={[]} />

      <Container className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <BanCard key={idx} {...stat} />
          ))}
        </div>
        <CompanyCard />
      </Container>
    </>
  );
};

export default CompanyPage;
