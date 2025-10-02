import { UpdateAllCreatorProfilesModal } from '@/components/modals/UpdateAllCreatorProfilesModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import DeleteAllAssets from './DeleteAssets';

interface Props {
  setDeleteAllAssetsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuickActions: React.FC<Props> = ({ setDeleteAllAssetsModal }) => {
  const [openUpdateAllCreatorsModal, setOpenUpdateAllCreatorsModal] = useState<boolean>(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Link href={'/vaults'}>
          <Button>Connect to a service</Button>
        </Link>
        <Button variant="outline" className="w-full justify-start">
          Export settings
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => setOpenUpdateAllCreatorsModal(true)}>
          Update all creator profiles
        </Button>
        <Button variant="destructive" className="w-full justify-start">
          Reset to defaults
        </Button>
        <DeleteAllAssets setDeleteAllAssetsModal={setDeleteAllAssetsModal} />
        <UpdateAllCreatorProfilesModal isOpen={openUpdateAllCreatorsModal} onClose={() => setOpenUpdateAllCreatorsModal(false)} />
      </CardContent>
    </Card>
  );
};
