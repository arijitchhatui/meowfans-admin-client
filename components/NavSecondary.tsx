import { type LucideIcon } from 'lucide-react';
import React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { useParams, usePathname } from 'next/navigation';

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    badge?: React.ReactNode;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();
  const { channelId, username } = useParams();

  const handlePathName = () => {
    switch (pathname) {
      case `/channels/${channelId}`:
        return '/channels';
      case `/vaults/${username}`:
        return '/vaults';
      case `/assets/${username}`:
        return '/assets';
      case `/profiles/${username}`:
      case `/profiles/${username}/details`:
        return '/profiles';
      default:
        return pathname;
    }
  };
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={handlePathName() === item.url}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
