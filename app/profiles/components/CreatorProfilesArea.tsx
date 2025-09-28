import { SAvatar } from '@/components/Avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { BadgeCheckIcon, Heart } from 'lucide-react';
import Image from 'next/image';

interface Props {
  creator: ExtendedUsersEntity;
}

export const CreatorProfilesArea: React.FC<Props> = ({ creator }) => {
  return (
    <div className="w-full flex justify-end relative">
      <Card className="w-full max-w-sm mt-1 overflow-hidden">
        <CardHeader>
          <CardTitle>{creator?.username}</CardTitle>
          <CardAction>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <BadgeCheckIcon className="w-4 h-4" />
              {creator?.roles}
            </Badge>
          </CardAction>
        </CardHeader>

        <Image
          src={creator?.bannerUrl || './assets/1/jpg'}
          alt={creator?.username || ''}
          width={'100'}
          height={300}
          className="relative w-full md:h-40 h-20 bg-center bg-cover rounded-md"
        />

        <CardContent className="relative flex justify-between md:justify-center">
          <SAvatar
            fallback="profile"
            url={creator?.avatarUrl}
            className="md:w-40 md:h-40 w-20 h-20 rounded-full border-4shadow-md -mt-16"
          />
          <div className="flex flex-row justify-end md:hidden gap-1">
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <BadgeCheckIcon className="w-3 h-3" />
              {creator?.assetCount}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {creator?.vaultCount}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 p-0 justify-center">
          <div className="flex flex-row gap-3 justify-around w-full">
            <Button variant={'outline'}>Edit profile</Button>
            <Button variant={'outline'}>Follow</Button>
          </div>
          <div className="flex flex-row gap-3 justify-between w-full">
            <Button variant="outline">Subscribe</Button>
            <Button variant="outline">Message</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
