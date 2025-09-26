import { ReturnToPreviousPage } from '@/components/ReturnToPreviousPage';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Icons } from '@/lib/icons/Icons';
import { Div } from '@/wrappers/HTMLWrappers';
import { Menu } from 'lucide-react';

export const ChannelHeader = () => {
  const { setOpen, open } = useSidebar();
  return (
    <Div className="fixed top-0 left-0 md:left-[var(--sidebar-width)] md:right-[var(--sidebar-width)] right-0 flex flex-row bg-white dark:bg-black items-center justify-between border-b bg-gradient-to-bl px-2 z-40 h-16">
      <Div className="flex flex-row items-center gap-2">
        {!open && (
          <Button onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        )}
        <ReturnToPreviousPage />
        <Div className="cursor-pointer">{Icons.appIcon()}</Div>
      </Div>
    </Div>
  );
};  
