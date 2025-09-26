import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { create } from 'zustand';

type VaultsStore = {
  terminateDownloadModal: boolean;
  setTerminateDownloadModal: (terminateDownloadModal: boolean) => void;
  creator: ExtendedUsersEntity;
  setCreator: (creator: ExtendedUsersEntity) => void;
  terminatingImportsModal: boolean;
  setTerminatingImportsModal: (open: boolean) => void;
  openImportSheet: boolean;
  setOpenImportSheet: (opn: boolean) => void;
};

export const useVaultsStore = create<VaultsStore>()((set) => ({
  terminateDownloadModal: false,
  setTerminateDownloadModal: (terminateDownloadModal: boolean) => set(() => ({ terminateDownloadModal })),
  creator: {} as ExtendedUsersEntity,
  setCreator: (creator: ExtendedUsersEntity) => set(() => ({ creator })),
  terminatingImportsModal: false,
  setTerminatingImportsModal: (terminatingImportsModal: boolean) => set(() => ({ terminatingImportsModal })),
  openImportSheet: false,
  setOpenImportSheet: () => set((state) => ({ openImportSheet: !state.openImportSheet }))
}));
