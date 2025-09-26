import { CreatorProfilesEntity } from '@/packages/gql/generated/graphql';
import { DeepPartial } from '@apollo/client/utilities';
import { createContext, useState } from 'react';

const emptyCreator = {
  allowsComment: false,
  allowsMessaging: false,
  bio: '',
  creatorId: '',
  displayOnlineStatus: false,
  displayTotalPost: false,
  displayTotalSubscriber: false,
  themeColor: '#000',
  totalExclusivePost: 0,
  totalPost: 0,
  totalPublicPost: 0,
  totalSubscriber: 0,
  user: {
    avatarUrl: '',
    bannerUrl: '',
    createdAt: new Date(),
    deletedAt: new Date(),
    firstName: '',
    id: '',
    lastLoginAt: new Date(),
    lastName: '',
    roles: [],
    updatedAt: new Date(),
    username: ''
  }
} as DeepPartial<CreatorProfilesEntity>;

export const CreatorContext = createContext<
  [DeepPartial<CreatorProfilesEntity>, React.Dispatch<React.SetStateAction<DeepPartial<CreatorProfilesEntity>>>]
>([emptyCreator, () => null]);

interface Props {
  children: React.ReactNode;
  creator: DeepPartial<CreatorProfilesEntity>;
}

export function CreatorContextWrapper({ children, creator }: Props) {
  const [creatorInfo, setCreatorInfo] = useState<DeepPartial<CreatorProfilesEntity>>(creator);
  return <CreatorContext.Provider value={[creatorInfo, setCreatorInfo]}>{children}</CreatorContext.Provider>;
}
