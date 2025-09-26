import { ApplyNotificationContentFilterModal } from '@/components/modals/ApplyNotificationContentFilterModal';
import { TriggerModal } from '@/components/modals/TriggerModal';
import { Div } from '@/wrappers/HTMLWrappers';
import { motion } from 'framer-motion';
import { Bell, Funnel } from 'lucide-react';
import { useState } from 'react';

export const NotificationsHeader = () => {
  const [contentFilterOpen, setContentFilterOpen] = useState<boolean>(false);

  return (
    <Div className="flex flex-row items-center justify-between bg-[var(--background)]">
      {' '}
      <Div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <Div className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-white shadow-lg">
            <Bell size={20} />
          </Div>
          <Div>
            <h1 className="text-2xl md:text-3xl font-semibold">Notifications</h1>
            <p className="text-sm text-muted-foreground">Be updated all the time</p>
          </Div>
        </motion.div>
      </Div>
      <TriggerModal onChangeModalState={setContentFilterOpen} modalIcon={{ icon: Funnel }} />
      <ApplyNotificationContentFilterModal open={contentFilterOpen} setOpen={setContentFilterOpen} />
    </Div>
  );
};
