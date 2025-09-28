'use client';

import { useIsMobile } from '@/hooks/useMobile';
import { appBottomNavButtonOptions, authenticatedPaths } from '@/lib/constants';
import { Div } from '@/wrappers/HTMLWrappers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export const AppBottomNav = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const canNotShowBottomNav =
    !isMobile ||
    (!authenticatedPaths.includes(pathname) &&
      !pathname.startsWith('/vaults') &&
      !pathname.startsWith('/channels') &&
      !pathname.startsWith('/profiles'));

  if (canNotShowBottomNav) return null;

  return (
    <Div className="w-full bg-white dark:bg-black rounded-xl fixed bottom-0 h-16 z-50">
      <Div className="flex flex-row justify-between items-center content-center p-1">
        {appBottomNavButtonOptions.map((button, idx) => (
          <Link href={button.path} key={idx}>
            <Button className="flex flex-col items-center content-center rounded-xl shadow-accent-foreground" variant={'outline'}>
              <button.icon />
            </Button>
          </Link>
        ))}
      </Div>
    </Div>
  );
};
