import { Button } from '@repo/design-system/components/ui/button';
import Link from 'next/link';

export const Cta = () => {
  return (
    <section id="cta" className="my-24 bg-muted/50 py-16 sm:my-32">
      <div className="container place-items-center lg:grid lg:grid-cols-2">
        <div className="lg:col-start-1">
          <h2 className="font-bold text-3xl md:text-4xl ">
            All Your
            <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
              {' '}
              Ideas & Concepts{' '}
            </span>
            In One Interface
          </h2>
          <p className="mt-4 mb-8 text-muted-foreground text-xl lg:mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi,
            sed!
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto">Request a Demo</Button>
          <Button variant="outline" className="w-full md:w-auto" asChild>
            <Link href="#features">View all features</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
