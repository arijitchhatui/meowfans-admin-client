'use client';

import { NavMain } from '@/components/NavMain';
import { TeamSwitcher } from '@/components/TeamSwitcher';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { appSideBarButtonOptions, authenticatedPaths } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { ApplyTheme } from './ApplyTheme';
import { NavSecondary } from './NavSecondary';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isNotAuthenticated =
    !authenticatedPaths.includes(pathname) &&
    !pathname.startsWith('/channels') &&
    !pathname.startsWith('/vaults') &&
    !pathname.startsWith('/assets');

  if (isNotAuthenticated) return null;

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex flex-row">
          <TeamSwitcher teams={appSideBarButtonOptions.teams} />
          <ApplyTheme />
        </div>
        <NavMain items={appSideBarButtonOptions.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={appSideBarButtonOptions.navSecondary} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
