import { Div } from '@/wrappers/HTMLWrappers';
import { MessagesEntity } from './Message';
import { MessageThread } from './Thread';

interface Props {
  messages: MessagesEntity[];
}

export const MessageContainer: React.FC<Props> = ({ messages }) => {
  return (
    <Div className="w-full space-y-1 flex flex-col pb-17">
      {messages.map((message) => (
        <Div key={message.id} className={`flex w-full ${message.id % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <MessageThread message={message} />
        </Div>
      ))}
    </Div>
  );
};
