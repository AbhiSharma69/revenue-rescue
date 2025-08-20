"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BarChart3, ArrowLeft, HelpCircle, Upload, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
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
              <Link href="/chat" className="text-foreground hover:text-primary transition-colors">
                Chat
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/help" className="text-primary font-medium">
                Help
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            <Link href="/chat">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground">Everything you need to know about using DataChat AI</p>
        </div>

        {/* Quick Start Guide */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-primary" />
            Quick Start Guide
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload Your CSV</h3>
              <p className="text-sm text-muted-foreground">
                Click the upload area or drag and drop your CSV file. Files up to 10MB are supported.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="font-semibold mb-2">Ask Questions</h3>
              <p className="text-sm text-muted-foreground">
                Type your questions in plain English. No technical knowledge required.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Insights</h3>
              <p className="text-sm text-muted-foreground">
                Receive detailed analysis and actionable insights instantly.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I upload a CSV file?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Simply go to the Chat page and either click the upload area or drag and drop your CSV file directly
                  onto it. The file will be automatically parsed and analyzed. Make sure your file is under 10MB and in
                  standard CSV format with headers in the first row.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What's the file size limit?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Currently, we support CSV files up to 10MB in size. For optimal performance and to stay within free
                  tier limits, we analyze the first 5-10 rows of your data along with the complete schema. This provides
                  sufficient context for most analysis while keeping response times fast.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does Gemini AI work with my data?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We use Google's Gemini AI to analyze your data. When you ask a question, we send the data schema, row
                  count, and a sample of your data (first 5-10 rows) to Gemini along with your question. The AI then
                  provides insights based on this information. Your full dataset never leaves your browser - only the
                  sample data is sent for analysis.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is my data secure and private?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes! Your data security is our priority. Your CSV files are processed locally in your browser and only
                  sample data (first few rows) is sent to our AI service for analysis. We don't store your data on our
                  servers. Chat history is saved locally in your browser's storage and can be cleared at any time.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What types of questions can I ask?</AccordionTrigger>
              <AccordionContent>
                <div className="text-muted-foreground space-y-2">
                  <p>You can ask various types of questions about your data:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Summary statistics: "What's the average sales amount?"</li>
                    <li>Comparisons: "Which product had the highest revenue?"</li>
                    <li>Trends: "How did sales change over time?"</li>
                    <li>Filtering: "Show me all customers from California"</li>
                    <li>Relationships: "Is there a correlation between price and sales?"</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I export my chat history?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes! You can export your entire chat conversation as a text file. Just click the "Export" button in
                  the chat management section. This creates a downloadable file with all your questions and the AI's
                  responses, including timestamps.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>What CSV format should I use?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Use standard CSV format with column headers in the first row. Make sure your data is clean and
                  properly formatted. Avoid special characters in headers and ensure consistent data types in each
                  column. The AI works best with well-structured data that has clear, descriptive column names.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Example Questions */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            Example Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-3">Sales Data</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• "Which product had the highest sales last month?"</li>
                <li>• "What's the total revenue by region?"</li>
                <li>• "Show me the top 5 customers by purchase amount"</li>
                <li>• "How did sales trend over the past quarter?"</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">General Analysis</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• "What are the average values in each column?"</li>
                <li>• "Are there any missing values in the data?"</li>
                <li>• "Which category appears most frequently?"</li>
                <li>• "Compare expenses across different departments"</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Still Need Help */}
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
