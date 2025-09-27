import { SAvatar } from '@/components/Avatar';
import { LoadingButton } from '@/components/LoadingButton';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DownloadStates, VaultObjectsEntity } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useVaultsStore } from '@/zustand/vaults.store';
import { Download } from 'lucide-react';
import moment from 'moment';

interface Props {
  idx: number;
  vaultObject: VaultObjectsEntity;
  selectedUrls: string[];
  onToggle: (url: string) => unknown;
  isLoading: boolean;
}

export const CreatorVaultUrls: React.FC<Props> = ({ idx, vaultObject, selectedUrls, onToggle, isLoading }) => {
  return (
    <div className='h-full'>
      <Div className="flex flex-row justify-between">
        <Div className="flex flex-row space-x-1.5">
          <SAvatar url={vaultObject.vault.creatorProfile.user.avatarUrl} />
          <Badge variant="secondary">{idx + 1}</Badge>
        </Div>
        <Div className="items-center content-center  flex flex-row space-x-1">
          {(() => {
            switch (vaultObject.status) {
              case DownloadStates.Pending:
                return (
                  <Badge variant="secondary" className="animate-pulse">
                    Pending
                  </Badge>
                );

              case DownloadStates.Fulfilled:
                return (
                  <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
                    Fulfilled
                  </Badge>
                );

              case DownloadStates.Processing:
                return (
                  <Badge variant="secondary" className="bg-orange-500 text-white dark:bg-emerald-400">
                    Processing
                  </Badge>
                );

              case DownloadStates.Rejected:
                return <Badge variant="destructive">Failed</Badge>;
            }
          })()}

          {vaultObject.status !== DownloadStates.Processing && vaultObject.status !== DownloadStates.Fulfilled && (
            <Checkbox
              className="h-5 w-5"
              checked={selectedUrls.includes(vaultObject.id)}
              onCheckedChange={() => onToggle(vaultObject.id)}
              disabled={selectedUrls.length >= 30}
            />
          )}
        </Div>
      </Div>
      <Div className="max-w-sm p-2 text-xs">
        {
          <a className="break-all cursor-pointer hover:underline" href={vaultObject.objectUrl} target="_blank">
            {vaultObject.objectUrl.slice(-46)}
          </a>
        }
      </Div>
      <Div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-1.5">
          <p className="text-xs">{moment(vaultObject.createdAt).format('LT L')}</p>
        </div>
        {vaultObject.status === DownloadStates.Processing && (
          <LoadingButton size="icon" variant={'outline'} className="cursor-pointer animate-bounce" Icon={Download} loading />
        )}
      </Div>
    </div>
  );
};
