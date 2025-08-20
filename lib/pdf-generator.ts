import jsPDF from "jspdf"

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

export function generateBusinessReportPDF(report: BusinessReport): void {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // PDF styling constants
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  pdf.setFillColor(8, 145, 178) // Primary color
  pdf.rect(0, 0, pageWidth, 30, "F")

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(24)
  pdf.setFont("helvetica", "bold")
  pdf.text("Business Analysis Report", margin, 20)

  pdf.setFontSize(12)
  pdf.setFont("helvetica", "normal")
  pdf.text(`Generated: ${new Date(report.generatedAt).toLocaleDateString()}`, pageWidth - margin - 60, 20)

  yPosition = 45

  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.text("Dataset Information", margin, yPosition)
  yPosition += 10

  pdf.setFontSize(11)
  pdf.setFont("helvetica", "normal")
  pdf.text(`File: ${report.fileName}`, margin, yPosition)
  yPosition += 8
  pdf.text(`Report Generated: ${new Date(report.generatedAt).toLocaleString()}`, margin, yPosition)
  yPosition += 15

  const addSection = (title: string, content: string, isRecommendations = false) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      pdf.addPage()
      yPosition = margin
    }

    // Section header
    pdf.setFillColor(248, 250, 252) // Light gray background
    pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F")

    pdf.setTextColor(8, 145, 178) // Primary color
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text(title, margin, yPosition + 3)
    yPosition += 15

    // Section content
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")

    // Split content into lines that fit the page width
    const lines = pdf.splitTextToSize(content, contentWidth)

    for (const line of lines) {
      if (yPosition > pageHeight - 20) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += 5
    }

    yPosition += 10

    if (isRecommendations) {
      pdf.setFillColor(161, 98, 7, 0.1) // Secondary color with transparency
      pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 25, "F")

      pdf.setTextColor(161, 98, 7) // Secondary color
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text("Priority Actions:", margin, yPosition + 3)
      yPosition += 8

      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(9)
      pdf.setFont("helvetica", "normal")
      pdf.text("• Implement customer retention strategies", margin + 5, yPosition)
      yPosition += 5
      pdf.text("• Optimize pricing and revenue models", margin + 5, yPosition)
      yPosition += 5
      pdf.text("• Enhance demand forecasting accuracy", margin + 5, yPosition)
      yPosition += 15
    }
  }

  addSection("Executive Summary", report.summary.content)
  addSection("Churn Analysis", report.churnAnalysis.content)
  addSection("Financial Projections", report.financialProjections.content)
  addSection("Demand Forecasting", report.demandForecasting.content)
  addSection("Scenario Analysis", report.scenarioAnalysis.content)
  addSection("Strategic Recommendations", report.recommendations.content, true)

  const pageCount = pdf.internal.pages.length - 1
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)

    // Footer line
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15)

    // Footer text
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(8)
    pdf.setFont("helvetica", "normal")
    pdf.text("DataChat AI - Business Analysis Report", margin, pageHeight - 8)
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, pageHeight - 8)
  }

  const fileName = `business-report-${report.fileName.replace(/\.[^/.]+$/, "")}-${new Date().toISOString().split("T")[0]}.pdf`
  pdf.save(fileName)
}

export function extractKeyMetrics(content: string): Array<{ label: string; value: string }> {
  const metrics = []

  // Extract percentages
  const percentageMatches = content.match(/(\d+(?:\.\d+)?%)/g) || []
  percentageMatches.slice(0, 3).forEach((match, index) => {
    const labels = ["Growth Rate", "Retention Rate", "Conversion Rate"]
    metrics.push({
      label: labels[index] || `Metric ${index + 1}`,
      value: match,
    })
  })

  // Extract dollar amounts
  const dollarMatches = content.match(/\$[\d,]+(?:\.\d{2})?/g) || []
  dollarMatches.slice(0, 2).forEach((match, index) => {
    const labels = ["Revenue Impact", "Cost Savings"]
    metrics.push({
      label: labels[index] || `Amount ${index + 1}`,
      value: match,
    })
  })

  return metrics
}
