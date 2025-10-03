'use client';

import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import React, { createContext, useEffect, useState, ReactNode } from 'react';

type EventData = Record<string, any>;

export const EventsContext = createContext<EventData[] | null>(null);

export const EventsEmitter = ({ onEvent }: { onEvent: (data: EventData) => void }) => {
  useEffect(() => {
    const sseURL = buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/sse/stream' });

    const es = new EventSource(sseURL);

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onEvent(data);

      window.dispatchEvent(new CustomEvent(event.type, { detail: data }));
    };

    return () => es.close();
  }, [onEvent]);

  return null;
};

interface Props {
  children: ReactNode;
}

export function EventsContextWrapper({ children }: Props) {
  const [events, setEvents] = useState<EventData[]>([]);

  const handleEvent = (data: EventData) => {
    setEvents((prev) => [...prev, data]);
  };

  return (
    <EventsContext.Provider value={events}>
      <EventsEmitter onEvent={handleEvent} />
      {children}
    </EventsContext.Provider>
  );
}
