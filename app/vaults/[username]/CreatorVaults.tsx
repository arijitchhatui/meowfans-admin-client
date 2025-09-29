'use client';

import { UploadVaultsModal } from '@/components/modals/UploadVaultsModal';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_CREATOR_VAULT_OBJECTS_QUERY } from '@/packages/gql/api/adminAPI';
import { DownloadStates, GetCreatorVaultObjectsByAdminQuery, GetUserQuery, VaultObjectsEntity } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useQuery } from '@apollo/client/react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CreatorVaultUrls } from './CreatorVaultUrls';
import { CreatorVaultsHeader } from './CreatorVaultsHeader';

interface Props {
  data?: GetUserQuery;
}

export default function CreatorVaults({ data: creatorData }: Props) {
  const LIMIT = 500;
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [uploadVaultModal, setUploadVaultModal] = useState<boolean>(false);
  const [hasSelectedThirty, setHasSelectedThirty] = useState<boolean>(false);
  const [status, setStatus] = useState<DownloadStates>(DownloadStates.Pending);
  const { data, refetch, fetchMore, loading } = useQuery(GET_CREATOR_VAULT_OBJECTS_QUERY, {
    variables: {
      input: {
        limit: 50,
        offset: 0,
        status: status,
        relatedUserId: creatorData?.getUser.id
      }
    }
  });

  const creatorVaultObjects = data?.getCreatorVaultObjectsByAdmin.vaultObjects ?? [];
  const [dataLength, setDataLength] = useState<number>(creatorVaultObjects.length || 0);

  const handleRefetch = async () => {
    await refetch();
  };

  const handleFetchMore = async (limit?: number) => {
    const { data: newData } = await fetchMore({
      variables: {
        input: {
          offset: creatorVaultObjects.length,
          limit: limit || LIMIT,
          status: status,
          relatedUserId: creatorData?.getUser.id
        }
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousQueryResult;
        return {
          getCreatorVaultObjectsByAdmin: {
            ...previousQueryResult.getCreatorVaultObjectsByAdmin,
            vaultObjects: [
              ...previousQueryResult.getCreatorVaultObjectsByAdmin.vaultObjects,
              ...fetchMoreResult.getCreatorVaultObjectsByAdmin.vaultObjects
            ],
            count: fetchMoreResult.getCreatorVaultObjectsByAdmin.count || 0
          }
        };
      }
    });
    const newCreatorVaultObjects = newData?.getCreatorVaultObjectsByAdmin.vaultObjects;
    setHasNext(!!newCreatorVaultObjects?.length);
    setDataLength(data?.getCreatorVaultObjectsByAdmin.count || 0);
    return newData;
  };

  const handleToggle = (id: string) => {
    setSelectedUrls((prev) => {
      const hasSelected = prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id];
      return hasSelected;
    });
  };

  const handleSelectThirty = async (hasSelected: boolean, length: number) => {
    setHasSelectedThirty(hasSelected);
    let vaultObjectData = creatorVaultObjects || [];

    if (length > data!.getCreatorVaultObjectsByAdmin.vaultObjects.length) {
      const newVaultObjectData = await handleFetchMore(length - data!.getCreatorVaultObjectsByAdmin.vaultObjects.length);
      vaultObjectData = [
        ...(creatorVaultObjects || []),
        ...(newVaultObjectData?.getCreatorVaultObjectsByAdmin.vaultObjects || [])
      ];
    }

    setSelectedUrls(
      !hasSelectedThirty
        ? vaultObjectData
            .filter((vault) => vault.status !== DownloadStates.Fulfilled && vault.status !== DownloadStates.Processing)
            .map((v) => v.id)
            .slice(0, length) ?? []
        : []
    );
  };

  const handleScrollToTheBottom = () => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      });
    });
  };

  const handleScrollToTheTop = () => {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    });
  };

  useEffect(() => {
    setDataLength(data?.getCreatorVaultObjectsByAdmin.count || 0);
  }, [loading, status]); //eslint-disable-line

  useEffect(() => {
    setHasNext(true);
  }, [status]);

  useEffect(() => {
    handleRefetch();
  }, [status]); //eslint-disable-line

  return (
    <PageWrapper className="w-full">
      <CreatorVaultsHeader
        creatorData={creatorData as GetUserQuery}
        data={data as GetCreatorVaultObjectsByAdminQuery}
        dataLength={dataLength}
        hasSelectedThirty={hasSelectedThirty}
        isLoading={loading}
        onRefetch={handleRefetch}
        onSelectThirty={(selected, count) => handleSelectThirty(selected, count)}
        onSetStatus={(stat) => setStatus(stat)}
        onUploadVaultModal={() => setUploadVaultModal(true)}
        selectedUrls={selectedUrls}
        status={status}
      />

      {creatorVaultObjects.length ? (
        <div className="relative h-full">
          <ScrollArea className="h-[calc(100vh-160px)] w-full p-1">
            <div ref={topRef} className="p-0" />
            {creatorVaultObjects.map((vaultObject, idx) => (
              <Div key={idx} className="flex flex-col rounded-md border my-1 p-2">
                <CreatorVaultUrls
                  idx={idx}
                  isLoading={loading}
                  onToggle={(id) => handleToggle(id)}
                  selectedUrls={selectedUrls}
                  vaultObject={vaultObject as VaultObjectsEntity}
                />
              </Div>
            ))}

            {hasNext ? (
              <Div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleFetchMore(LIMIT)}>
                  Next
                </Button>
              </Div>
            ) : (
              <Div className="text-center tracking-tight py-4">
                <p>Looks like you have reached the end!</p>
              </Div>
            )}
            <div ref={bottomRef} className="m-0 p-0" />
          </ScrollArea>
          <Div className="absolute right-3 bottom-20 flex flex-col gap-3 sm:bottom-10">
            <Button size="icon" onClick={handleScrollToTheTop} className="rounded-full shadow-lg">
              <ArrowBigUp />
            </Button>
            <Button size="icon" onClick={handleScrollToTheBottom} className="rounded-full shadow-lg">
              <ArrowBigDown />
            </Button>
          </Div>
        </div>
      ) : (
        <Div className="text-center">
          <p>Looks like there is nothing here</p>
        </Div>
      )}

      <UploadVaultsModal
        creatorData={creatorData}
        onJobAdded={() => {
          handleRefetch();
          setHasSelectedThirty(false);
        }}
        isOpen={uploadVaultModal}
        onCancel={() => {
          setHasSelectedThirty(false);
          setSelectedUrls([]);
        }}
        setOpen={setUploadVaultModal}
        vaultObjectIds={selectedUrls}
      />
    </PageWrapper>
  );
}
