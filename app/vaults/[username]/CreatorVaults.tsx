'use client';

import { LoadingButton } from '@/components/LoadingButton';
import { UploadVaultsModal } from '@/components/modals/UploadVaultsModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_CREATOR_VAULT_OBJECTS_QUERY } from '@/packages/gql/api/adminAPI';
import { DownloadStates, GetUserQuery } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useQuery } from '@apollo/client/react';
import { Download, Funnel, LucideLassoSelect, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu';
import { CreatorVaultUrls } from './CreatorVaultUrls';

interface Props {
  data?: GetUserQuery;
}

export default function CreatorVaults({ data: creatorData }: Props) {
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [hasSelectedThirty, setHasSelectedThirty] = useState<boolean>(false);
  const [uploadVaultModal, setUploadVaultModal] = useState<boolean>(false);
  const [status, setStatus] = useState<DownloadStates>(DownloadStates.Pending);
  const [hasNext, setHasNext] = useState<boolean>(false);

  const { data, refetch, fetchMore, loading } = useQuery(GET_CREATOR_VAULT_OBJECTS_QUERY, {
    variables: {
      input: { limit: 100, offset: 0, status: status, relatedUserId: creatorData?.getUser.id }
    }
  });

  const [dataLength, setDataLength] = useState<number>(data?.getCreatorVaultObjectsByAdmin.vaultObjects.length || 0);

  const handleRefetch = async () => {
    await refetch();
  };

  const handleFetchMore = async () => {
    const { data: newData } = await fetchMore({
      variables: {
        input: {
          offset: data?.getCreatorVaultObjectsByAdmin.vaultObjects.length,
          limit: 100,
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
    setHasNext(!!newData?.getCreatorVaultObjectsByAdmin.vaultObjects.length);
    setDataLength(data?.getCreatorVaultObjectsByAdmin.count || 0);
  };

  const handleToggle = (id: string) => {
    setSelectedUrls((prev) => {
      const hasSelected = prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id];
      return hasSelected;
    });
  };

  const handleSelectThirty = async (hasSelected: boolean, length: number) => {
    setHasSelectedThirty(hasSelected);
    setSelectedUrls(
      !hasSelectedThirty
        ? data?.getCreatorVaultObjectsByAdmin.vaultObjects
            .filter((vault) => vault.status !== DownloadStates.Fulfilled && vault.status !== DownloadStates.Processing)
            .map((v) => v.id)
            .slice(0, length) ?? []
        : []
    );
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
    <Div className="w-full">
      <Div className="flex items-center justify-between space-x-1 sticky top-15 z-50">
        <Div className="flex flex-row space-x-2">
          <Button>{dataLength}</Button>
          <div className="grid gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Funnel />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={status} onValueChange={(val) => setStatus(val as DownloadStates)}>
                  <DropdownMenuRadioItem value={DownloadStates.Fulfilled}>Fulfilled</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={DownloadStates.Pending}>Pending</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={DownloadStates.Processing}>Processing</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={DownloadStates.Rejected}>Rejected</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Badge>{creatorData?.getUser.username}</Badge>
        </Div>
        <Div className="flex flex-row space-x-2">
          {hasSelectedThirty ? (
            <Button
              variant="outline"
              className="ml-auto transition-all duration-300 ease-in-out animate-slide-up"
              onClick={() => handleSelectThirty(false, 0)}
            >
              Deselect all
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <LucideLassoSelect />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={'30'} onValueChange={(val) => handleSelectThirty(true, Number(val))}>
                  <DropdownMenuRadioItem value={'5'}>5</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'10'}>10</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'30'}>30</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={String(data?.getCreatorVaultObjectsByAdmin.vaultObjects.length)}>All</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <LoadingButton
            variant="outline"
            className="ml-auto animate-bounce"
            onClick={() => setUploadVaultModal(true)}
            disabled={!selectedUrls.length}
            title={String(selectedUrls.length)}
            Icon={Download}
            loading={loading}
          />
          <Button variant="outline" className="ml-auto" onClick={handleRefetch}>
            <RefreshCcw />
          </Button>
        </Div>
      </Div>
      {data?.getCreatorVaultObjectsByAdmin.vaultObjects.length ? (
        <ScrollArea className="overflow-y-auto h-[calc(100vh-140px)] w-full p-1">
          {data?.getCreatorVaultObjectsByAdmin.vaultObjects.map((vaultObject, idx) => (
            <Div key={idx} className="flex flex-col rounded-md border my-1 p-2">
              <CreatorVaultUrls
                idx={idx}
                isLoading={loading}
                onToggle={(id) => handleToggle(id)}
                selectedUrls={selectedUrls}
                vaultObject={Object.assign(vaultObject)}
              />
            </Div>
          ))}
          {hasNext ? (
            <Div className="flex items-center justify-center space-x-2">
              <Div className="space-x-2">
                <Button variant="outline" size="sm" onClick={handleFetchMore}>
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
    </Div>
  );
}
