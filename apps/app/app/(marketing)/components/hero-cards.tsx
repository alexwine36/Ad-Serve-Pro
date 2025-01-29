import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Check, LightbulbIcon } from 'lucide-react';
import { cn } from '../../../../../packages/design-system/lib/utils';
import { MarketingLinks } from '../../../utils/constants/marketing-links';
import { TeamCard } from './team';
// import { LightBulbIcon } from './Icons';

export const HeroCards = () => {
  return (
    <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex ">
      {/* Testimonial */}
      <Card className="-top-[15px] absolute w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="https://github.com/shadcn.png" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">John Doe React</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This landing page is awesome!</CardContent>
      </Card>

      {/* Team */}
      <TeamCard
        imageUrl="https://i.pravatar.cc/150"
        position="Developer"
        // description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente."
        className={cn(
          'absolute top-4 right-[20px] ',
          'bg-card',
          'flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10'
        )}
        name="Some Name"
        socialNetworks={MarketingLinks.socialLinks.map((l) => {
          return {
            name: l.label,
            url: l.href,
          };
        })}
      />

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72 shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="item-center flex justify-between">
            Free
            <Badge variant="secondary" className=" text-sm">
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="font-bold text-3xl">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="m-auto mb-4 w-4/5" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {['4 Team member', '4 GB Storage', 'Upto 6 pages'].map(
              (benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{' '}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute right-[20px] bottom-[35px] w-80 shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="mt-1 rounded-2xl bg-primary/20 p-1">
            <LightbulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="mt-2 text-md">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
