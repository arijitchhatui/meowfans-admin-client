import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Div } from '@/wrappers/HTMLWrappers';
import { useRouter } from 'next/navigation';
import DeleteAllAssets from './DeleteAssets';

interface Props {
  setDeleteAllAssetsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuickActions: React.FC<Props> = ({ setDeleteAllAssetsModal }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Div>
          <Button onClick={() => router.push('/vaults')}>Connect to a service</Button>
        </Div>
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
