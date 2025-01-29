import { Button } from '@repo/design-system/components/ui/button';
import Link from 'next/link';
import { COMPANY_NAME } from '../../../utils/constants';
import { MarketingLinks } from '../../../utils/constants/marketing-links';
import { HeroCards } from './hero-cards';

export const Hero = () => {
  const { getStarted, githubRepo } = MarketingLinks;

  return (
    <section className="container grid place-items-center gap-10 overflow-x-hidden py-20 md:py-32 lg:grid-cols-2">
      <div className="space-y-6 text-center lg:text-start">
        <main className="font-bold text-5xl md:text-6xl">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent">
              {COMPANY_NAME}
            </span>{' '}
            landing page
          </h1>{' '}
          for{' '}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent">
              React
            </span>{' '}
            developers
          </h2>
        </main>

        <p className="mx-auto text-muted-foreground text-xl md:w-10/12 lg:mx-0">
          Build your React landing page effortlessly with the required sections
          to your project.
        </p>

        <div className="space-y-4 md:space-x-4 md:space-y-0">
          <Button className="w-full md:w-1/3" asChild>
            <Link href={getStarted.href}>{getStarted.label}</Link>
          </Button>

          <Button className="w-full md:w-1/3" variant={'outline'} asChild>
            <a rel="noreferrer noopener" href={githubRepo.href} target="_blank">
              {githubRepo.label} <githubRepo.icon className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow" />
    </section>
  );
};
