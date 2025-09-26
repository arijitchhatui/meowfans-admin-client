'use client';

import { UPLOAD_TO_VAULT_MUTATION } from '@/packages/gql/api/vaultsAPI';
import { AssetType } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingButton } from '../LoadingButton';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Modal } from './Modal';

interface Props {
  onJobAdded: () => unknown;
  onCancel: () => unknown;
  vaultObjectIds: string[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadVaultsModal: React.FC<Props> = ({ isOpen, setOpen, vaultObjectIds, onCancel, onJobAdded }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState<AssetType>(AssetType.Private);
  const [uploadVaults] = useMutation(UPLOAD_TO_VAULT_MUTATION);

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  const handleUploadToVault = async () => {
    if (!vaultObjectIds.length) return;
    setLoading(true);
    try {
      await uploadVaults({
        variables: {
          input: {
            vaultObjectIds,
            destination
          }
        }
      });
      onJobAdded();
      toast.success('Added to queue');
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      title={`Upload ${vaultObjectIds.length} objects to queue for processing`}
      description={'Jobs are to be added, come back after a while'}
    >
      <div className="flex justify-center">
        <div className="gap-2 w-fit justify-self-start items-start flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{destination}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Media</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={destination} onValueChange={(val) => setDestination(val as AssetType)}>
                <DropdownMenuRadioItem value={AssetType.Private}>Private</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={AssetType.Archive}>Archive</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={AssetType.Hidden}>Hidden</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton onClick={handleUploadToVault} size="lg" title="Upload" loading={loading} />
      </Div>
    </Modal>
  );
};
