"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, DollarSign, BarChart3, FileText, Clock, CheckCircle } from "lucide-react"
import { BusinessChart } from "./business-chart"

interface CSVData {
  schema: string[]
  rowCount: number
  sample: any[]
  fileName: string
}

interface DashboardOverviewProps {
  csvData: CSVData | null
  reportsGenerated: number
  messagesCount: number
}

export function DashboardOverview({ csvData, reportsGenerated, messagesCount }: DashboardOverviewProps) {
  const generateMockMetrics = () => {
    if (!csvData) return null

    const hasRevenueData = csvData.schema.some(
      (col) =>
        col.toLowerCase().includes("revenue") ||
        col.toLowerCase().includes("sales") ||
        col.toLowerCase().includes("amount"),
    )

    const hasCustomerData = csvData.schema.some(
      (col) =>
        col.toLowerCase().includes("customer") ||
        col.toLowerCase().includes("user") ||
        col.toLowerCase().includes("client"),
    )

    return {
      totalRevenue: hasRevenueData ? "$" + (Math.random() * 500000 + 100000).toFixed(0) : "N/A",
      growthRate: hasRevenueData ? (Math.random() * 20 + 5).toFixed(1) + "%" : "N/A",
      customerCount: hasCustomerData ? Math.floor(Math.random() * 5000 + 1000) : csvData.rowCount,
      churnRate: hasCustomerData ? (Math.random() * 15 + 5).toFixed(1) + "%" : "N/A",
      dataHealth: Math.floor((csvData.rowCount / (csvData.rowCount + 100)) * 100),
    }
  }

  const metrics = generateMockMetrics()

  if (!csvData) {
    return (
      <Card className="col-span-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Data Uploaded</h3>
          <p className="text-muted-foreground text-center">
            Upload a CSV file to see your business analytics dashboard with key metrics and insights.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Revenue</p>
                <p className="text-lg font-bold text-foreground">{metrics?.totalRevenue}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+{metrics?.growthRate} growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Customers</p>
                <p className="text-lg font-bold text-foreground">{metrics?.customerCount.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-xs text-red-600 font-medium">{metrics?.churnRate} churn</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Data Health</p>
                <p className="text-lg font-bold text-foreground">{metrics?.dataHealth}%</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
            </div>
            <Progress value={metrics?.dataHealth} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Reports</p>
                <p className="text-lg font-bold text-foreground">{reportsGenerated}</p>
              </div>
              <div className="p-2 bg-secondary/10 rounded-full">
                <FileText className="w-4 h-4 text-secondary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-xs text-muted-foreground">{messagesCount} messages</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Dataset Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">File Name</span>
                <Badge variant="outline">{csvData.fileName}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Rows</span>
                <span className="font-medium">{csvData.rowCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Columns</span>
                <span className="font-medium">{csvData.schema.length}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Key Fields:</p>
                <div className="flex flex-wrap gap-1">
                  {csvData.schema.slice(0, 6).map((field, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                  {csvData.schema.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{csvData.schema.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              Analysis Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Data uploaded</p>
                  <p className="text-xs text-muted-foreground">Ready for analysis</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Chat messages</p>
                  <p className="text-xs text-muted-foreground">{messagesCount} interactions</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {messagesCount}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${reportsGenerated > 0 ? "bg-green-500" : "bg-gray-300"}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Reports generated</p>
                  <p className="text-xs text-muted-foreground">Business analysis reports</p>
                </div>
                <Badge variant={reportsGenerated > 0 ? "default" : "outline"} className="text-xs">
                  {reportsGenerated}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights Chart */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Quick Insights Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessChart
            title="Data Distribution Overview"
            type="bar"
            data={[
              { category: "Records", value: Math.min(csvData.rowCount, 10000), color: "#0891b2" },
              { category: "Fields", value: csvData.schema.length * 100, color: "#a16207" },
              { category: "Sample", value: csvData.sample.length * 50, color: "#10b981" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
