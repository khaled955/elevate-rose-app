"use client";

import { useEffect, useId, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Customized,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFormatter, useLocale } from "next-intl";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

//Types
export type MonthlyRevenue = {
  _id: string;
  revenue: number;
  count: number;
};

type DailyRevenue = {
  _id: string;
  revenue: number;
  count: number;
};

type IntervalType = "monthly" | "weekly";

type RevenueChartProps = {
  className?: string;
  title?: string;
  monthlyLabel?: string;
  weeklyLabel?: string;
  monthlyRevenue: MonthlyRevenue[];
  dailyRevenue: DailyRevenue[];
  height?: number;
  strokeColor?: string;
  gradientTop?: string;
  gradientBottom?: string;
  yAxisWidth?: number;
};

type RechartsContentTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number | string | null }>;
};

// Recharts internal types
interface ScaleFunc {
  (value: string | number): number | undefined;
  bandwidth?: () => number;
}
interface RechartsCustomizedProps {
  xAxisMap?: Record<number, { scale: ScaleFunc }>;
  yAxisMap?: Record<number, { scale: ScaleFunc }>;
  offset?: { top: number; height: number; left: number; width: number };
}

//Tooltip
function RevenueTooltip({
  active,
  payload,
  label,
  formatCurrency,
}: RechartsContentTooltipProps & {
  formatCurrency: (n: number) => string;
}) {
  if (!active || !payload?.length) return null;

  const raw = payload[0]?.value;
  const value = typeof raw === "number" ? raw : Number(raw ?? 0);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      {/* Month / day label */}
      <div className="text-muted-foreground">{String(label ?? "")}</div>
      {/* Formatted currency value */}
      <div className="mt-1 font-semibold text-foreground">
        {formatCurrency(value)}
      </div>
    </div>
  );
}

//Hover column highlight
function HoverColumnHighlight({
  hoveredLabel,
  labelsCount,
}: {
  hoveredLabel: string | null;
  labelsCount: number;
}) {
  return (
    <Customized
      component={(props: RechartsCustomizedProps) => {
        const xAxis = props?.xAxisMap?.[0];
        const offset = props?.offset;
        if (!xAxis || !offset || !hoveredLabel || labelsCount <= 0) return null;

        const xCenter = xAxis.scale(hoveredLabel);
        if (typeof xCenter !== "number") return null;

        const colWidth = offset.width / labelsCount;

        return (
          <rect
            x={xCenter - colWidth / 2}
            y={offset.top}
            width={colWidth}
            height={offset.height}
            fill="#FFFFFF"
            opacity={0.5}
          />
        );
      }}
    />
  );
}

// Max value marker
function MaxMarker({
  targetLabel,
  targetValue,
  labelText,
  color,
}: {
  targetLabel: string;
  targetValue: number;
  labelText: string;
  color: string;
}) {
  return (
    <Customized
      component={(props: RechartsCustomizedProps) => {
        const xAxis = props?.xAxisMap?.[0];
        const yAxis = props?.yAxisMap?.[0];
        if (!xAxis || !yAxis) return null;

        const x = xAxis.scale(targetLabel);
        const y = yAxis.scale(targetValue);
        if (typeof x !== "number" || typeof y !== "number") return null;

        return (
          <g>
            {/* Currency label above dot */}
            <text
              x={x}
              y={y - 14}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={color}
            >
              {labelText}
            </text>
            {/* Dot */}
            <circle
              cx={x}
              cy={y}
              r={6}
              fill={color}
              stroke="#FFFFFF"
              strokeWidth={3}
            />
          </g>
        );
      }}
    />
  );
}

//Helpers
function safeMonthToDateString(id: string) {
  if (/^\d{4}-\d{2}$/.test(id)) return `${id}-01`;
  return id;
}

function safeDate(value: string): Date | null {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default function RevenueChart({
  className,
  title = "Revenue",
  monthlyLabel = "Monthly",
  weeklyLabel = "Last Week",
  monthlyRevenue,
  dailyRevenue,
  height = 274,
  strokeColor = "#A6252A",
  gradientTop = "#A6252A",
  gradientBottom = "#F8B1EF",
  yAxisWidth = 60,
}: RevenueChartProps) {
  // Translations
  const format = useFormatter();
  const locale = useLocale();

  // State
  const [mounted, setMounted] = useState(false);
  const [interval, setInterval] = useState<IntervalType>("monthly");
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  // Variables
  const isRTL = locale === "ar";
  const gradientId = useId().replace(/:/g, "");
  const grad = `revenue-grad-${gradientId}`;

  // Formatters
  const formatNumber = (n: number) => format.number(n, "number-base");
  const formatCurrency = (n: number) => format.number(n, "currency-egp");
  const formatMonthLabel = (id: string) => {
    const d = safeDate(safeMonthToDateString(id));
    return d ? format.dateTime(d, { month: "short" }) : String(id);
  };
  const formatWeekLabel = (iso: string) => {
    const d = safeDate(iso);
    return d
      ? format.dateTime(d, { day: "2-digit", month: "short" })
      : String(iso);
  };

  // Chart data
  const monthlyData = monthlyRevenue.map((item) => ({
    x: formatMonthLabel(item._id),
    revenue: item.revenue,
    count: item.count,
  }));
  const weeklyData = dailyRevenue.map((item) => ({
    x: formatWeekLabel(item._id),
    revenue: item.revenue,
    count: item.count,
  }));

  // RTL: reverse data so first item sits on the right
  const rawData = interval === "monthly" ? monthlyData : weeklyData;
  const data = isRTL ? [...rawData].reverse() : rawData;
  const labelsCount = data.length;

  // Highest revenue point
  let highestRaw: { x: string; revenue: number; count: number } | null = null;
  for (const point of rawData) {
    if (!highestRaw || point.revenue > highestRaw.revenue) highestRaw = point;
  }
  // Match in (possibly reversed) data for correct marker position
  const highest = highestRaw
    ? (data.find((d) => d.x === highestRaw!.x) ?? null)
    : null;
  const highestText = highestRaw ? formatCurrency(highestRaw.revenue) : "";

  // Y-axis ticks
  let maxVal = 0;
  for (const point of data) maxVal = Math.max(maxVal, point.revenue);
  const yMax = Math.max(1000, Math.ceil(maxVal / 1000) * 1000);
  const yTicks: number[] = [];
  for (let v = 0; v <= yMax; v += 1000) yTicks.push(v);

  // Effects
  useEffect(() => setMounted(true), []);

  return (
    <Card
      className={cn(
        "rounded-2xl bg-white shadow-sm dark:bg-zinc-950",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>

          {/* Interval toggle */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <button
              type="button"
              onClick={() => setInterval("monthly")}
              className={cn(
                "transition-colors duration-300",
                interval === "monthly" ? "text-maroon-600" : "text-zinc-400",
              )}
            >
              {monthlyLabel}
            </button>
            <button
              type="button"
              onClick={() => setInterval("weekly")}
              className={cn(
                "transition-colors duration-300",
                interval === "weekly" ? "text-maroon-600" : "text-zinc-400",
              )}
            >
              {weeklyLabel}
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {/* Skeleton while not mounted */}
        {!mounted ? (
          <div
            className="w-full rounded-2xl bg-black/5 dark:bg-white/5"
            style={{ height }}
          />
        ) : (
          <div className="w-full" style={{ height }} dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={
                  isRTL
                    ? { top: 28, right: 0, left: 16, bottom: 0 }
                    : { top: 28, right: 16, left: 0, bottom: 0 }
                }
                onMouseMove={(state) => {
                  if (state?.activeLabel != null)
                    setHoveredLabel(String(state.activeLabel));
                }}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                {/* Gradient fill */}
                <defs>
                  <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={gradientTop}
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="100%"
                      stopColor={gradientBottom}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                {/* Vertical grid lines only */}
                <CartesianGrid
                  vertical
                  horizontal={false}
                  stroke="#E5E7EB"
                  strokeDasharray="0"
                />

                {/* X axis — months or days */}
                <XAxis
                  dataKey="x"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  interval={0}
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />

                {/* Y axis — right side for RTL */}
                <YAxis
                  orientation={isRTL ? "right" : "left"}
                  width={yAxisWidth}
                  ticks={yTicks}
                  domain={[0, yMax]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  tick={{ fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(v) => formatNumber(Number(v))}
                />

                {/* Hover tooltip */}
                <Tooltip
                  cursor={{ fill: "#FFFFFF", opacity: 0.8 }}
                  content={<RevenueTooltip formatCurrency={formatCurrency} />}
                />

                {/* Area with gradient fill */}
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={strokeColor}
                  strokeWidth={1.5}
                  fill={`url(#${grad})`}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: strokeColor,
                    stroke: "#FFFFFF",
                    strokeWidth: 3,
                  }}
                />

                {/* White column highlight on hover */}
                <HoverColumnHighlight
                  hoveredLabel={hoveredLabel}
                  labelsCount={labelsCount}
                />

                {/* Transparent area to keep activeDot on top */}
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={strokeColor}
                  strokeWidth={1.5}
                  fill="transparent"
                  dot={false}
                  activeDot={false}
                />

                {/* Max value marker */}
                {highest && (
                  <MaxMarker
                    targetLabel={highest.x}
                    targetValue={highest.revenue}
                    labelText={highestText}
                    color={strokeColor}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
