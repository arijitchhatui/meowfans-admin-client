import { cn } from '@/lib/utils';
import React from 'react';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn('w-full', className)} {...props}>
      {children}
    </div>
  );
};
