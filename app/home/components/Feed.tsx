import { SAvatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Div, Typography } from '@/wrappers/HTMLWrappers';
import { Bookmark, Heart } from 'lucide-react';
import Image from 'next/image';

export const HomeFeed = () => {
  const { open } = useSidebar();
  return (
    <Div className={`"flex flex-col w-full ${open && 'md:w-[calc(100vw-var(--sidebar-width))]'} px-3 m-3"`}>
      <Typography className="pt-5 text-xl font-bold  text-gray-800 dark:text-white tracking-tight">Your feed</Typography>
      <Div className="flex gap-5 overflow-auto snap-x snap-mandatory scrollbar-hide scroll-smooth">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Div key={i} className="snap-center flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden shadow-md relative">
              <Div className="flex flex-col absolute right-0 bottom-0 space-y-1">
                <Button variant="ghost" className="rounded-4xl">
                  <Bookmark color="#FFFFFF" />
                </Button>
                <Button variant="ghost" className="rounded-4xl">
                  <Heart color="#FFFFFF" />
                </Button>
              </Div>
              <SAvatar className="absolute left-0 bottom-0 m-1 text-amber-100" />
              <Image unoptimized src={`./assets/${i + 1}.jpg`} alt={`feed-img-${i}`} className="w-full h-full object-cover" />
            </Div>
          ))}
      </Div>
    </Div>
  );
};
