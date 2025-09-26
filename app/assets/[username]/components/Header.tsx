import { GetCalender } from '@/components/GetCalender';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AssetType } from '@/packages/gql/generated/graphql';
import { Div, H1, Typography } from '@/wrappers/HTMLWrappers';
import { motion } from 'framer-motion';
import { DoorClosed, GalleryVerticalEnd, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const emptyDateRange: DateRange = {
  from: undefined,
  to: undefined
};

interface Props {
  onRefresh: () => unknown;
  assetType: AssetType;
  onSlideShowOff: () => unknown;
  setAssetType: React.Dispatch<React.SetStateAction<AssetType>>;
}

export const AssetsHeader: React.FC<Props> = ({ onSlideShowOff, setAssetType, assetType, onRefresh }) => {
  const [fromDate] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(emptyDateRange);

  return (
    <Div className="flex flex-row items-center justify-between bg-[var(--background)]">
      <Div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <Div className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-white shadow-lg">
            <GalleryVerticalEnd size={20} />
          </Div>
          <Div>
            <H1 className="text-2xl md:text-3xl font-semibold">Assets</H1>
            <Typography className="text-sm text-muted-foreground">This is your personal Gallery</Typography>
          </Div>
        </motion.div>
      </Div>
      <Div className="flex flex-col space-y-1">
        <Div className="flex flex-row justify-between gap-2">
          <Div>
            <Button onClick={onRefresh}>
              <RefreshCcw />
            </Button>
          </Div>
          <Div>
            <Button onClick={onSlideShowOff}>
              <DoorClosed />
            </Button>
          </Div>
          <div className="grid gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{assetType}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Asset types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={assetType} onValueChange={(val) => setAssetType(val as AssetType)}>
                  <DropdownMenuRadioItem value={AssetType.Private}>Private</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={AssetType.Hidden}>Hidden</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={AssetType.Archive}>Archive</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Div>
        <GetCalender isOpen={fromDate} titleName={'From'} dateRange={dateRange} setDateRange={setDateRange} />
      </Div>
    </Div>
  );
};
