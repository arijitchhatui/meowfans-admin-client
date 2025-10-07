'use client';

import { LoadingButton } from '@/components/LoadingButton';
import { DownloadVaultsAsBatchModal } from '@/components/modals/DownloadVaultsAsBatchModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/useMobile';
import { statusLabels } from '@/lib/constants';
import { GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE, GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY } from '@/packages/gql/api/vaultsAPI';
import { DownloadStates, ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import { Ban, CheckLine, Download, ExternalLink, Funnel, ListTodo, LoaderIcon, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const statusButtons = [
  {
    className: 'text-xs font-medium bg-blue-500 text-white',
    label: 'fulfilled',
    status: DownloadStates.Fulfilled,
    icon: <CheckLine />
  },
  {
    className: 'text-xs font-medium animate-pulse',
    label: 'pending',
    status: DownloadStates.Pending,
    icon: <ListTodo />
  },
  {
    className: 'text-xs font-medium bg-orange-500 text-white dark:bg-emerald-400',
    label: 'processing',
    status: DownloadStates.Processing,
    icon: <LoaderIcon />
  },
  {
    className: 'text-xs font-medium bg-red-500 text-white dark:bg-red-600',
    label: 'rejected',
    status: DownloadStates.Rejected,
    icon: <Ban />
  }
];

interface Props {
  filteredVaults: ExtendedUsersEntity[];
  count: number;
  selectedCreatorIds: string[];
  setSelectedCreatorIds: React.Dispatch<React.SetStateAction<string[]>>;
  onRefetch: () => unknown;
  onSelectN: (n: number) => void;
  onFilter: (text: string) => void;
  filterBy: DownloadStates;
  onFilterBy: (stats: DownloadStates) => unknown;
}

export const VaultsHeader: React.FC<Props> = ({
  count,
  onRefetch,
  onSelectN,
  selectedCreatorIds,
  setSelectedCreatorIds,
  onFilter,
  filterBy,
  onFilterBy
}) => {
  const [numToSelect, setNumToSelect] = useState<number>(30);
  const [filterText, setFilterText] = useState('');
  const [getCountOfObjects] = useLazyQuery(GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY);
  const [downloadVaultsAsBatchModal, setDownloadAVaultsAsBatchModal] = useState<boolean>(false);
  const { data: getAllObjectsCount, updateQuery: updateAllObjectsCount } = useQuery(GET_ALL_OBJECTS_COUNT_OF_EACH_TYPE);
  const isMobile = useIsMobile();

  const handleGetCountOfObjects = async (status: DownloadStates) => {
    try {
      toast.loading('Fetching latest count...');
      const { data } = await getCountOfObjects({ variables: { input: { status } } });
      toast.dismiss();
      toast.success(data?.getTotalObjectsAsType, { description: statusLabels[status] });
      return data?.getTotalObjectsAsType;
    } catch {
      toast.dismiss();
      toast.error('Something wrong happened!');
    }
  };

  useEffect(() => {
    onFilter(filterText);
  }, [filterText]); // eslint-disable-line

  return (
    <div className="flex flex-col space-y-2 sticky top-15 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-2 rounded-md">
      <div className="flex items-center justify-between space-x-2">
        <Button>{count}</Button>

        <div className="flex space-x-2 items-center">
          <Input type="number" min={1} value={numToSelect} onChange={(e) => setNumToSelect(Number(e.target.value))} className="w-20" />
          <Button onClick={() => onSelectN(numToSelect)}>Select {numToSelect}</Button>
        </div>

        <Input
          name="idOrName"
          placeholder="Filter by ID or name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-48"
        />

        <Button variant="outline" className="ml-auto" onClick={onRefetch}>
          <RefreshCcw />
        </Button>
        <div className="flex flex-row space-x-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Funnel />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filterBy} onValueChange={(val) => onFilterBy(val as DownloadStates)}>
                <DropdownMenuRadioItem value={DownloadStates.Fulfilled}>Fulfilled</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={DownloadStates.Pending}>Pending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={DownloadStates.Processing}>Processing</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={DownloadStates.Rejected}>Rejected</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-row space-x-2">
          {statusButtons.map(({ className, icon, status, label }, idx) => (
            <Button key={idx} size={'lg'} className={className} onClick={() => handleGetCountOfObjects(status)}>
              {isMobile ? (
                icon
              ) : (
                <div className="flex flex-row gap-3">
                  {getAllObjectsCount?.getCountOfObjectsOfEachType[label as keyof typeof getAllObjectsCount.getCountOfObjectsOfEachType]}
                  <Link className="cursor-pointer" href={`?status=${label}`} onClick={(e) => e.preventDefault()}>
                    <ExternalLink />
                  </Link>
                </div>
              )}
            </Button>
          ))}
          <LoadingButton
            variant="outline"
            size="sm"
            onClick={() => setDownloadAVaultsAsBatchModal(true)}
            disabled={!selectedCreatorIds.length}
            title={String(selectedCreatorIds.length)}
            Icon={Download}
          />
          <LoadingButton
            variant="outline"
            size="sm"
            onClick={() => {
              setDownloadAVaultsAsBatchModal(false);
              setSelectedCreatorIds([]);
            }}
            disabled={!selectedCreatorIds.length}
            title={'Cancel'}
          />
        </div>
      </div>
      <DownloadVaultsAsBatchModal
        creatorIds={selectedCreatorIds}
        isOpen={downloadVaultsAsBatchModal}
        onCancel={() => setSelectedCreatorIds([])}
        onJobAdded={() => null}
        setOpen={setDownloadAVaultsAsBatchModal}
      />
    </div>
  );
};
