'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { appSideBarButtonOptions, authenticatedPaths } from '@/lib/constants';
import { MotionPresets } from '@/lib/MotionPresets';
import { Div, Span } from '@/wrappers/HTMLWrappers';
import { X } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen } = useSidebar();
  const { id: channelId, username } = useParams();
  const isNotAuthenticated = !authenticatedPaths.includes(pathname) && !pathname.startsWith('/channels') && !pathname.startsWith('/vaults');
  if (isNotAuthenticated) return null;

  const handlePathName = () => {
    switch (pathname) {
      case `/channels/${channelId}`:
        return '/channels';
      case `/vaults/${username}`:
        return '/vaults';
      default:
        return pathname;
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row justify-between">
            MEOW
            {isNotAuthenticated && (
              <Button variant={'outline'} onClick={() => setOpen(false)}>
                <X />
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appSideBarButtonOptions.map((item) => (
                <SidebarMenuItem key={item.title} className="rounded-2xl  ">
                  <MotionPresets motionType="SlideRightToLeft">
                    <SidebarMenuButton
                      className={`${handlePathName() === item.path && 'bg-blue-200'} `}
                      asChild
                      onClick={() => router.push(item.path)}
                    >
                      <Div className="flex flex-row">
                        <item.icon />
                        <Span>{item.title}</Span>
                      </Div>
                    </SidebarMenuButton>
                  </MotionPresets>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
