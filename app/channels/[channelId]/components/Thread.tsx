import { Modal } from '@/components/modals/Modal';
import { TriggerModal } from '@/components/modals/TriggerModal';
import { Div } from '@/wrappers/HTMLWrappers';
import { ChevronDown } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { MessagesEntity } from './Message';

interface Props {
  message: MessagesEntity;
}

export const MessageThread: React.FC<Props> = ({ message }) => {
  const [messageOptionModal, setMessageOptionModal] = useState<boolean>(false);
  return (
    <Div className="border rounded-xl p-1 md:max-w-2xl max-w-2xs shadow-xl">
      <Div className="flex flex-col">
        <Div className="flex flex-row">
          <Div className="flex flex-row gap-1 items-center content-center">{message.content}</Div>
          <Div className="flex flex-row justify-end">{moment(message.timestamp).format('hh:mm')}</Div>
        </Div>
        <Div className="flex justify-end">
          <TriggerModal onChangeModalState={() => setMessageOptionModal(true)} modalIcon={{ icon: ChevronDown, size: 'sm' }} />
        </Div>
      </Div>
      <Modal
        isOpen={messageOptionModal}
        description="View message options"
        title="Options"
        onClose={() => setMessageOptionModal(false)}
      ></Modal>
    </Div>
  );
};
