import { GetCreatorProfileQuery } from '@/packages/gql/generated/graphql';
import { create } from 'zustand';

type UserStore = {
  user: GetCreatorProfileQuery;
  setUser: (user: GetCreatorProfileQuery) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: {} as GetCreatorProfileQuery,
  setUser: (user: GetCreatorProfileQuery) => set(() => ({ user }))
}));
