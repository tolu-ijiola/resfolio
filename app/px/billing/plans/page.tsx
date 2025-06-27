"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className=" min-h-screen ">
      {/* Header Section */}
        <div className="">
            <Button asChild variant="outline" size={'icon'} className="mb-4">
                <Link href="/px/billing/">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Choose a plan that’s right for you
        </h1>
        <p className="mb-4 text-sm text-neutral-700 md:text-base">
          Try our basic plan. Upgrade to a paid plan to get more features.
        </p>

        {/* Pricing Tabs */}
        <Tabs defaultValue="annual">
          <TabsList className="mb-4 inline-flex">
            <TabsTrigger value="annual">Annual pricing</TabsTrigger>
            <TabsTrigger value="monthly">Monthly pricing</TabsTrigger>
          </TabsList>

          {/* Annual Pricing */}
          <TabsContent value="annual">
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {/* Free trial plan */}
              <PricingCard
                title="Free trial"
                price="$0"
                description="Best for small teams and freelancers."
                buttonText="Start free trial"
              />
              {/* Business plan */}
              <PricingCard
                title="Business plan"
                price="$20"
                description="Best for growing teams."
                buttonText="Get started"
              />
              {/* Enterprise plan */}
              <PricingCard
                title="Enterprise plan"
                price="$40"
                description="Best for large organizations."
                buttonText="Get started"
              />
            </div>
          </TabsContent>

          {/* Monthly Pricing */}
          <TabsContent value="monthly">
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {/* Free trial plan */}
              <PricingCard
                title="Free trial"
                price="$0"
                description="Best for small teams and freelancers."
                buttonText="Start free trial"
              />
              {/* Business plan */}
              <PricingCard
                title="Business plan"
                price="$25"
                description="Best for growing teams."
                buttonText="Get started"
              />
              {/* Enterprise plan */}
              <PricingCard
                title="Enterprise plan"
                price="$50"
                description="Best for large organizations."
                buttonText="Get started"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Feature Comparison Table */}
      <section className="mx-auto mt-12 max-w-5xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-left text-sm text-neutral-400">
            <tr>
              <th className="py-2 font-medium">Features</th>
              <th className="py-2 font-medium">Free trial</th>
              <th className="py-2 font-medium">Business</th>
              <th className="py-2 font-medium">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 text-sm">
            <tr>
              <td className="py-3">Basic features</td>
              <td className="py-3">✓</td>
              <td className="py-3">✓</td>
              <td className="py-3">✓</td>
            </tr>
            <tr>
              <td className="py-3">Individual data (GB)</td>
              <td className="py-3">10GB</td>
              <td className="py-3">40GB</td>
              <td className="py-3">100GB</td>
            </tr>
            <tr>
              <td className="py-3">Team members</td>
              <td className="py-3">2</td>
              <td className="py-3">10</td>
              <td className="py-3">Unlimited</td>
            </tr>
            <tr>
              <td className="py-3">Analytics</td>
              <td className="py-3">Basic</td>
              <td className="py-3">Advanced</td>
              <td className="py-3">Advanced + AI</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

/* 
  A reusable PricingCard component for the three plan cards.
  You can customize styling, icons, or add disclaimers as needed.
*/
type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  buttonText: string;
};

function PricingCard({ title, price, description, buttonText }: PricingCardProps) {
  return (
    <Card className="bg-white ">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-neutral-700">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-4xl font-bold">{price}<span className="text-xl">/mo</span></div>
        <Button  className=" w-full h-10 mt-3">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
