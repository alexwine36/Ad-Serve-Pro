import { auth } from '@repo/auth/auth';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { redirect } from 'next/navigation';

import type { ReactNode } from 'react';

import { GlobalSidebar } from './components/sidebar';
type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProperties) => {
  const session = await auth();

  if (!session?.user) {
    redirect('/sign-in');
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>{children}</GlobalSidebar>
    </SidebarProvider>
  );
};

export default AppLayout;
