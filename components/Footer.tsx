'use client';

import { Div, Typography } from '@/wrappers/HTMLWrappers';
import { Button } from './ui/button';

interface Props {
  message?: string;
  onClick?: () => unknown;
}

export const Footer: React.FC<Props> = ({ message, onClick }) => {
  return (
    <Div className="shadow-md p-4 flex justify-center gap-3 rounded-2xl">
      <Button className="px-6 py-3 rounded-xl font-semibold cursor-pointer" onClick={onClick}>
        Load more
      </Button>
      {message && <Typography className="text-center text-sm text-gray-500 mt-2 mb-4">{message}</Typography>}
    </Div>
  );
};
