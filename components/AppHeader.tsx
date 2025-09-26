'use client';

import { useIsMobile } from '@/hooks/useMobile';
import { Icons } from '@/lib/icons/Icons';
import { Div, Typography } from '@/wrappers/HTMLWrappers';
import { Menu } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { ApplyHeaderOptions } from './ApplyHeaderOptions';
import { ReturnToPreviousPage } from './ReturnToPreviousPage';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';

interface Props {
  header?: string;
}
export const AppHeader: React.FC<Props> = ({ header }) => {
  const isMobile = useIsMobile();
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();
  const { id: channelId } = useParams();

  const _pathname = pathname === `/channels/${channelId}` ? '/channels' : pathname;

  return (
    <Div
      className={`fixed z-50 top-0 left-0 bg-[var(--background)] ${open && 'md:left-64'} ${
        _pathname === '/channels' ? 'right-64' : 'right-0'
      } flex flex-row items-center justify-between border-b bg-gradient-to-bl px-2  h-16`}
    >
      <Div className="flex flex-row items-center gap-2">
        {!open && !isMobile && (
          <Button onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        )}
        <ReturnToPreviousPage applyReturn />
        <Div className="cursor-pointer ">{Icons.appIcon()}</Div>
        <Typography className="font-semibold text-xl animate-pulse">{header}</Typography>
      </Div>
      <Div className="flex flex-row items-center space-x-3">
        <ApplyHeaderOptions />
      </Div>
    </Div>
  );
};
