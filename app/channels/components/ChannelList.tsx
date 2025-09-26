import { SAvatar } from '@/components/Avatar';
import { Badge } from '@/components/ui/badge';
import { Div, Typography } from '@/wrappers/HTMLWrappers';
import { ChevronDown } from 'lucide-react';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { Channel } from './Channels';

enum ChannelBadgeVariant {
  General = 'default',
  Design = 'outline',
  Support = 'secondary',
  Random = 'destructive'
}

type ChannelType = 'General' | 'Design' | 'Support' | 'Random';
interface Props {
  channels: Channel[];
}

export const ChannelList: React.FC<Props> = ({ channels }) => {
  const { id } = useParams();
  const router = useRouter();
  return (
    <Div className="flex flex-col shadow-accent-foreground space-y-1">
      {channels.map((c, idx) => {
        const channelVariant = ChannelBadgeVariant[c.name as ChannelType];
        const formattedCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(c.members);
        return (
          <Div
            key={idx}
            className="flex flex-row justify-between border min-h-10 p-1 m-1 rounded-2xl"
            onClick={() => router.push(`/channels/${id}`)}
          >
            <Div className="flex flex-row space-x-2 items-center">
              <SAvatar url="" />
              <Div className="flex flex-col space-x-3">
                <Div className="flex flex-row space-x-1">
                  <Typography className="font-bold">{c.lastMessage?.sender}</Typography>
                  <Badge variant={channelVariant}>{c.name}</Badge>
                </Div>
                <Typography className="text-xs font-semibold">{c.lastMessage?.text}</Typography>
              </Div>
            </Div>
            <Div className="flex flex-row items-center space-x-3">
              <Typography>{formattedCurrency}</Typography>
              <Typography className="text-xs">{moment(c.lastMessage?.timestamp).format('hh:mm')}</Typography>
              <ChevronDown />
            </Div>
          </Div>
        );
      })}
    </Div>
  );
};
