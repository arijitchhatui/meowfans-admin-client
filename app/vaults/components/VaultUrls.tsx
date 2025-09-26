import { ApplyButtonTooltip } from '@/components/ApplyTooltip';
import { SAvatar } from '@/components/Avatar';
import { LoadingButton } from '@/components/LoadingButton';
import { DownloadCreatorsAllVaultsModal } from '@/components/modals/DownloadCreatorsAllVaultsModal';
import { Badge } from '@/components/ui/badge';
import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useVaultsStore } from '@/zustand/vaults.store';
import { Download, Goal } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  idx: number;
  creator: ExtendedUsersEntity;
}

export const VaultUrls: React.FC<Props> = ({ idx, creator }) => {
  const { setCreator } = useVaultsStore();
  const [downloadAllCreatorVaultsModal, setDownloadAllCreatorVaultsModal] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Div className="w-full flex flex-col gap-1.5">
      <Div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-1.5">
          <Badge variant="secondary">{idx + 1}</Badge>
          <Badge className="text-xs font-medium">{creator.username}</Badge>
        </div>
        <div className="flex flex-row gap-5">
          <SAvatar url={creator.avatarUrl} fallback="cr" />
          <ApplyButtonTooltip
            buttonProps={{ icon: Goal, variant: 'outline' }}
            onClick={() => {
              setCreator(creator);
              router.push(`/vaults/${creator.username}`);
            }}
            tootTipTitle="Visit"
          />
        </div>
      </Div>
      <Div className="flex flex-row justify-between w-full content-center items-center">
        <div className="flex flex-row">
          <p className="text-xs">{moment(creator.createdAt).format('LT L')}</p>
        </div>
        <div className="flex flex-row space-x-1.5">
          <LoadingButton
            Icon={Download}
            title={`Download all(${creator.vaultCount})`}
            variant={'outline'}
            disabled={!creator.vaultCount}
            onClick={() => setDownloadAllCreatorVaultsModal(true)}
          />
        </div>
      </Div>
      <DownloadCreatorsAllVaultsModal
        creator={creator}
        onCancel={() => setDownloadAllCreatorVaultsModal(false)}
        isOpen={downloadAllCreatorVaultsModal}
        setOpen={setDownloadAllCreatorVaultsModal}
        onJobAdded={() => null}
      />
    </Div>
  );
};
