'use client';

import { SAvatar } from '@/components/Avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Div, Span } from '@/wrappers/HTMLWrappers';
import Link from 'next/link';
import React from 'react';
import { Channel } from './Channels';

interface Props extends React.ComponentProps<typeof Sidebar> {
  isActive?: boolean;
  channels: Channel[];
}

export const ChannelListBar: React.FC<Props> = ({ channels, ...props }) => {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Members</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton>
                    <Link href={`/channels/${item.path}`}>
                      <Div className="flex flex-row">
                        <SAvatar url={'/icons/app_icon.svg'} />
                        <Span>{item.name}</Span>
                      </Div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
