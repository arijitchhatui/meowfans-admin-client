'use client';

import { GET_CREATOR_PROFILE_QUERY } from '@/packages/gql/api/creatorAPI';
import { TERMINATE_ALL_JOBS_MUTATION } from '@/packages/gql/api/vaultsAPI';
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

export const TerminateImportingJobsModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { terminatingImportsModal, setTerminatingImportsModal } = useVaultsStore();

  const [terminateAllJobs] = useMutation(TERMINATE_ALL_JOBS_MUTATION);
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
      setTerminatingImportsModal(false);
    }
  };

  return (
    <Modal
      isOpen={terminatingImportsModal}
      onClose={() => setTerminatingImportsModal(false)}
      description="Are you sure you want to terminate all jobs?"
      title="Terminate all jobs"
    >
      <Div className="w-full flex flex-row justify-between">
        <Button variant={'secondary'} onClick={() => setTerminatingImportsModal(false)}>
          Cancel
        </Button>
        <LoadingButton Icon={BotOff} loading={loading} destructive title="Terminate" onClick={handleTerminate} />
      </Div>
    </Modal>
  );
};
