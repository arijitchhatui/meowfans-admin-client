'use client';

import { DELETE_ALL_ASSETS_MUTATION, GET_CREATOR_ASSETS_QUERY } from '@/packages/gql/api/assetsAPI';
import { Div } from '@/wrappers/HTMLWrappers';
import { useMutation } from '@apollo/client/react';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoadingButton } from '../LoadingButton';
import { Button } from '../ui/button';
import { Modal } from './Modal';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteAllAssetsModal: React.FC<Props> = ({ isOpen, setOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [deleteAllAssets] = useMutation(DELETE_ALL_ASSETS_MUTATION, {
    refetchQueries() {
      return [{ query: GET_CREATOR_ASSETS_QUERY, variables: { input: { limit: 30 } } }];
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleTerminate = async () => {
    setLoading(true);
    try {
      await deleteAllAssets();
      toast.success('Successfully deleted all assets!');
    } catch (error) {
      toast.error('Something error happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      title="Delete your assets"
      description={'Are you sure you want to delete all your assets?'}
    >
      <Div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton Icon={Loader} onClick={handleTerminate} size="lg" title="Terminate" loading={loading} destructive />
      </Div>
    </Modal>
  );
};
