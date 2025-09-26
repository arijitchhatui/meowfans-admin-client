import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { CardsHeader } from './Header';

export const Cards = () => {
  const plans = [
    {
      id: 'starter',
      name: 'Recurring',
      description: 'Automatic payments',
      price: '$10',
      isUsing: false
    },
    {
      id: 'pro',
      name: 'Onetime',
      description: 'Verify each time',
      price: '$20',
      isUsing: true
    }
  ] as const;

  return (
    <PageWrapper>
      <CardsHeader />
      <Separator />
      <Div className="flex md:flex-row flex-col justify-between md:space-x-1 space-y-1">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Card key={idx} className={`w-full ${idx % 3 === 0 && 'border-indigo-400'}`}>
              <CardHeader>
                <CardTitle className="text-lg">{idx % 3 === 0 ? 'Currently using' : 'Add new Card'}</CardTitle>
                <CardDescription className="text-balance">
                  {idx % 3 === 0 ? 'You are currently on the free plan.' : 'Add alternate cards for flexible payments'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Div className="flex flex-col gap-6">
                  <Div className="flex flex-col gap-3 md:flex-row">
                    <Div className="flex flex-1 flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Evil Rabbit" />
                    </Div>
                    <Div className="flex flex-1 flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="example@acme.com" />
                    </Div>
                  </Div>
                  <Div className="flex flex-col gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Div className="grid grid-cols-2 gap-3 md:grid-cols-[1fr_80px_60px]">
                      <Input id="card-number" placeholder="1234 1234 1234 1234" className="col-span-2 md:col-span-1" />
                      <Input id="card-number-expiry" placeholder="MM/YY" />
                      <Input id="card-number-cvc" placeholder="CVC" />
                    </Div>
                  </Div>
                  <fieldset className="flex flex-col gap-3">
                    <p className="text-sm font-medium">Plan</p>
                    <p className="text-muted-foreground text-sm">Select the plan that best fits your needs.</p>
                    <RadioGroup defaultValue="starter" className="grid gap-3 md:grid-cols-2">
                      {plans.map((plan) => (
                        <Label
                          className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-input/20 flex items-start gap-3 rounded-lg border p-3"
                          key={plan.id}
                        >
                          <RadioGroupItem value={plan.id} id={plan.name} className="data-[state=checked]:border-primary" />
                          <Div className="grid gap-1 font-normal">
                            <Div className="font-medium">{plan.name}</Div>
                            <Div className="text-muted-foreground text-xs leading-snug text-balance">{plan.description}</Div>
                          </Div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </Div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Delete this card
                </Button>
                <Button size="sm">Use for future payments</Button>
              </CardFooter>
            </Card>
          ))}
      </Div>
    </PageWrapper>
  );
};
