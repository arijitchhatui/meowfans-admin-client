'use client';

import { Separator } from '@/components/ui/separator';
import { GET_ALL_ASSETS_QUERY } from '@/packages/gql/api/adminAPI';
import { AssetType } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useAssetsStore } from '@/zustand/assets.store';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { AssetsHeader } from './Header';
import { SlideShow } from './SlideShow';
import { AssetsThread } from './Thread';

export const Assets = () => {
  const [slideShow, setSlideShow] = useState<boolean>(false);
  const [slideUrls, setSlideUrls] = useState<string[]>([]);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const { updated } = useAssetsStore();

  const {
    data: assets,
    refetch,
    fetchMore
  } = useQuery(GET_ALL_ASSETS_QUERY, {
    variables: { input: { limit: 30, offset: 0, assetType: assetType } }
  });

  const handleRefetch = async () => {
    await refetch();
  };

  const handleLoadMore = async () => {
    const { data } = await fetchMore({
      variables: { input: { offset: assets?.getAllAssetsByAdmin.assets.length, limit: 30, assetType: assetType } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          getAllAssetsByAdmin: {
            ...prev.getAllAssetsByAdmin,
            assets: [...prev.getAllAssetsByAdmin.assets, ...fetchMoreResult.getAllAssetsByAdmin.assets],
            count: fetchMoreResult.getAllAssetsByAdmin.count || 0
          }
        };
      }
    });
    setSlideUrls((prev) => [...prev, ...(data?.getAllAssetsByAdmin.assets.map(({ asset }) => asset.rawUrl) ?? [])]);
  };

  const handleFetchSlideUrls = () => {
    setSlideUrls(assets?.getAllAssetsByAdmin.assets.map(({ asset }) => asset.rawUrl) ?? []);
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
          assets={assets}
          onLoadMore={handleLoadMore}
          onSlideShow={() => {
            handleFetchSlideUrls();
            setSlideShow((prev) => !prev);
          }}
        />
      )}
    </PageWrapper>
  );
};
