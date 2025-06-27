'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { ArrowDown, ArrowUp, CalendarIcon, Eye, MousePointerClick, Users } from 'lucide-react'
import React from 'react'
import { DateRange } from 'react-day-picker'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

function page() {

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  })

  const viewsData = [
    { date: "2024-01", views: 1200 },
    { date: "2024-02", views: 1900 },
    { date: "2024-03", views: 2400 },
    { date: "2024-04", views: 3100 },
    { date: "2024-05", views: 3800 },
  ];
  
  const clicksData = [
    { date: "2024-01", clicks: 180 },
    { date: "2024-02", clicks: 240 },
    { date: "2024-03", clicks: 380 },
    { date: "2024-04", clicks: 470 },
    { date: "2024-05", clicks: 590 },
  ];
  
  interface StatCardProps {
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
  }
  
  const StatCard = ({ title, value, change, icon }: StatCardProps) => (
    <Card className="p-6 bg-neutral-50 border-neutral-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-teal-50/80 p-2 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex text-xs items-center">
        {change >= 0 ? (
          <ArrowUp className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`ml-1 ${change >= 0 ? "text-teal-800" : "text-red-500"}`}>
          {Math.abs(change)}%
        </span>
        <span className="ml-1 text-xs text-muted-foreground">from last month</span>
      </div>
    </Card>
  );
  

  return (
    <div className=' text-sm'>
      <div className=' flex justify-between items-center'>
        <h1 className=' text-2xl font-bold'>Analytics</h1>
        <div className={"grid gap-2"}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  " justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(value) => setDate(value)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
      <div className="grid gap-6 mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard
          title="Total Views"
          value="38.2K"
          change={12.5}
          icon={<Eye className="h-6 w-6 text-teal-800" />}
        />
        <StatCard
          title="Total Clicks"
          value="5.9K"
          change={8.2}
          icon={<MousePointerClick className="h-6 w-6 text-teal-800" />}
        />
        <StatCard
          title="Click-through Rate"
          value="15.4%"
          change={-2.3}
          icon={<Users className="h-6 w-6 text-teal-800" />}
        />
        
      </div>

      {/* Charts */}
      <Tabs defaultValue="views" className="space-y-4">
        <TabsList>
          <TabsTrigger value="views">Views</TabsTrigger>
          <TabsTrigger value="clicks">Clicks</TabsTrigger>
        </TabsList>
        <TabsContent value="views" className="space-y-4">
          <Card className="p-6 bg-neutral-50 border-neutral-300">
            <h2 className="text-xl font-semibold mb-4">Views Over Time</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('default', { month: 'short' });
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="clicks" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Clicks Over Time</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clicksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('default', { month: 'short' });
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}

export default page