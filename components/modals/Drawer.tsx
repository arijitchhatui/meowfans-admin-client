import React, { useEffect, useState } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => unknown;
  title?: string;
  description?: string;
}

export const ExtendedDrawer: React.FC<Props> = ({
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
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};
