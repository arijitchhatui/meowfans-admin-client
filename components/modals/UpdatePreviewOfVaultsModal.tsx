'use client';

import { UPDATE_PREVIEW_OF_VAULTS_QUERY } from '@/packages/gql/api/vaultsAPI';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { LoadingButton } from '../LoadingButton';
import { Button } from '../ui/button';
import { Modal } from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
}

export const UpdatePreviewOfVaultsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [updateAllCreatorProfiles, { loading }] = useMutation(UPDATE_PREVIEW_OF_VAULTS_QUERY);

  const handleClose = () => {
    onClose();
  };

  const handleUpdateAllVaultPreviews = async () => {
    try {
      const { data } = await updateAllCreatorProfiles();
      toast.success(data?.updatePreviewOfVaults);
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      handleClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} description="Be aware of this as this is irreversible!" title="Update all creator vault previews">
      <div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton size="lg" title="Update" loading={loading} onClick={handleUpdateAllVaultPreviews} />
      </div>
    </Modal>
  );
};
