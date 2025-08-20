import { type NextRequest, NextResponse } from "next/server"

interface CSVData {
  schema: string[]
  rowCount: number
  sample: any[]
  fileName: string
}

interface Message {
  type: "user" | "bot"
  message: string
  timestamp: Date
}

interface ChatRequest {
  message: string
  csvData: CSVData | null
  chatHistory: Message[]
}

function sanitizeOutput(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const { message, csvData, chatHistory }: ChatRequest = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const systemInstruction = `You are a professional business data analyst and AI assistant. Your role is to:

1. Analyze CSV business data (sales, customers, revenue, expenses, churn, etc.)
2. Provide clear, actionable insights in simple language
3. Suggest specific business strategies and recommendations
4. Identify trends, patterns, and opportunities in the data
5. Offer quantitative analysis with numbers and percentages when possible

Always be professional, accurate, and focus on business value. If asked about generating reports, mention that comprehensive business reports can be generated separately.

Key areas to focus on:
- Revenue and profit analysis
- Customer behavior and churn patterns
- Sales performance and trends
- Cost optimization opportunities
- Growth forecasting and predictions
- Risk assessment and mitigation`

    let csvContext = ""
    if (csvData) {
      csvContext = `
BUSINESS DATASET CONTEXT:
- File: ${csvData.fileName}
- Total Records: ${csvData.rowCount}
- Data Fields (${csvData.schema.length}): ${csvData.schema.join(", ")}

Sample Business Data (${csvData.sample.length} rows analyzed):
${csvData.sample.map((row, index) => `Record ${index + 1}: ${JSON.stringify(row)}`).join("\n")}

ANALYSIS SCOPE: This analysis covers ${csvData.sample.length} sample records from a total dataset of ${csvData.rowCount} records. Insights are extrapolated to represent the full dataset where applicable.`
    } else {
      csvContext =
        "No business data uploaded yet. Please upload a CSV file containing your business data (sales, customers, revenue, etc.) to begin analysis."
    }

    // Limit to last 10 messages to manage token usage while maintaining context
    const recentHistory = chatHistory.slice(-10).filter((msg) => msg.type === "user" || msg.type === "bot")
    const historyContext =
      recentHistory.length > 0
        ? `\nRecent conversation:\n${recentHistory
            .map((msg) => `${msg.type === "user" ? "User" : "Assistant"}: ${msg.message}`)
            .join("\n")}\n`
        : ""

    // Construct the full prompt
    const fullPrompt = `${systemInstruction}

${csvContext}
${historyContext}

Current user question: ${message}

Please provide a helpful, clear response based on the available data. If the question requires analysis of specific data that isn't in the sample, mention that the analysis is limited to the sample data shown.`

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDMaMEBq6Y3P68jSiVHq2Be8x8seI9AT8k",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Gemini API Error:", response.status, errorData)

      if (response.status === 429) {
        return NextResponse.json({ error: "AI service quota exceeded. Please try again later." }, { status: 429 })
      }
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json({ error: "AI service configuration error. Please check API key." }, { status: 500 })
      }

      return NextResponse.json({ error: "Failed to get response from AI service." }, { status: 500 })
    }

    const data = await response.json()
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."

    text = sanitizeOutput(text)

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Chat API Error:", error)

    // Handle specific API errors
    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        return NextResponse.json(
          { error: "Network error. Please check your connection and try again." },
          { status: 500 },
        )
      }
    }

    return NextResponse.json({ error: "Failed to process your request. Please try again." }, { status: 500 })
  }
}
