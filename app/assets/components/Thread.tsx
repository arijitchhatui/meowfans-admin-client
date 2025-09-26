import { SAvatar } from '@/components/Avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { GetAllAssetsByAdminQuery } from '@/packages/gql/generated/graphql';
import { handleFullScreen } from '@/util/helpers';
import { Div } from '@/wrappers/HTMLWrappers';
import { FileSliders, Fullscreen } from 'lucide-react';
import Image from 'next/image';

interface Props {
  assets?: GetAllAssetsByAdminQuery;
  onLoadMore: () => unknown;
  onSlideShow: () => unknown;
}

export const AssetsThread: React.FC<Props> = ({ assets, onLoadMore, onSlideShow }) => {
  const fullScreenUrls = assets?.getAllAssetsByAdmin.assets.map((creatorAsset) => creatorAsset.asset.rawUrl) || [];

  return (
    <Div className="flex flex-row justify-between gap-1 m-1 ">
      <ScrollArea className={cn('h-[calc(100vh-136px)]', 'w-full')}>
        <div className={cn('grid gap-4 grid-cols-2', 'md:grid-cols-5')}>
          {assets?.getAllAssetsByAdmin.assets.map((creatorAsset, idx) => (
            <div key={creatorAsset.id} className="relative flex">
              <Div className="flex flex-col justify-between">
                <Button className="absolute top-0 left-0 bg-transparent" size={'icon'} onClick={onSlideShow}>
                  <FileSliders />
                </Button>
                <Button
                  className="absolute top-0 right-0 cursor-pointer bg-transparent border-dashed"
                  size={'icon'}
                  onClick={() => handleFullScreen(creatorAsset.asset.rawUrl, idx, fullScreenUrls)}
                >
                  <Fullscreen />
                </Button>
              </Div>
              <SAvatar url={creatorAsset.creatorProfile.user.avatarUrl} fallback="creator" className="absolute bottom-0 left-0" />
              <Badge className="absolute bottom-0 left-10">{creatorAsset.creatorProfile.user.username}</Badge>

              <Image
                src={creatorAsset.asset.rawUrl}
                className={cn('cursor-pointer rounded-lg object-cover object-center h-70 w-70')}
                alt="gallery-image"
                width={300}
                height={400}
                loading="lazy"
              />
              <Badge className="absolute bottom-0 right-0 bg-blue-500">{creatorAsset.type}</Badge>
            </div>
          ))}
        </div>
        {assets && assets?.getAllAssetsByAdmin.assets.length >= 10 && (
          <Div className="flex justify-center mx-auto p-0 m-0">
            <Button className="" onClick={onLoadMore}>
              Load More
            </Button>
          </Div>
        )}
      </ScrollArea>
    </Div>
  );
};
