import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { ChartBarIcon, Search, WalletIcon } from 'lucide-react';
import type { JSX } from 'react';

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: 'Code Collaboration',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    icon: <ChartBarIcon />,
  },
  {
    title: 'Project Management',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    icon: <WalletIcon />,
  },
  {
    title: 'Task Automation',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
    icon: <Search />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32" id="services">
      <div className="grid place-items-center gap-8 lg:grid-cols-[1fr,1fr]">
        <div>
          <h2 className="font-bold text-3xl md:text-4xl">
            <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
              Client-Centric{' '}
            </span>
            Services
          </h2>

          <p className="mt-4 mb-8 text-muted-foreground text-xl ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            dolor.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
                  <div className="mt-1 rounded-2xl bg-primary/20 p-1">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="mt-2 text-md">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={'https://picsum.photos/600'}
          className="w-[300px] object-contain md:w-[500px] lg:w-[600px]"
          alt="About services"
        />
      </div>
    </section>
  );
};
