import { PrismaClient } from '@repo/database';
import { keys } from './keys';
import { seedCompanysCampaigns } from './lib/campaign';
import { seedCompanies } from './lib/company';
import { getOrganization, seedMembers } from './lib/organization';
import { generatePages } from './lib/page';

const _env = keys();

const prisma = new PrismaClient();

(async () => {
  try {
    const org = await getOrganization(
      {
        name: 'Acme Inc.',
      },
      prisma
    );
    await seedMembers(org, prisma);
    const companies = await seedCompanies(org, prisma);
    const _campaigns = await seedCompanysCampaigns(companies, prisma);
    const _otherOrg = await getOrganization(
      {
        name: "Bob's Burgers",
      },
      prisma
    );
    const _pages = await generatePages(prisma);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
