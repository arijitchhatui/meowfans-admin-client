import { ApplyTheme } from '@/components/ApplyTheme';
import { ApplyBackgroundModal } from '@/components/modals/ApplyBackgroundModal';
import { TriggerModal } from '@/components/modals/TriggerModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Div, H3, Typography } from '@/wrappers/HTMLWrappers';
import { useShadCnBackgroundStore } from '@/zustand/background.store';
import { Wallpaper } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export const Display = () => {
  const [backgroundModalOpen, setBackgroundModalOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const { shadCnBackground } = useShadCnBackgroundStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Display & Theme</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <Div className="flex flex-col gap-2">
          <Div className="flex items-center justify-between">
            <Div>
              <H3 className="text-sm font-medium">Theme</H3>
              <Typography className="text-xs text-muted-foreground">{theme ?? 'system'}</Typography>
            </Div>
          </Div>

          <Div className="flex items-center justify-between">
            <Div>
              <H3 className="text-sm font-medium">Background</H3>
              <Typography className="text-xs text-muted-foreground">{shadCnBackground ?? 'default'}</Typography>
            </Div>
            <Div className="flex items-center gap-2">
              <Div className="flex items-center space-x-2">
                <TriggerModal onChangeModalState={setBackgroundModalOpen} modalIcon={{ icon: Wallpaper }} />
              </Div>
            </Div>
          </Div>
        </Div>

        <ApplyBackgroundModal open={backgroundModalOpen} setOpen={setBackgroundModalOpen} />

        <Div className="md:col-span-2">
          <Label>Preview</Label>
          <Div className="mt-2 p-4 rounded-lg border dark:border-slate-700 bg-gradient-to-br from-white/60 dark:from-slate-800/60">
            <Div className="flex items-center justify-between">
              <Div>
                <H3 className="font-semibold">Preview your theme</H3>
                <Typography className="text-xs text-muted-foreground">Small live preview of chosen appearance.</Typography>
              </Div>
              <Div className="inline-flex items-center gap-3">
                <Div className="text-sm">
                  <ApplyTheme />
                </Div>
                <Div className="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-400 to-pink-400" />
              </Div>
            </Div>
          </Div>
        </Div>
      </CardContent>
    </Card>
  );
};
