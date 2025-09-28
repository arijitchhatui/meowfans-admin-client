import { ApplyButtonTooltip } from '@/components/ApplyTooltip';
import { SAvatar } from '@/components/Avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ExtendedUpdateCreatorProfileInput, GetCreatorAssetsByAdminQuery } from '@/packages/gql/generated/graphql';
import { handleFullScreen } from '@/util/helpers';
import { Div } from '@/wrappers/HTMLWrappers';
import { Aperture, FileSliders, Fullscreen, GalleryThumbnails } from 'lucide-react';
import Image from 'next/image';

interface Props {
  hasNext: boolean;
  assets?: GetCreatorAssetsByAdminQuery;
  onLoadMore: () => unknown;
  onSlideShow: () => unknown;
  onUpdateCreatorProfile: (input: ExtendedUpdateCreatorProfileInput) => unknown;
}

export const AssetsThread: React.FC<Props> = ({ assets, onLoadMore, onSlideShow, hasNext, onUpdateCreatorProfile }) => {
  const fullScreenUrls = assets?.getCreatorAssetsByAdmin.map((creatorAsset) => creatorAsset.asset.rawUrl) || [];

  return (
    <Div className="flex flex-row justify-between gap-1 m-1 ">
      <ScrollArea className={cn('h-[calc(100vh-136px)]', 'w-full')}>
        <div className={cn('grid gap-4 grid-cols-2', 'md:grid-cols-5')}>
          {assets?.getCreatorAssetsByAdmin.map((creatorAsset, idx) => (
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
              <ApplyButtonTooltip
                className="absolute bottom-0 right-0"
                tootTipTitle="Set as profile"
                buttonProps={{ icon: Aperture }}
                onClick={() =>
                  onUpdateCreatorProfile({
                    avatarUrl: creatorAsset.asset.rawUrl,
                    creatorId: creatorAsset.creatorProfile.user.id
                  })
                }
              />
              <ApplyButtonTooltip
                className="absolute bottom-10 right-0"
                tootTipTitle="Set as banner"
                buttonProps={{ icon: GalleryThumbnails }}
                onClick={() =>
                  onUpdateCreatorProfile({
                    bannerUrl: creatorAsset.asset.rawUrl,
                    creatorId: creatorAsset.creatorProfile.user.id
                  })
                }
              />
              <Image
                unoptimized
                src={creatorAsset.asset.rawUrl}
                className={cn('cursor-pointer rounded-lg object-cover object-center h-70 w-70')}
                alt="gallery-image"
                width={300}
                height={400}
                loading="lazy"
              />
              <Badge className="absolute bottom-0 left-10">{creatorAsset.creatorProfile.user.username}</Badge>
            </div>
          ))}
        </div>
        {hasNext ? (
          <Div className="flex items-center justify-center space-x-2">
            <Div className="space-x-2">
              <Button variant="outline" size="sm" onClick={onLoadMore}>
                Next
              </Button>
            </Div>
          </Div>
        ) : (
          <Div className="text-center tracking-tight py-4">
            <p>Looks like you have reached at the end!</p>
          </Div>
        )}
      </ScrollArea>
    </Div>
  );
};
