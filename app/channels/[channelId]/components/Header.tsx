import { ApplyTheme } from '@/components/ApplyTheme';
import { SAvatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Div, Typography } from '@/wrappers/HTMLWrappers';
import { ArrowBigLeftDash, GalleryVerticalEnd, Menu, VolumeOff } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export const MessageHeader = () => {
  const router = useRouter();
  return (
    <Div className="fixed top-0 left-0 md:left-[var(--sidebar-width)] md:right-[var(--sidebar-width)]  right-0 flex flex-row bg-white dark:bg-black items-center justify-between border-b bg-gradient-to-bl px-2 z-40 h-16">
      <Div className="flex flex-row justify-between space-x-3 items-center">
        <Button variant={'outline'} size={'lg'} onClick={() => router.back()}>
          <ArrowBigLeftDash />
        </Button>
        <Div className="cursor-pointer">
          <SAvatar />
        </Div>
        <Div className="flex flex-col">
          <Typography className="font-bold">{'Meow User'}</Typography>
          <Typography className="font-semibold text-xs">{moment(new Date()).format('hh:mm')}</Typography>
        </Div>
      </Div>
      <Div className="flex flex-row items-center space-x-3">
        <Div className="hidden md:flex">
          <ApplyTheme />
        </Div>
        <Div className="flex items-center gap-2">
          <Button className="hidden md:inline-flex">
            <GalleryVerticalEnd />
          </Button>
          <Button className="hidden md:inline-flex">
            <VolumeOff />
          </Button>
          <Button className="md:hidden inline-flex">
            <Menu />
          </Button>
        </Div>
      </Div>
    </Div>
  );
};
