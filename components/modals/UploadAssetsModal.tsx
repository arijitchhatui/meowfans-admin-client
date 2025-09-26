'use client';

import useAPI from '@/hooks/api/useAPI';
import { MediaType } from '@/lib/constants';
import { AssetType } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useAssetsStore } from '@/zustand/assets.store';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { DropZone } from '../DropZone';
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
  onUpload: () => unknown;
}

export const UploadAssetsModal: React.FC<Props> = ({ onUpload }) => {
  const { upload } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const { openUploadModal, setOpenUploadModal } = useAssetsStore();
  const [files, setFiles] = useState<File[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.PROFILE_MEDIA);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (!files.length) return;

      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          await upload({ mediaType: MediaType.PROFILE_MEDIA, assetType: AssetType.Private, formData: formData });
        })
      );

      onUpload();
      toast.success('Uploaded');
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleFilterFiles = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  const handleClose = () => {
    setOpenUploadModal(false);
    setFiles([]);
  };

  return (
    <Modal isOpen={openUploadModal} onClose={handleClose} description="Upload your assets or click to remove" title="Upload">
      <div className="grid grid-cols-2">
        <div className="gap-2 w-fit justify-self-start items-start flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {mediaType
                  .replace(/([A-Z])/g, ' $1')
                  .trim()
                  .toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Media</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={mediaType} onValueChange={(val) => setMediaType(val as MediaType)}>
                <DropdownMenuRadioItem value={MediaType.PROFILE_MEDIA}>Profile media</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={MediaType.POST_MEDIA}>Post media</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={MediaType.MESSAGE_MEDIA}>Message media</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="gap-2 w-fit justify-self-end items-end flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{assetType}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={assetType} onValueChange={(val) => setAssetType(val as AssetType)}>
                <DropdownMenuRadioItem value={AssetType.Private}>Private</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={AssetType.Hidden}>Hidden</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={AssetType.Archive}>Archive</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {files.length ? (
        <Div className="flex w-full flex-col gap-3">
          <Div className="grid grid-cols-3 gap-2 overflow-y-scroll max-h-80">
            {files.map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <Div key={idx} className="relative group cursor-pointer">
                  <Image
                    src={url}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-lg shadow-md group-hover:opacity-80 transition"
                    height={128}
                    width={50}
                    style={{ minHeight: 128, minWidth: '100%' }}
                    onClick={() => handleFilterFiles(file)}
                  />
                </Div>
              );
            })}
          </Div>

          <LoadingButton loading={loading} onClick={handleUpload} title="Upload" />
        </Div>
      ) : (
        <DropZone onUpload={(files) => setFiles(files)} />
      )}
    </Modal>
  );
};
