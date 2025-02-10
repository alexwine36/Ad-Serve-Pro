import { database } from '@repo/database/database';
import { About } from './components/about';
import { Cta } from './components/cta';
import { Features } from './components/features';
import { Footer } from './components/footer';
import { Hero } from './components/hero';
import { HowItWorks } from './components/how-it-works';
import { Pricing } from './components/pricing';
import { Services } from './components/services';
import { Sponsors } from './components/sponsors';
import { Team } from './components/team';
import { Testimonials } from './components/testimonials';

export async function getStats() {
  try {
    const userCount = await database.user.count();
    const companyCount = await database.company.count();
    return {
      stats: {
        userCount: userCount,
        companyCount: companyCount,
      },
    };
  } catch (error) {
    console.error('Error fetching stats', error);
    return {
      stats: {
        userCount: 0,
        companyCount: 0,
      },
    };
  }
}

const IndexPage = async () => {
  const { stats } = await getStats();
  console.log(stats);
  return (
    <>
      <Hero />
      <ins
        className="flex items-center justify-center"
        data-ad-placement="top"
        data-ad-size="largeBanner"
      />
      <Sponsors />
      <About stats={stats} />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Footer />
    </>
  );
};

export default IndexPage;
