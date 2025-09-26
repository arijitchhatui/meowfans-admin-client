import { buttonSize, buttonVariant } from '@/util/helpers';
import { Div } from '@/wrappers/HTMLWrappers';
import { Component, LucideIcon } from 'lucide-react';
import { ApplyButtonTooltip } from '../ApplyTooltip';
import { Button } from '../ui/button';

interface Props {
  onChangeModalState: React.Dispatch<React.SetStateAction<boolean | null>> | ((open: boolean) => void);
  modalIcon?: { icon: LucideIcon; size?: buttonSize; variant?: buttonVariant };
  modalText?: string;
  applyTooltip?: { title: string };
  className?: string;
  disabled?: boolean;
}

export const TriggerModal: React.FC<Props> = ({
  onChangeModalState,
  modalIcon = { icon: Component, size: 'default', variant: 'default' },
  modalText,
  applyTooltip,
  className = '',
  disabled = false
}) => {
  return (
    <Div className={'flex flex-row '}>
      {applyTooltip ? (
        <ApplyButtonTooltip
          tootTipTitle={applyTooltip.title}
          buttonProps={{ icon: modalIcon.icon, buttonText: modalText, size: modalIcon.size, variant: modalIcon.variant }}
          onClick={() => onChangeModalState(true)}
          className={className}
          disabled={disabled}
        />
      ) : (
        <Button
          variant={modalIcon.variant}
          disabled={disabled}
          onClick={() => onChangeModalState(true)}
          size={modalIcon.size}
          className={className}
        >
          {modalIcon && <modalIcon.icon />}
          {modalText}
        </Button>
      )}
    </Div>
  );
};
