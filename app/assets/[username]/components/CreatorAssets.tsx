'use client';

import { Separator } from '@/components/ui/separator';
import { GET_ALL_CREATORS_QUERY, GET_CREATORS_ASSETS_QUERY } from '@/packages/gql/api/adminAPI';
import { UPDATE_CREATOR_PROFILE_BY_ADMIN_MUTATION } from '@/packages/gql/api/creatorAPI';
import { AssetType, ExtendedUpdateCreatorProfileInput, GetUserQuery, SortOrder } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useAssetsStore } from '@/zustand/assets.store';
import { useMutation, useQuery } from '@apollo/client/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AssetsHeader } from './Header';
import { SlideShow } from './SlideShow';
import { AssetsThread } from './Thread';

interface Props {
  data?: GetUserQuery;
}

export const CreatorAssets: React.FC<Props> = ({ data: creatorData }) => {
  const searchParams = useSearchParams();
  const [slideShow, setSlideShow] = useState<boolean>(false);
  const [slideUrls, setSlideUrls] = useState<string[]>([]);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const { updated } = useAssetsStore();

  const [updateCreatorProfile] = useMutation(UPDATE_CREATOR_PROFILE_BY_ADMIN_MUTATION, {
    refetchQueries() {
      return [{ query: GET_ALL_CREATORS_QUERY, variables: { input: { take: 100, pageNumber: Number(searchParams.get('p') || 1) } } }];
    }
  });

  const {
    data: assets,
    refetch,
    fetchMore
  } = useQuery(GET_CREATORS_ASSETS_QUERY, {
    variables: { input: { limit: 50, offset: 0, assetType: assetType, relatedUserId: creatorData?.getUser.id, orderBy: SortOrder.Asc } }
  });

  const handleRefetch = async () => {
    await refetch();
  };

  const handleLoadMore = async () => {
    const { data } = await fetchMore({
      variables: {
        input: {
          offset: assets?.getCreatorAssetsByAdmin.length,
          limit: 50,
          assetType: assetType,
          orderBy: SortOrder.Asc,
          relatedUserId: creatorData?.getUser.id
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const merged = [...prev.getCreatorAssetsByAdmin, ...fetchMoreResult.getCreatorAssetsByAdmin];

        return {
          getCreatorAssetsByAdmin: Array.from(new Map(merged.map((asset) => [asset.id, asset])).values())
        };
      }
    });

    setSlideUrls((prev) => [...prev, ...(data?.getCreatorAssetsByAdmin.map(({ asset }) => asset.rawUrl) ?? [])]);
    setHasNext(!!data?.getCreatorAssetsByAdmin.length);
  };

  const handleFetchSlideUrls = () => {
    setSlideUrls(assets?.getCreatorAssetsByAdmin.map(({ asset }) => asset.rawUrl) ?? []);
  };

  const handleUpdateCreatorProfile = async (input: ExtendedUpdateCreatorProfileInput) => {
    try {
      if (!creatorData?.getUser.id) return;
      await updateCreatorProfile({ variables: { input } });
      toast.success('Updated creator profile');
    } catch {
      toast.error('Something wrong happened'!);
    }
  };

  useEffect(() => {
    handleFetchSlideUrls();
  }, []); //eslint-disable-line

  useEffect(() => {
    handleRefetch();
  }, [updated]); //eslint-disable-line

  return (
    <PageWrapper>
      <AssetsHeader
        onSlideShowOff={() => setSlideShow(false)}
        assetType={assetType}
        setAssetType={setAssetType}
        onRefresh={handleRefetch}
      />
      <Separator />
      {slideShow ? (
        <Div className="w-full flex md:flex-row flex-col md:w-[calc(100vw-var(--sidebar-width))] h-full">
          <SlideShow slideUrls={slideUrls} onLoadMore={handleLoadMore} />
        </Div>
      ) : (
        <AssetsThread
          hasNext={hasNext}
          assets={assets}
          onLoadMore={handleLoadMore}
          onSlideShow={() => {
            handleFetchSlideUrls();
            setSlideShow((prev) => !prev);
          }}
          onUpdateCreatorProfile={(input) => handleUpdateCreatorProfile(input)}
        />
      )}
    </PageWrapper>
  );
};
