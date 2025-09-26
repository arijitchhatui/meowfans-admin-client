'use client';

import { Calendar1 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { Div } from '@/wrappers/HTMLWrappers';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface Props {
  isOpen: boolean | number;
  titleName?: string | null;
  dateRange?: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export const GetCalender: React.FC<Props> = ({ isOpen, titleName, dateRange, setDateRange }) => {
  const [open, setOpen] = useState<boolean | number>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  return (
    <Div className="flex gap-4">
      <Popover open={!!open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date-picker" className="w-32 justify-between font-normal">
            {dateRange && open ? moment(dateRange.from).format('L') : titleName ?? 'Select date'}
            <Calendar1 />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </Div>
  );
};
