"use client"

import { useState, useEffect } from "react"
import { FileUpload } from "@/components/file-upload"
import { ChatInterface } from "@/components/chat-interface"
import { DashboardOverview } from "@/components/dashboard-overview"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, MessageSquare, Upload, Zap, Trash2, Download, ArrowLeft, LayoutDashboard } from "lucide-react"
import Link from "next/link"

interface CSVData {
  schema: string[]
  rowCount: number
  sample: any[]
  fileName: string
}

interface Message {
  type: "user" | "bot" | "report"
  message: string
  timestamp: Date
  report?: any
}

export default function ChatPage() {
  const [csvData, setCsvData] = useState<CSVData | null>(null)
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      type: "bot",
      message:
        "👋 Hi! I'm your Data Assistant. Upload a CSV file and ask me questions like 'Which product had the highest sales last month?' or 'Compare expenses across regions.' I'll analyze and give you real-time insights.",
      timestamp: new Date(),
    },
  ])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleFileUpload = (data: CSVData) => {
    setCsvData(data)
    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        message: `Great! I've analyzed your CSV file "${data.fileName}". It has ${data.rowCount} rows and ${data.schema.length} columns: ${data.schema.join(", ")}. What would you like to know about your data?`,
        timestamp: new Date(),
      },
    ])
    setActiveTab("chat") // Switch to chat tab after upload
  }

  const handleClearChat = () => {
    const initialMessage: Message = {
      type: "bot",
      message:
        "👋 Hi! I'm your Data Assistant. Upload a CSV file and ask me questions like 'Which product had the highest sales last month?' or 'Compare expenses across regions.' I'll analyze and give you real-time insights.",
      timestamp: new Date(),
    }
    setChatHistory([initialMessage])
    localStorage.removeItem("chat-csv-history")
  }

  const handleExportChat = () => {
    const chatText = chatHistory
      .map((msg) => {
        const time = msg.timestamp.toLocaleString()
        const sender = msg.type === "user" ? "You" : "Data Assistant"
        return `[${time}] ${sender}: ${msg.message}`
      })
      .join("\n\n")

    const blob = new Blob([chatText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-history-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleGenerateReport = async () => {
    if (!csvData) return

    setIsGeneratingReport(true)
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate report")
      }

      const { report } = await response.json()

      setChatHistory((prev) => [
        ...prev,
        {
          type: "report",
          message: "📊 Comprehensive Business Report Generated",
          timestamp: new Date(),
          report,
        },
      ])

      setActiveTab("chat")
    } catch (error) {
      console.error("Report generation error:", error)
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: "❌ Sorry, I couldn't generate the report. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const reportsGenerated = chatHistory.filter((msg) => msg.type === "report").length
  const messagesCount = chatHistory.filter((msg) => msg.type === "user").length

  useEffect(() => {
    // Load chat history from localStorage on component mount
    const savedHistory = localStorage.getItem("chat-csv-history")
    const savedCsvData = localStorage.getItem("chat-csv-data")

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setChatHistory(parsedHistory)
      } catch (error) {
        console.error("Failed to load chat history:", error)
      }
    }

    if (savedCsvData) {
      try {
        setCsvData(JSON.parse(savedCsvData))
      } catch (error) {
        console.error("Failed to load CSV data:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("chat-csv-history", JSON.stringify(chatHistory))
  }, [chatHistory])

  useEffect(() => {
    if (csvData) {
      localStorage.setItem("chat-csv-data", JSON.stringify(csvData))
    }
  }, [csvData])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                <span className="text-lg font-serif font-bold">DataChat AI</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/help" className="text-foreground hover:text-primary transition-colors">
                Help
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Business Analysis Dashboard</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Upload your CSV and get comprehensive business insights with AI-powered analysis
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Easy Upload
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <LayoutDashboard className="w-3 h-3" />
              Live Dashboard
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Natural Chat
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
              Smart Analysis
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Instant Reports
            </Badge>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Data
              </h2>
              <FileUpload onFileUpload={handleFileUpload} />

              {csvData && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h3 className="font-medium text-sm mb-2">File Info:</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      <strong>Name:</strong> {csvData.fileName}
                    </p>
                    <p>
                      <strong>Rows:</strong> {csvData.rowCount.toLocaleString()}
                    </p>
                    <p>
                      <strong>Columns:</strong> {csvData.schema.length}
                    </p>
                    <p>
                      <strong>Fields:</strong> {csvData.schema.slice(0, 3).join(", ")}
                      {csvData.schema.length > 3 ? "..." : ""}
                    </p>
                  </div>
                  <Button
                    onClick={handleGenerateReport}
                    disabled={isGeneratingReport}
                    className="w-full mt-3"
                    size="sm"
                  >
                    {isGeneratingReport ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-3 h-3 mr-2" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </div>
              )}

              {chatHistory.length > 1 && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-sm">Management:</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearChat}
                      className="flex-1 text-xs bg-transparent"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportChat}
                      className="flex-1 text-xs bg-transparent"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {reportsGenerated} reports • {messagesCount} messages
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <DashboardOverview
                  csvData={csvData}
                  reportsGenerated={reportsGenerated}
                  messagesCount={messagesCount}
                />
              </TabsContent>

              <TabsContent value="chat" className="space-y-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    AI Data Assistant
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ask questions about your data in natural language and generate comprehensive business reports
                  </p>
                </div>
                <ChatInterface chatHistory={chatHistory} setChatHistory={setChatHistory} csvData={csvData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Powered by AI • Secure data processing • Advanced business analytics • PDF reports</p>
        </div>
      </div>
    </div>
  )
}
