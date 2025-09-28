import { TriggerModal } from '@/components/modals/TriggerModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash } from 'lucide-react';

interface Props {
  setDeleteAllAssetsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAllAssets: React.FC<Props> = ({ setDeleteAllAssetsModal }) => {
  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle className="text-red-500">Delete all assets</CardTitle>
        <CardDescription>Be aware of this as this is irreversible!</CardDescription>
      </CardHeader>
      <CardContent className="">
        <TriggerModal
          onChangeModalState={() => setDeleteAllAssetsModal(true)}
          className="bg-red-600"
          modalIcon={{ icon: Trash }}
          modalText="Delete your assets"
        />
      </CardContent>
    </Card>
  );
};

export default DeleteAllAssets;
