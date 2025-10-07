'use client';

import { useIsMobile } from '@/hooks/useMobile';
import { Icons } from '@/lib/icons/Icons';
import { cn } from '@/lib/utils';
import { Typography } from '@/wrappers/HTMLWrappers';
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

  if (_pathname === '/channels') return null;

  return (
    <div
      className={cn('flex flex-row w-full justify-between border-b bg-gradient-to-bl px-2 h-16 bg-[var(--background)] z-50 sticky top-0')}
    >
      <div className="flex flex-row items-center gap-2">
        {!open && !isMobile && (
          <Button onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        )}
        <ReturnToPreviousPage applyReturn />
        <div className="cursor-pointer ">{Icons.appIcon()}</div>
        <Typography className="font-semibold text-xl animate-pulse">{header}</Typography>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <ApplyHeaderOptions />
      </div>
    </div>
  );
};
