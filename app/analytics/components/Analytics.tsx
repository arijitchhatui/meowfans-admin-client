'use client';

import { Performances } from '@/app/profiles/[username]/components/ActiveAccounts';
import { GrowthRate } from '@/app/profiles/[username]/components/GrowthRate';
import { NewCustomers } from '@/app/profiles/[username]/components/NewCustomers';
import { TotalRevenue } from '@/app/profiles/[username]/components/TotalRevenue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { AnalyticsEarnings } from './Earnings';
import { AnalyticsHeader } from './Header';
import { AnalyticsMessages } from './Messages';
import { AnalyticsPosts } from './Posts';
import { AnalyticsPostsInfo } from './PostsInfo';
import { AnalyticsPurchases } from './Purchases';
import { AnalyticsVisitor } from './Visitors';

export const Analytics = () => {
  return (
    <PageWrapper>
      <AnalyticsHeader />
      <Separator />
      <ScrollArea className="flex w-full">
        <Div className="flex md:hidden flex-col md:flex-row p-1 justify-between w-full space-x-3 space-y-1">
          <NewCustomers setChart={() => null} />
          <TotalRevenue setChart={() => null} />
          <GrowthRate setChart={() => null} />
          <Performances setChart={() => null} />
        </Div>
        <Div className="w-full flex flex-col space-x-1 p-1">
          <AnalyticsEarnings />
          <AnalyticsVisitor />
        </Div>
        <Div className="flex flex-col p-1 md:flex-row justify-around space-y-1 w-full">
          <AnalyticsPurchases />
          <AnalyticsPosts />
        </Div>
        <Div className="p-1">
          <AnalyticsMessages />
        </Div>
      </ScrollArea>
      <AnalyticsPostsInfo />
    </PageWrapper>
  );
};
