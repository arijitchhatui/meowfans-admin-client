import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => unknown;
  title?: string;
  description?: string;
}

export const ExtendedDialog: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
  title = 'Edit modal',
  description = "Make changes to your profile here. Click save when you're done."
}) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
