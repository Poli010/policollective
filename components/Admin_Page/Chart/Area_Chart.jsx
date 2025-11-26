"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ResponsiveContainer } from "recharts";

export const description = "An area chart with gradient fill"

const chartData = [
    { month: "January", desktop: 186, },
    { month: "February", desktop: 305, },
    { month: "March", desktop: 237, },
    { month: "April", desktop: 73,  },
    { month: "May", desktop: 209, },
    { month: "June", desktop: 214, },
    { month: "July", desktop: 214, },
    { month: "August", desktop: 214, },
    { month: "September", desktop: 214, },
    { month: "October", desktop: 214, },
    { month: "November", desktop: 214, },
    { month: "December", desktop: 214, },
]

const chartConfig = {
  desktop: {
    label: "T shirt",
    color: "blue",
  },
} 

export default function Area_Chart() {
  return (
    <Card className="h-[50vh] w-full dark:bg-gray-900 dark:border-gray-900">
        <CardHeader>
            <CardTitle>Sales Report</CardTitle>
            <CardDescription>Showing total sales of the year 2025</CardDescription>
        </CardHeader>
        <CardContent className="h-[20vh] p-3 w-full"> 
            <ChartContainer config={chartConfig} className="h-[20vh] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart accessibilityLayer data={chartData} margin={{left: 12, right: 12,}}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="url(#fillMobile)"
                            fillOpacity={0.4}
                            stroke="var(--color-mobile)"
                            stackId="a"
                            className="border border-black"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#fillDesktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
        <CardFooter className="">
            <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 leading-none font-medium">Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /></div>
                    <div className="text-muted-foreground flex items-center gap-2 leading-none"> January - December 2025</div>
                </div>
            </div>
      </CardFooter>
    </Card>
  )
}

