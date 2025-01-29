'use client';
import type { User } from '@repo/auth/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@repo/design-system/components/ui/sidebar';
import { cn } from '@repo/design-system/lib/utils';
import type { RouterOutput } from '@repo/trpc';
import { ChevronsUpDown, Plus } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { trpc } from '../../../utils/trpc';

export const OrgSwitcher = ({
  user,
}: {
  user: User;
}) => {
  const { isMobile } = useSidebar();
  const utils = trpc.useUtils();

  const { data: organizations, isLoading } = trpc.organization.getAll.useQuery(
    {}
  );
  const { mutate } = trpc.user.setCurrentOrg.useMutation({
    onSuccess: () => {
      utils.user.me.invalidate();
      utils.organization.getAll.invalidate();
    },
  });
  const currentOrganizationId = user?.currentOrganizationId;
  const activeTeam = React.useMemo(() => {
    if (currentOrganizationId) {
      return organizations?.find((org) => org.id === currentOrganizationId);
    }
    return undefined;
  }, [organizations, currentOrganizationId]);

  const handleOrgChange = (team: RouterOutput['organization']['getAll'][0]) => {
    mutate({ organizationId: team.id });
  };

  if (!organizations || isLoading) {
    return null;
  }

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu
      className={cn('overflow-hidden transition-all [&>div]:w-full')}
    >
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={activeTeam.image || undefined} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  {activeTeam.name.split(' ').reduce((acc, cur) => {
                    return acc + cur[0].toUpperCase();
                  }, '')}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.role}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {organizations.map((team, index) => (
              <DropdownMenuItem
                className="gap-2 p-2"
                key={team.name}
                onClick={() => handleOrgChange(team)}
              >
                {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div> */}
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2 p-2">
              <Link href="/organization/new" passHref>
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add team
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
