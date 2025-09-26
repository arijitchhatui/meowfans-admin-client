'use client';

import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  growthRateData,
  GrowthRateType,
  newCustomersData,
  NewCustomerType,
  performancesData,
  PerformanceType,
  ProfileCharts,
  totalRevenueData,
  TotalRevenueType
} from '@/lib/constants';
import { GET_CREATOR_PROFILE_QUERY } from '@/packages/gql/api/creatorAPI';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { Performances } from './ActiveAccounts';
import { AppliedChart } from './AppliedChart';
import { GrowthRate } from './GrowthRate';
import { NewCustomers } from './NewCustomers';
import { ProfileDescription } from './ProfileDescription';
import { Stats } from './Stats';
import { Preferences } from './Tabs';
import { TotalRevenue } from './TotalRevenue';

const chartConfig: Record<ProfileCharts, ChartDataTypes> = {
  NEW_CUSTOMERS: newCustomersData,
  GROWTH_RATE: growthRateData,
  PERFORMANCES: performancesData,
  TOTAL_REVENUE: totalRevenueData
};

export type ChartDataTypes = NewCustomerType | TotalRevenueType | GrowthRateType | PerformanceType;

const CreatorProfile = () => {
  const { data: creatorInfo, loading } = useQuery(GET_CREATOR_PROFILE_QUERY);
  const [chart, setChart] = useState<ProfileCharts>(ProfileCharts.NEW_CUSTOMERS);

  if (loading) return <Loading />;
  return (
    <PageWrapper>
      <ScrollArea className="flex w-full">
        <Div className="md:flex hidden flex-col md:flex-row gap-1 justify-between">
          <NewCustomers setChart={setChart} />
          <TotalRevenue setChart={setChart} />
          <GrowthRate setChart={setChart} />
          <Performances setChart={setChart} />
        </Div>
        <Div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto">
          <Div className="flex flex-row justify-between">
            <AppliedChart data={chartConfig[chart]} />
            <ProfileDescription creatorInfo={creatorInfo} />
          </Div>
          <Stats creatorInfo={creatorInfo} />
          <Preferences />
          <Div className="flex gap-3 justify-center">
            <Button className="flex-1">Follow</Button>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
          </Div>
        </Div>
      </ScrollArea>
    </PageWrapper>
  );
};

export default CreatorProfile;
