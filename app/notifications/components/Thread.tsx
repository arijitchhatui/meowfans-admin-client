'use client';

import { Button } from '@/components/ui/button';
import { Div, Span, Typography } from '@/wrappers/HTMLWrappers';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import React, { JSX } from 'react';
import { Notifications } from './Notifications';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

const typeConfig: Record<NotificationType, { icon: JSX.Element; color: string }> = {
  info: { icon: <Info className="w-4 h-4 text-blue-500" />, color: 'bg-gray-300 dark:bg-gray-800' },
  success: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'bg-gray-300 dark:bg-gray-800' },
  warning: { icon: <AlertCircle className="w-4 h-4 text-yellow-500" />, color: 'bg-gray-300 dark:bg-gray-800' },
  error: { icon: <XCircle className="w-4 h-4 text-red-500" />, color: 'bg-gray-300 dark:bg-gray-800' }
};

interface Props {
  notifications: Notifications[];
}

export const NotificationThreads: React.FC<Props> = ({ notifications }) => {
  return (
    <Div className="w-full">
      <Div className="border rounded-2xl bg-neutral-50 dark:bg-black overflow-y-auto p-3 space-y-2">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type as NotificationType];
          return (
            <Div
              key={notification.id}
              className={`flex flex-col p-3 rounded-2xl shadow-sm border transition hover:shadow-md bg-[var(--background)] ${
                notification.isRead ? '' : config.color
              }`}
            >
              <Div className="flex items-center justify-between">
                <Div className="flex items-center gap-2">
                  {config.icon}
                  <Typography className={'font-bold'}>{notification.fullName}</Typography>
                </Div>
                <Span className="w-3 h-3 bg-indigo-500 rounded-full" />
              </Div>

              <Typography className="text-lg font-semibold">{notification.message}</Typography>
              <Div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Span className="bg-white px-2 py-0.5 rounded-full">{notification.title}</Span>
                <Span>{notification.createdAt.getDate()}</Span>
              </Div>

              <Div className="flex gap-2 mt-2">
                <Button className="text-xs" variant={'outline'}>
                  Mark as Read
                </Button>
                <Button className="text-xs" variant={'default'}>
                  Dismiss
                </Button>
              </Div>
            </Div>
          );
        })}
        {notifications.length === 0 && <Typography className="text-center text-gray-500 py-4">No new notifications 🎉</Typography>}
      </Div>
    </Div>
  );
};
