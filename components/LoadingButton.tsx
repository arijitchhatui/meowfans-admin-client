'use client';

import { cn } from '@/lib/utils';
import { buttonSize, buttonVariant } from '@/util/helpers';
import { Loader, LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  title?: string;
  variant?: buttonVariant;
  size?: buttonSize;
  loading?: boolean;
  onClick?: () => unknown;
  Icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  destructive?: boolean;
}

export const LoadingButton: React.FC<Props> = ({
  size = 'default',
  title = '',
  variant,
  loading = false,
  onClick,
  Icon,
  disabled = false,
  className = '',
  destructive = false
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={(cn(className), destructive ? 'bg-red-500' : '')}
    >
      {loading && <Loader className={'animate-spin'} />}
      {Icon && !loading && <Icon />}
      {title}
    </Button>
  );
};
