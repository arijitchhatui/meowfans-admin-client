'use client';

import { DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION } from '@/packages/gql/api/adminAPI';
import { AssetType, ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { toast } from 'sonner';
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
  creators: ExtendedUsersEntity[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DownloadVaultsAsBatchModal: React.FC<Props> = ({ isOpen, setOpen, creators, onCancel, onJobAdded }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState<AssetType>(AssetType.Private);
  const [uploadVaults] = useMutation(DOWNLOAD_ALL_CREATOR_OBJECTS_MUTATION);

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  const handleUploadToVault = async () => {
    setLoading(true);
    try {
      const creatorIds = creators.map((creator) => creator.id);
      await uploadVaults({ variables: { input: { creatorIds } } });
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
      title={`Upload started for ${creators.length} creators`}
      description={`Total ${creators.reduce((acc, curr) => acc + curr.pendingObjectCount, 0)} objects`}
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
