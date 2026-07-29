import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { ChartCategory } from "@/types/categories/categories.types"

export const description = "A mixed bar chart"

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface Props {
  topCategories: ChartCategory
}

export default function ChartCategories({ topCategories }: Props) {

  const chartData = topCategories.map((category, index) => ({
    ...category,
    fill: COLORS[index % COLORS.length],
  }));

  const chartConfig = chartData.reduce(
    (acc, category) => {
      acc[category.name] = {
        label: category.name,
        color: category.fill,
      };

      return acc;
    },
    {
      totalProducts: {
        label: "Productos",
      },
    } as ChartConfig
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías con más productos</CardTitle>
        <CardDescription>Top 5 por cantidad registrada</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 30,
              }}
              barSize={20}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <XAxis dataKey="totalProducts" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="totalProducts" radius={5}>
                <LabelList
                  dataKey="totalProducts"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>

        ): (
          <p className="text-muted-foreground text-sm">Sin registros para mostrar...</p>
        )}
      </CardContent>
    </Card>
  )
}
