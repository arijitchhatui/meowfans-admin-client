import { Button } from '@/components/ui/button';
import { Div } from '@/wrappers/HTMLWrappers';

export const Footer = () => {
  return (
    <Div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Div className="text-sm text-muted-foreground">Changes are saved locally. Use the buttons to export or reset your settings.</Div>
      <Div className="flex gap-2">
        <Button variant="outline">Export</Button>
        <Button>Save all</Button>
      </Div>
    </Div>
  );
};
