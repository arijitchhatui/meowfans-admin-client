'use client';

import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  onClick: () => unknown;
}

export const ScrollToTheTop: React.FC<Props> = ({ onClick }) => {
  return (
    <Button variant="default" className="cursor-pointer absolute bottom-25 right-4 rounded-full z-50 shadow-lg" onClick={onClick}>
      <ArrowBigUp />
    </Button>
  );
};
