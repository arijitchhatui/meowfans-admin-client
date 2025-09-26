import { ShadCnChartTypes } from '@/lib/constants';
import { Div } from '@/wrappers/HTMLWrappers';
import { Button } from '../ui/button';
import { Modal } from './Modal';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChartType: React.Dispatch<React.SetStateAction<ShadCnChartTypes>>;
}

const charts = [
  { label: 'Area chart', type: ShadCnChartTypes.AREA_CHART },
  { label: 'Bar chart', type: ShadCnChartTypes.BAR_CHART },
  { label: 'Line chart', type: ShadCnChartTypes.LINE_CHART },
  { label: 'Radar chart', type: ShadCnChartTypes.RADAR_CHART }
];

export const ApplyChartModal: React.FC<Props> = ({ setOpen, setChartType, open }) => {
  return (
    <Modal isOpen={open} title={'Apply your preferred charts'} description={'Get view of your analytics'} onClose={() => setOpen(false)}>
      <Div className="flex flex-col space-y-3">
        {charts.map((bg, idx) => (
          <Button
            key={idx}
            variant={'outline'}
            onClick={() => {
              setChartType(bg.type);
              setOpen(false);
            }}
          >
            {bg.label}
          </Button>
        ))}
      </Div>
    </Modal>
  );
};
