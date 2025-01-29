import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { buttonVariants } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { FacebookIcon } from 'lucide-react';
import { cn } from '../../../../../packages/design-system/lib/utils';

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description?: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: 'https://i.pravatar.cc/150?img=35',
    name: 'Emma Smith',
    position: 'Product Manager',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
      },
    ],
  },
  {
    imageUrl: 'https://i.pravatar.cc/150?img=60',
    name: 'John Doe',
    position: 'Tech Lead',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
      },
    ],
  },
  {
    imageUrl: 'https://i.pravatar.cc/150?img=36',
    name: 'Ashley Ross',
    position: 'Frontend Developer',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
      },

      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
      },
    ],
  },
  {
    imageUrl: 'https://i.pravatar.cc/150?img=17',
    name: 'Bruce Rogers',
    position: 'Backend Developer',
    socialNetworks: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/leopoldo-miranda/',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
      },
    ],
  },
];

type TeamCardProps = TeamProps & {
  className?: string;
};

export const TeamCard = ({
  imageUrl,
  position,
  name,
  socialNetworks,
  description,
  className,
}: TeamCardProps) => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <LinkedInLogoIcon className="h-5 w-5" />;

      case 'Facebook':
        return <FacebookIcon size="20" />;

      case 'Instagram':
        return <InstagramLogoIcon className="h-5 w-5" />;

      default:
        return null;
    }
  };

  return (
    <Card
      className={cn(
        'relative mt-8 flex flex-col items-center justify-center bg-muted/50',
        className
      )}
    >
      <CardHeader className="mt-8 flex items-center justify-center pb-2">
        <img
          src={imageUrl}
          alt={`${name} ${position}`}
          className="-top-12 absolute aspect-square h-24 w-24 rounded-full object-cover"
        />
        <CardTitle className="text-center">{name}</CardTitle>
        <CardDescription className="text-primary">{position}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2 text-center">
        <p>
          {description ||
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
        </p>
      </CardContent>

      <CardFooter>
        {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
          <div key={name}>
            <a
              rel="noreferrer noopener"
              href={url}
              target="_blank"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className="sr-only">{name} icon</span>
              {socialIcon(name)}
            </a>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export const Team = () => {
  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="font-bold text-3xl md:text-4xl">
        <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
          Our Dedicated{' '}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-muted-foreground text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {teamList.map((props: TeamProps) => (
          <TeamCard key={props.imageUrl} {...props} />
        ))}
      </div>
    </section>
  );
};
