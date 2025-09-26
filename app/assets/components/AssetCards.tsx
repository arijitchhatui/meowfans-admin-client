import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  creator: ExtendedUsersEntity;
}

export const AssetCards: React.FC<Props> = ({ creator }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/assets/${creator.username}`)}>
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          width={'100'}
          height={300}
          src={creator.bannerUrl || './assets/1.jpg'}
          alt={`${creator.username} banner`}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col items-center -mt-10 z-10 relative">
        <Image
          src={creator.avatarUrl || './assets/1.jpg'}
          alt={creator.username}
          width={'100'}
          height={300}
          className="h-20 w-20 rounded-full border-4 border-background shadow-md group-hover:scale-110 transition-transform duration-500"
        />
        <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">{creator.username}</p>
        <p className="text-sm text-muted-foreground">{creator.assetCount} Assets</p>
      </div>
    </div>
  );
};
