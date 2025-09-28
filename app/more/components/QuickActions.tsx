import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import DeleteAllAssets from './DeleteAssets';

interface Props {
  setDeleteAllAssetsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuickActions: React.FC<Props> = ({ setDeleteAllAssetsModal }) => {
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
        <Button variant="destructive" className="w-full justify-start">
          Reset to defaults
        </Button>
        <DeleteAllAssets setDeleteAllAssetsModal={setDeleteAllAssetsModal} />
      </CardContent>
    </Card>
  );
};
