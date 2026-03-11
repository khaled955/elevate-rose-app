"use client";
import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart, Cell, type PieLabelRenderProps } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils/cn";
import { useTranslations, useFormatter } from "next-intl";

// ===== Types =====
export interface StatusItem {
  key: string;
  label: string;
  value: number;
}

interface OrdersStatusChartProps {
  className?: string;
}

// ===== Constants =====
const RADIAN = Math.PI / 180;

const STATUS_CONFIG: Record<string, { hex: string; dotClass: string }> = {
  completed: { hex: "#10b981", dotClass: "bg-emerald-500" },
  "in-progress": { hex: "#3b82f6", dotClass: "bg-blue-500" },
  canceled: { hex: "#dc2626", dotClass: "bg-red-600" },
};

function getStatusConfig(key: string) {
  return (
    STATUS_CONFIG[key] ?? {
      hex: "#6b7280",
      dotClass: "bg-gray-500",
    }
  );
}

export function OrdersStatusChart({ className }: OrdersStatusChartProps) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // State
  const [isMounted, setIsMounted] = useState(false);

  // Variables
  const data = useMemo<StatusItem[]>(() => {
    return [
      { key: "completed", label: t("completed"), value: 216 },
      { key: "in-progress", label: t("in-progress"), value: 513 },
      { key: "canceled", label: t("canceled"), value: 66 },
    ];
  }, [t]);

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data],
  );

  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    data.forEach((item) => {
      config[item.key] = {
        label: item.label,
        color: getStatusConfig(item.key).hex,
      };
    });
    return config;
  }, [data]);

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        name: item.label,
        key: item.key,
        value: item.value,
        fill: getStatusConfig(item.key).hex,
      })),
    [data],
  );

  // ===== Render custom label (inside component to access `format`) =====
  const renderCustomLabel = useMemo(() => {
    return function CustomLabel(props: PieLabelRenderProps) {
      const cx = typeof props.cx === "number" ? props.cx : 0;
      const cy = typeof props.cy === "number" ? props.cy : 0;
      const midAngle = typeof props.midAngle === "number" ? props.midAngle : 0;
      const outerRadius =
        typeof props.outerRadius === "number" ? props.outerRadius : 0;
      const percent = typeof props.percent === "number" ? props.percent : 0;

      const radius = outerRadius - 2;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      const badgeRadius = 16;

      const label = format.number(percent, "percentage-without-zero");

      return (
        <g>
          <circle
            cx={x}
            cy={y}
            r={badgeRadius}
            fill="white"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
          />
          <text
            x={x}
            y={y}
            fill="#1f2937"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight={700}
          >
            {label}
          </text>
        </g>
      );
    };
  }, [format]);

  // Effects
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg font-bold text-foreground">
          {t("order-status")}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 pb-6">
        {!isMounted ? (
          <div className="mx-auto aspect-square h-[220px] w-[220px] rounded-2xl bg-black/5 dark:bg-white/5" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[220px] w-[220px] [&_.recharts-wrapper]:overflow-visible [&_svg]:overflow-visible"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={0}
                strokeWidth={0}
                stroke="none"
                label={renderCustomLabel}
                labelLine={false}
                isAnimationActive={true}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}

        {/* ===== Legend ===== */}
        <div className="flex w-full flex-col gap-3 px-2">
          {data.map((item) => {
            const { dotClass } = getStatusConfig(item.key);

            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn("size-3 shrink-0 rounded-full", dotClass)}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>

                <span className="text-sm font-medium tabular-nums text-foreground">
                  {t("item-value", { value: item.value })} (
                  {t("percentage", { percentage: item.value / total })})
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
