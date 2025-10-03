'use client';
import { EventsContextWrapper } from '@/hooks/api/EventsContextWrapper';
import { ExtendedUsersContextWrapper } from '@/hooks/context/ExtendedUsersContext';

interface Props {
  children: React.ReactNode;
}

export default function VaultsLayout({ children }: Props) {
  return (
    <ExtendedUsersContextWrapper>
      <EventsContextWrapper>{children}</EventsContextWrapper>
    </ExtendedUsersContextWrapper>
  );
}
