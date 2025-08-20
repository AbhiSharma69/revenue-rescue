"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, DollarSign, AlertTriangle, CheckCircle, BarChart3, Download, Calendar } from "lucide-react"
import { MetricCard } from "./metric-card"
import { BusinessChart } from "./business-chart"
import { generateBusinessReportPDF } from "@/lib/pdf-generator"

interface ReportSection {
  title: string
  content: string
  metrics?: { [key: string]: string | number }
  recommendations?: string[]
}

interface BusinessReport {
  summary: ReportSection
  churnAnalysis: ReportSection
  financialProjections: ReportSection
  demandForecasting: ReportSection
  scenarioAnalysis: ReportSection
  recommendations: ReportSection
  generatedAt: string
  fileName: string
}

interface BusinessReportProps {
  report: BusinessReport
  onDownloadPDF?: () => void
}

export function BusinessReport({ report, onDownloadPDF }: BusinessReportProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleDownloadPDF = () => {
    try {
      generateBusinessReportPDF(report)
      // Optional: Show success toast
      console.log("[v0] PDF generated successfully")
    } catch (error) {
      console.error("[v0] PDF generation failed:", error)
      // Optional: Show error toast
    }
  }

  const extractMetrics = (content: string) => {
    const metrics = []
    const percentageMatches = content.match(/(\d+(?:\.\d+)?%)/g) || []
    const dollarMatches = content.match(/\$[\d,]+(?:\.\d{2})?/g) || []

    percentageMatches.slice(0, 2).forEach((match, index) => {
      metrics.push({
        label: index === 0 ? "Primary Rate" : "Secondary Rate",
        value: match,
        trend: Number.parseFloat(match) > 50 ? "up" : "down",
      })
    })

    dollarMatches.slice(0, 2).forEach((match, index) => {
      metrics.push({
        label: index === 0 ? "Revenue Impact" : "Cost Savings",
        value: match,
        trend: "up",
      })
    })

    return metrics
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Report Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-serif flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Business Analysis Report
              </CardTitle>
              <p className="text-muted-foreground mt-1">Comprehensive analysis for {report.fileName}</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(report.generatedAt)}
              </Badge>
              <Button
                onClick={onDownloadPDF || handleDownloadPDF}
                className="ml-2 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                size="sm"
              >
                <Download className="w-4 h-4 mr-1" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Executive Summary */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            {report.summary.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">{report.summary.content}</p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {extractMetrics(report.summary.content).map((metric, index) => (
              <MetricCard
                key={index}
                label={metric.label}
                value={metric.value}
                trend={metric.trend as "up" | "down"}
                className="animate-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <BusinessChart
          title="Revenue Trends"
          type="line"
          data={[
            { month: "Jan", value: 4000, projected: 4200 },
            { month: "Feb", value: 3000, projected: 3800 },
            { month: "Mar", value: 5000, projected: 5200 },
            { month: "Apr", value: 4500, projected: 4800 },
            { month: "May", value: 6000, projected: 6300 },
            { month: "Jun", value: 5500, projected: 5800 },
          ]}
        />

        <BusinessChart
          title="Scenario Analysis"
          type="bar"
          data={[
            { scenario: "Best Case", value: 85, color: "#10b981" },
            { scenario: "Most Likely", value: 65, color: "#3b82f6" },
            { scenario: "Worst Case", value: 35, color: "#ef4444" },
          ]}
        />
      </div>

      {/* Analysis Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Churn Analysis */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-destructive" />
              {report.churnAnalysis.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">{report.churnAnalysis.content}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Retention Rate</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Financial Projections */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              {report.financialProjections.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">{report.financialProjections.content}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+12% projected growth</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demand Forecasting & Scenario Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              {report.demandForecasting.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{report.demandForecasting.content}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              {report.scenarioAnalysis.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{report.scenarioAnalysis.content}</p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card className="border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-secondary" />
            {report.recommendations.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">{report.recommendations.content}</p>

          {/* Action Items */}
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Priority Actions:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-primary" />
                Implement customer retention strategies
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-primary" />
                Optimize pricing and revenue models
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-primary" />
                Enhance demand forecasting accuracy
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
