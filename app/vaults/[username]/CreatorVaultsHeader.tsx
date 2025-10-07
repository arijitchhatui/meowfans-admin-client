import { LoadingButton } from '@/components/LoadingButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DownloadStates, GetCreatorVaultObjectsByAdminQuery, GetUserQuery } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Funnel, LucideLassoSelect, MoreHorizontal, RefreshCcw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu';

interface Props {
  dataLength: number;
  onSetStatus: (val: DownloadStates) => unknown;
  creatorData: GetUserQuery;
  hasSelectedThirty: boolean;
  onSelectThirty: (hasSelected: boolean, count: number) => unknown;
  onRefetch: () => unknown;
  isLoading: boolean;
  selectedUrls: string[];
  onUploadVaultModal: (open: boolean) => unknown;
  data: GetCreatorVaultObjectsByAdminQuery;
  status: DownloadStates;
}

export const CreatorVaultsHeader: React.FC<Props> = ({
  creatorData,
  dataLength,
  hasSelectedThirty,
  onSelectThirty,
  onSetStatus,
  isLoading,
  onRefetch,
  onUploadVaultModal,
  selectedUrls,
  data,
  status
}) => {
  return (
    <Div className="flex items-center justify-between content-center space-x-1 sticky top-15 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-2 rounded-md">
      <Div className="flex flex-col space-y-2 items-center">
        <div className="flex flex-row space-x-2 items-center">
          <Button size="sm">{dataLength}</Button>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Funnel />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={status} onValueChange={(val) => onSetStatus(val as DownloadStates)}>
                  <DropdownMenuRadioItem value={DownloadStates.Fulfilled}>Fulfilled</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={DownloadStates.Pending}>Pending</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={DownloadStates.Processing}>Processing</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={DownloadStates.Rejected}>Rejected</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Badge className="text-xs">{creatorData?.getUser.username}</Badge>
        </div>
        <div className="flex flex-row space-x-1">
          <Button size="sm" className=''>{creatorData.getUser.pendingCount}</Button>
          <Button size="sm" className='bg-orange-500'>{creatorData.getUser.processingCount}</Button>
          <Button size="sm" className='bg-red-500'>{creatorData.getUser.rejectedCount}</Button>
          <Button size="sm" className='bg-blue-500'>{creatorData.getUser.fulfilledCount}</Button>
        </div>
      </Div>

      <Div className="flex flex-row space-x-2 items-center">
        <AnimatePresence>
          {hasSelectedThirty ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <Button variant="destructive" size="sm" onClick={() => onSelectThirty(false, 0)}>
                Cancel
              </Button>
            </motion.div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <LucideLassoSelect />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={'30'} onValueChange={(val) => onSelectThirty(true, Number(val))}>
                  <DropdownMenuRadioItem value={'5'}>5</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'10'}>10</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'30'}>30</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'100'}>100</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'200'}>200</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'300'}>300</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'500'}>500</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={'1000'}>1000</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={String(data?.getCreatorVaultObjectsByAdmin.vaultObjects.length)}>All</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </AnimatePresence>

        <LoadingButton
          variant="outline"
          size="sm"
          onClick={() => onUploadVaultModal(true)}
          disabled={!selectedUrls.length}
          title={String(selectedUrls.length)}
          Icon={Download}
          loading={isLoading}
        />
        <Button variant="outline" size="sm" onClick={onRefetch} className="hidden sm:flex">
          <RefreshCcw />
        </Button>

        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioItem value="refetch" onClick={onRefetch}>
                Refresh
              </DropdownMenuRadioItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Div>
    </Div>
  );
};
