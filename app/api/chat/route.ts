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

export async function POST(request: NextRequest) {
  try {
    const { message, csvData, chatHistory }: ChatRequest = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const systemInstruction = `You are a helpful data analyst chatbot. Your job is to analyze CSV data provided by the user and answer questions in simple, clear, and actionable insights. Always use the dataset schema, row count, and sample rows given. If data is missing, explain that clearly. Suggest possible visualizations where relevant.`

    // Build context from CSV data
    let csvContext = ""
    if (csvData) {
      csvContext = `
Dataset Information:
- File: ${csvData.fileName}
- Total Rows: ${csvData.rowCount}
- Columns (${csvData.schema.length}): ${csvData.schema.join(", ")}

Sample Data (first ${csvData.sample.length} rows):
${csvData.sample.map((row, index) => `Row ${index + 1}: ${JSON.stringify(row)}`).join("\n")}

Note: This analysis is based on a sample of ${csvData.sample.length} rows from the full dataset of ${csvData.rowCount} rows due to processing limitations.
`
    } else {
      csvContext = "No CSV data has been uploaded yet. Please ask the user to upload a CSV file first."
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
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."

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
