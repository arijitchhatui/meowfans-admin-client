'use client';

import { ImportSheet } from '@/app/vaults/[username]/ImportSheet';
import { Div } from '@/wrappers/HTMLWrappers';
import { useVaultsStore } from '@/zustand/vaults.store';
import {
  Archive,
  BarChart3,
  Bell,
  CloudOff,
  CreditCard,
  DollarSign,
  Edit,
  FileDown,
  FilePlus2,
  Filter,
  Image as ImageIcon,
  Lock,
  MailPlus,
  PowerOff,
  Search,
  Settings,
  SunMoon,
  Trash,
  UserX
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ApplyButtonTooltip } from './ApplyTooltip';
import { TriggerModal } from './modals/TriggerModal';

export const ApplyHeaderOptions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { channelId, username } = useParams();

  const { setTerminatingImportsModal, setTerminateDownloadModal } = useVaultsStore();

  const handlePathName = () => {
    switch (pathname) {
      case `/channels/${channelId}`:
        return '/channels';
      case `/vaults/${username}`:
        return '/vaults';
      default:
        return pathname;
    }
  };

  switch (handlePathName()) {
    case '/home':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Search" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Notifications" buttonProps={{ icon: Bell }} />
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </Div>
      );

    case '/profile':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Edit profile" buttonProps={{ icon: Edit }} />
          <ApplyButtonTooltip tootTipTitle="Images" buttonProps={{ icon: ImageIcon }} />
          <ApplyButtonTooltip tootTipTitle="Analytics" buttonProps={{ icon: BarChart3 }} />
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </Div>
      );

    case '/assets':
      return <Div className="flex flex-row items-center space-x-2"></Div>;

    case '/more':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} />
          <ApplyButtonTooltip tootTipTitle="Privacy & Security" buttonProps={{ icon: Lock }} />
          <ApplyButtonTooltip tootTipTitle="Payments" buttonProps={{ icon: CreditCard }} />
          <ApplyButtonTooltip tootTipTitle="Theme" buttonProps={{ icon: SunMoon }} />
        </Div>
      );

    case '/channels':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="New message" buttonProps={{ icon: MailPlus }} />
          <ApplyButtonTooltip tootTipTitle="Search chats" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Archive" buttonProps={{ icon: Archive }} />
          <ApplyButtonTooltip tootTipTitle="Blocked users" buttonProps={{ icon: UserX }} />
        </Div>
      );

    case '/subscriptions':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="View plans" buttonProps={{ icon: FilePlus2 }} />
          <ApplyButtonTooltip tootTipTitle="Set pricing" buttonProps={{ icon: DollarSign }} />
          <ApplyButtonTooltip tootTipTitle="Add creator" buttonProps={{ icon: UserX }} />
        </Div>
      );

    case '/cards':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Add card" buttonProps={{ icon: CreditCard }} />
          <ApplyButtonTooltip tootTipTitle="Remove card" buttonProps={{ icon: Trash }} />
          <ApplyButtonTooltip tootTipTitle="Card settings" buttonProps={{ icon: Settings }} />
        </Div>
      );

    case '/analytics':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Filter" buttonProps={{ icon: Filter }} />
          <ApplyButtonTooltip tootTipTitle="Export" buttonProps={{ icon: FileDown }} />
          <ApplyButtonTooltip tootTipTitle="Search" buttonProps={{ icon: Search }} />
          <ApplyButtonTooltip tootTipTitle="Insights" buttonProps={{ icon: BarChart3 }} />
        </Div>
      );

    case '/vaults':
      return (
        <Div className="flex flex-row items-center space-x-2">
          <ImportSheet />
          <TriggerModal
            applyTooltip={{ title: 'Stop importing' }}
            modalIcon={{ icon: PowerOff }}
            onChangeModalState={() => setTerminatingImportsModal(true)}
          />
          <ApplyButtonTooltip
            tootTipTitle="Stop Downloading"
            buttonProps={{ icon: CloudOff }}
            onClick={() => setTerminateDownloadModal(true)}
          />
        </Div>
      );

    default:
      return (
        <Div className="flex items-center space-x-2">
          <ApplyButtonTooltip tootTipTitle="Settings" buttonProps={{ icon: Settings }} onClick={() => router.push('/more')} />
        </Div>
      );
  }
};
