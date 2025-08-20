"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Download,
  AlertTriangle,
  CheckCircle,
  Calendar,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BusinessReport {
  dataset_summary: { rows: number; columns: number }
  churn_analysis: { churn_rate: string; churn_loss: string; key_segments: string[] }
  financial_projections: {
    current_revenue: string
    projected_revenue: { "3_months": string; "6_months": string; "12_months": string }
    remaining_profit: string
  }
  demand_forecasting: { trend: string; seasonal_spikes: string[] }
  scenario_analysis: { best_case: string; worst_case: string; most_likely: string }
  recommendations: string[]
}

interface BusinessReportDisplayProps {
  report: BusinessReport
  fileName: string
  onDownloadPDF: () => void
}

const COLORS = ["#0891b2", "#a16207", "#dc2626", "#16a34a", "#7c3aed"]

export function BusinessReportDisplay({ report, fileName, onDownloadPDF }: BusinessReportDisplayProps) {
  const revenueData = [
    {
      period: "Current",
      value: Number.parseFloat(report.financial_projections.current_revenue.replace(/[^0-9.-]/g, "")) || 0,
    },
    {
      period: "3 Months",
      value:
        Number.parseFloat(report.financial_projections.projected_revenue["3_months"].replace(/[^0-9.-]/g, "")) || 0,
    },
    {
      period: "6 Months",
      value:
        Number.parseFloat(report.financial_projections.projected_revenue["6_months"].replace(/[^0-9.-]/g, "")) || 0,
    },
    {
      period: "12 Months",
      value:
        Number.parseFloat(report.financial_projections.projected_revenue["12_months"].replace(/[^0-9.-]/g, "")) || 0,
    },
  ]

  const scenarioData = [
    { name: "Best Case", value: Number.parseFloat(report.scenario_analysis.best_case.replace(/[^0-9.-]/g, "")) || 0 },
    {
      name: "Most Likely",
      value: Number.parseFloat(report.scenario_analysis.most_likely.replace(/[^0-9.-]/g, "")) || 0,
    },
    { name: "Worst Case", value: Number.parseFloat(report.scenario_analysis.worst_case.replace(/[^0-9.-]/g, "")) || 0 },
  ]

  const churnRate = Number.parseFloat(report.churn_analysis.churn_rate.replace("%", "")) || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Business Analysis Report</h2>
          <p className="text-muted-foreground">Generated from {fileName}</p>
        </div>
        <Button onClick={onDownloadPDF} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{report.dataset_summary.rows.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{report.dataset_summary.columns}</div>
              <div className="text-sm text-muted-foreground">Data Fields</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{report.churn_analysis.churn_rate}</div>
              <div className="text-sm text-muted-foreground">Churn Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{report.financial_projections.current_revenue}</div>
              <div className="text-sm text-muted-foreground">Current Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Churn Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Churn Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Churn Rate</span>
                    <span className="text-sm text-muted-foreground">{report.churn_analysis.churn_rate}</span>
                  </div>
                  <Progress value={churnRate} className="h-2" />
                </div>
                <div>
                  <span className="text-sm font-medium">Estimated Loss: </span>
                  <span className="text-lg font-bold text-destructive">{report.churn_analysis.churn_loss}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">High-Risk Segments</h4>
              <div className="space-y-2">
                {report.churn_analysis.key_segments.map((segment, index) => (
                  <Badge key={index} variant="destructive" className="mr-2">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {segment}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Financial Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">Revenue Forecast</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="value" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium">Current Revenue: </span>
                <span className="text-lg font-bold">{report.financial_projections.current_revenue}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Remaining Profit: </span>
                <span className="text-lg font-bold text-primary">{report.financial_projections.remaining_profit}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">3 Months:</span>
                  <span className="font-medium">{report.financial_projections.projected_revenue["3_months"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">6 Months:</span>
                  <span className="font-medium">{report.financial_projections.projected_revenue["6_months"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">12 Months:</span>
                  <span className="font-medium">{report.financial_projections.projected_revenue["12_months"]}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demand Forecasting & Scenario Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Demand Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Trend:</span>
                <Badge
                  variant={
                    report.demand_forecasting.trend === "increasing"
                      ? "default"
                      : report.demand_forecasting.trend === "decreasing"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {report.demand_forecasting.trend === "increasing" && <TrendingUp className="w-3 h-3 mr-1" />}
                  {report.demand_forecasting.trend === "decreasing" && <TrendingDown className="w-3 h-3 mr-1" />}
                  {report.demand_forecasting.trend}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Seasonal Spikes</h4>
                <div className="flex gap-2">
                  {report.demand_forecasting.seasonal_spikes.map((spike, index) => (
                    <Badge key={index} variant="outline">
                      <Calendar className="w-3 h-3 mr-1" />
                      {spike}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Scenario Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={scenarioData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="value" fill="#0891b2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
