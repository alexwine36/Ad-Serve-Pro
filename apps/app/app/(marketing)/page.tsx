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

const IndexPage = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <About />
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
