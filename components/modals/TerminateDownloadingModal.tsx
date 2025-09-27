'use client';

import { TERMINATE_ALL_DOWNLOADING_MUTATION } from '@/packages/gql/api/adminAPI';
import { GET_CREATOR_PROFILE_QUERY } from '@/packages/gql/api/creatorAPI';
import { UserRoles } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useVaultsStore } from '@/zustand/vaults.store';
import { useMutation, useQuery } from '@apollo/client/react';
import { BotOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoadingButton } from '../LoadingButton';
import { Button } from '../ui/button';
import { Modal } from './Modal';

export const TerminateDownloadingModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { terminateDownloadModal, setTerminateDownloadModal } = useVaultsStore();

  const [terminateAllJobs] = useMutation(TERMINATE_ALL_DOWNLOADING_MUTATION);
  const { data: creator } = useQuery(GET_CREATOR_PROFILE_QUERY);

  const handleTerminate = async () => {
    setLoading(true);
    try {
      if (!creator?.getCreatorProfile.user.roles.includes(UserRoles.Admin)) return;
      await terminateAllJobs();
      toast.success('All jobs terminated!');
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      setTerminateDownloadModal(false);
    }
  };

  return (
    <Modal
      isOpen={terminateDownloadModal}
      onClose={() => setTerminateDownloadModal(false)}
      description="Are you sure you want to stop downloading?"
      title="Force stop all downloading queue"
    >
      <Div className="w-full flex flex-row justify-between">
        <Button variant={'secondary'} onClick={() => setTerminateDownloadModal(false)}>
          Cancel
        </Button>
        <LoadingButton Icon={BotOff} loading={loading} destructive title="Force stop" onClick={handleTerminate} />
      </Div>
    </Modal>
  );
};
