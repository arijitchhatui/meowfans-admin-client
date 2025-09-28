import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { Check, Crown, Star } from 'lucide-react';
import { useState } from 'react';
import { Header } from './Header';

type BillingCycle = 'monthly' | 'yearly';

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number; // total per year
  featured?: boolean;
  description?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 8,
    priceYearly: 72, // 2 months free
    description: 'For individuals getting started',
    features: ['1 creator seat', 'Basic support', '5GB storage']
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 24,
    priceYearly: 216,
    featured: true,
    description: 'Power tools for creators and small teams',
    features: ['5 creator seats', 'Priority support', '50GB storage', 'Analytics']
  },
  {
    id: 'business',
    name: 'Business',
    priceMonthly: 79,
    priceYearly: 708,
    description: 'Advanced features and SLAs for businesses',
    features: ['Unlimited seats', 'Dedicated support', '1TB storage', 'Custom SSO']
  }
];

export const Subscriptions = () => {
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>('pro');

  const formatPrice = (plan: Plan) => {
    if (billing === 'monthly') return `$${plan.priceMonthly}/mo`;
    const perMonth = Math.round((plan.priceYearly / 12) * 100) / 100;
    return `$${perMonth}/mo billed $${plan.priceYearly}/yr`;
  };

  return (
    <PageWrapper>
      <Header />
      <Div className="w-full">
        <Div className="flex flex-wrap items-center gap-4 mb-6">
          <Div className="flex items-center gap-3">
            <span className="text-sm font-medium">Monthly</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  checked={billing === 'yearly'}
                  onCheckedChange={(v) => setBilling(v ? 'yearly' : 'monthly')}
                  aria-label="billing-type"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to yearly for 2 months free.</p>
              </TooltipContent>
            </Tooltip>
            <span className="text-sm font-medium">Yearly</span>
          </Div>

          <Div className="ml-auto flex items-center gap-4">
            <Badge>Most popular</Badge>
            <Button variant="ghost" size="sm">
              Compare plans
            </Button>
          </Div>
        </Div>

        <Div className="w-full">
          <Div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const active = selectedPlan === plan.id;
              return (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden transition-shadow duration-200 ${
                    plan.featured ? 'ring-2 ring-indigo-400 scale-105' : ''
                  } ${active ? 'border-2 border-indigo-500' : ''}`}
                >
                  {plan.featured && (
                    <Div className="absolute top-0 right-0">
                      <Div className="flex items-center bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                        <Crown className="w-4 h-4" />
                        <span>Popular</span>
                      </Div>
                    </Div>
                  )}

                  <CardHeader className="p-4 pt-8">
                    <Div className="flex items-center justify-between">
                      <Div>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                      </Div>
                      <Div className="text-right">
                        <Div className="text-2xl font-bold">{formatPrice(plan)}</Div>
                        {billing === 'yearly' && <Div className="text-xs text-muted-foreground mt-1">Save 2 months</Div>}
                      </Div>
                    </Div>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <Div className="mt-1">
                            <Check className="w-4 h-4" />
                          </Div>
                          <Div className="text-sm">{f}</Div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex items-center gap-4">
                    <Button className="flex-1" onClick={() => setSelectedPlan(plan.id)} variant={active ? 'outline' : 'default'}>
                      {active ? 'Selected' : 'Choose'}
                    </Button>

                    <Button variant={active ? 'secondary' : 'ghost'} size="sm">
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </Div>

          <Div className="mt-8 p-6 bg-muted rounded-lg">
            <Div className="flex items-center gap-4">
              <Div className="flex items-center gap-3">
                <Star className="w-5 h-5" />
                <Div>
                  <Div className="text-sm font-semibold">Need a custom plan?</Div>
                  <Div className="text-xs text-muted-foreground">Contact sales for enterprise pricing and SLAs</Div>
                </Div>
              </Div>
              <Div className="ml-auto">
                <Button>Contact Sales</Button>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </PageWrapper>
  );
};
