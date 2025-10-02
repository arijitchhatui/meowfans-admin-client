'use client';

import { CreatorContext } from '@/hooks/context/CreatorContextWrapper';
import { UPDATE_ALL_CREATOR_PROFILES_MUTATION } from '@/packages/gql/api/userAPI';
import { useMutation } from '@apollo/client/react';
import { useContext } from 'react';
import { toast } from 'sonner';
import { LoadingButton } from '../LoadingButton';
import { Button } from '../ui/button';
import { Modal } from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
}

export const UpdateAllCreatorProfilesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [updateAllCreatorProfiles, { loading }] = useMutation(UPDATE_ALL_CREATOR_PROFILES_MUTATION);
  const [admin] = useContext(CreatorContext);

  const handleClose = () => {
    onClose();
  };

  const handleUpdateAllCreatorProfiles = async () => {
    try {
      const { data } = await updateAllCreatorProfiles({ variables: { input: { adminId: admin.getCreatorProfile.creatorId } } });
      toast.success(data?.updateAllCreatorProfiles);
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      handleClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} description="Be aware of this as this is irreversible!" title="Update all creator profiles">
      <div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton size="lg" title="Update" loading={loading} onClick={handleUpdateAllCreatorProfiles} />
      </div>
    </Modal>
  );
};
