import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { GitlabIcon } from 'lucide-react';

interface RouteProps {
  href: string;
  label: string;
}

const navRoutes: RouteProps[] = [
  {
    href: '#features',
    label: 'Features',
  },
  {
    href: '#services',
    label: 'Services',
  },
  {
    href: '#testimonials',
    label: 'Testimonials',
  },
  {
    href: '#pricing',
    label: 'Pricing',
  },
];

const getStarted = {
  href: '/app',
  label: 'Get Started',
};

const githubRepo = {
  href: 'https://github.com/alexwine36/turbo-starter',
  label: 'Github Repository',
  icon: GitHubLogoIcon,
};

const socialLinks = [
  {
    ...githubRepo,
    label: 'Github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: LinkedInLogoIcon,
  },
  {
    label: 'GitLab',
    href: 'https://gitlab.com',
    icon: GitlabIcon,
  },
];

const footerLinks = [
  {
    label: 'Follow Us',
    items: socialLinks,
  },
  {
    label: 'Platforms',
    items: ['Web', 'Mobile', 'Desktop'].map((platform) => ({
      label: platform,
      href: `#${platform.toLowerCase()}`,
    })),
  },
  {
    label: 'About',
    items: navRoutes.filter((_, idx) => idx < 3),
  },
];

export const MarketingLinks = {
  navRoutes,
  getStarted,
  socialLinks,
  footerLinks,
  githubRepo,
};
