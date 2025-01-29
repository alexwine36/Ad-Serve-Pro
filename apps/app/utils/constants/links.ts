import type { User } from '@repo/auth/types';
import type { MemberRole } from '@repo/database';
import {
  AnchorIcon,
  BookOpenIcon,
  BotIcon,
  BriefcaseBusiness,
  LayoutDashboard,
  LifeBuoyIcon,
  type LucideProps,
  SendIcon,
  Settings2Icon,
} from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { mapValues } from 'remeda';

type SidebarLink = {
  title: string;
  url: string;
  isActive?: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  items?: SidebarLink[];
  permissions?: MemberRole[];
};

// type SidebarChildLink = Omit<SidebarLink, 'icon'>;

type SidebarLinks = {
  navMain: SidebarLink[];
  navSecondary: SidebarLink[];
  projects: SidebarLink[];
};

export const SidebarLinks: SidebarLinks = {
  // user: {
  //   name: 'shadcn',
  //   email: 'm@example.com',
  //   avatar: '/app/avatars/shadcn.jpg',
  // },
  navMain: [
    {
      title: 'Dashboard',
      url: '/app/',
      icon: LayoutDashboard,
    },
    {
      title: 'Companies',
      url: '/app/company',
      icon: BriefcaseBusiness,
      //   isActive: true,
      items: [
        {
          title: 'All',
          url: '/app/company',
        },
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: BotIcon,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpenIcon,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '/app/settings',
      icon: Settings2Icon,
    },
  ],
  navSecondary: [
    {
      title: 'Webhooks',
      url: '/app/webhooks',
      icon: AnchorIcon,
    },
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoyIcon,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: SendIcon,
    },
  ],
  projects: [
    // {
    //   title: 'Design Engineering',
    //   url: '#',
    //   icon: FrameIcon,
    // },
    // {
    //   title: 'Sales & Marketing',
    //   url: '#',
    //   icon: PieChartIcon,
    // },
    // {
    //   title: 'Travel',
    //   url: '#',
    //   icon: MapIcon,
    // },
  ],
};

const filterLinks = (links: SidebarLink[], user?: User): SidebarLink[] => {
  return links
    .map((link) => {
      if (link.items?.length) {
        return {
          ...link,
          items: filterLinks(link.items || [], user),
        };
      }
      return link;
    })
    .filter((link) => {
      if (link.permissions?.length) {
        if (!user?.currentRole) {
          return false;
        }
        return link.permissions.includes(user?.currentRole);
      }
      return true;
    });
};

export const getSidebarLinks = (pathname: string, user?: User) => {
  return mapValues(SidebarLinks, (value, key) => {
    return filterLinks(value, user).map((link) => {
      if (
        (link.url !== '/app/' && pathname.startsWith(link.url)) ||
        link.items?.some((item) => pathname.startsWith(item.url))
      ) {
        return {
          ...link,
          isActive: true,
        };
      }
      return { ...link };
    });
  });
};
