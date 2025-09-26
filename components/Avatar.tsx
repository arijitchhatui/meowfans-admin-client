'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Props {
  url?: string | null;
  className?: string;
  fallback?: string;
}

export const SAvatar: React.FC<Props> = ({ url, fallback, className }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={url || 'https://github.com/evilrabbit.png'} alt={fallback || '@evilrabbit'} />
      <AvatarFallback>{fallback || 'MW'}</AvatarFallback>
    </Avatar>
  );
};
