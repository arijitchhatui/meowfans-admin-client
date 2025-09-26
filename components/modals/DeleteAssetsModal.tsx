'use client';

import { DELETE_CREATOR_ASSETS_MUTATION, GET_CREATOR_ASSETS_QUERY } from '@/packages/gql/api/assetsAPI';
import { Div } from '@/wrappers/HTMLWrappers';
import { useAssetsStore } from '@/zustand/assets.store';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingButton } from '../LoadingButton';
import { Button } from '../ui/button';
import { Modal } from './Modal';

interface Props {
  onDelete: () => unknown;
}

export const DeleteAssetsModal: React.FC<Props> = ({ onDelete }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteCreatorAssets] = useMutation(DELETE_CREATOR_ASSETS_MUTATION, {
    refetchQueries() {
      return [{ query: GET_CREATOR_ASSETS_QUERY, variables: { input: { limit: 30 } } }];
    }
  });
  const { deleteModal, setDeleteModal, selectedAssets: assets, setSelectedAssets, setCanSelect } = useAssetsStore();

  const handleDeleteAssets = async () => {
    setLoading(true);
    try {
      await deleteCreatorAssets({
        variables: {
          input: { assetIds: assets }
        }
      });
      onDelete();
      toast.success('Deleted assets permanently');
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setDeleteModal(false);
    setSelectedAssets([]);
    setCanSelect(false);
  };

  return (
    <Modal
      isOpen={deleteModal}
      onClose={handleClose}
      title="Delete Panel"
      description={`Are you sure you want to delete ${assets.length} asset${assets.length > 1 ? 's' : ''}?`}
    >
      <Div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton destructive size="lg" title="Delete" loading={loading} onClick={handleDeleteAssets} />
      </Div>
    </Modal>
  );
};
