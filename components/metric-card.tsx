"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string | number
  trend?: "up" | "down"
  className?: string
  style?: React.CSSProperties
}

export function MetricCard({ label, value, trend, className, style }: MetricCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-all duration-300 hover:scale-105", className)} style={style}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-lg font-bold text-foreground">{value}</p>
          </div>
          {trend && (
            <div
              className={cn(
                "p-1 rounded-full",
                trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
              )}
            >
              {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
