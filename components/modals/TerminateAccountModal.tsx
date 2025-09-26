'use client';

import { DELETE_USER_MUTATION } from '@/packages/gql/api/userAPI';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Div } from '@/wrappers/HTMLWrappers';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingButton } from '../LoadingButton';
import { Button } from '../ui/button';
import { Modal } from './Modal';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TerminateAccountModal: React.FC<Props> = ({ isOpen, setOpen }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const authUrl = buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL });
  const handleClose = () => {
    setOpen(false);
  };

  const handleTerminate = async () => {
    setLoading(true);
    try {
      await deleteUser();
      toast.success('Deleted your account!');
      router.push(authUrl);
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
      title="Terminate your account"
      description={'Are you sure you want to terminate your account?'}
    >
      <Div className="flex flex-row justify-between">
        <Button onClick={handleClose} variant={'default'} size={'lg'}>
          Cancel
        </Button>
        <LoadingButton onClick={handleTerminate} destructive size="lg" title="Terminate" />
      </Div>
    </Modal>
  );
};
