import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { ChartsSuppliers } from "@/types/suppliers/suppliers.type"

export const description = "A mixed bar chart"

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface Props {
  topSuppliers: ChartsSuppliers
}

export const ChartSupplier = ({ topSuppliers }: Props) => {

  const chartData = topSuppliers.map((supp, index) => ({
    ...supp,
    fill: COLORS[index % COLORS.length],
  }));

  const chartConfig = chartData.reduce(
    (acc, supp) => {
      acc[supp.enterprise] = {
        label: supp.enterprise,
        color: supp.fill,
      };

      return acc;
    },
    {
      totalAmount: {
        label: "Total comprado",
      },
    } as ChartConfig
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top proveedores por compras</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 50,
              }}
              barSize={20}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="enterprise"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <XAxis dataKey="totalAmount" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="totalAmount" radius={4}>
                <LabelList
                  dataKey="totalAmount"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>

        ) : (
          <p className="text-muted-foreground text-sm">Sin registros para mostrar...</p>
        )}
      </CardContent>
    </Card>
  )
}
