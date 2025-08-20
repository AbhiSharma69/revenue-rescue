"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, ArrowLeft, Users, Target, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
              <Link href="/about" className="text-primary font-medium">
                About
              </Link>
              <Link href="/help" className="text-foreground hover:text-primary transition-colors">
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
          <h1 className="text-4xl font-serif font-bold mb-4">About DataChat AI</h1>
          <p className="text-lg text-muted-foreground">
            Making data analysis accessible to everyone through the power of conversation
          </p>
        </div>

        {/* Mission */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Our Mission</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that everyone should be able to understand and analyze their data, regardless of technical
            expertise. DataChat AI bridges the gap between complex data analysis tools and everyday users by enabling
            natural language conversations with CSV data. Our mission is to democratize data insights and empower
            decision-making at every level.
          </p>
        </Card>

        {/* Vision */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Our Vision</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We envision a future where data analysis is as simple as having a conversation. Where small business owners
            can understand their sales trends, researchers can quickly explore datasets, and teams can make data-driven
            decisions without needing specialized training. Through AI-powered natural language processing, we're making
            this vision a reality.
          </p>
        </Card>

        {/* Team */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Our Story</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              DataChat AI was born from a simple observation: most people struggle with data analysis tools, yet
              everyone has valuable data they need to understand. Whether it's sales figures, survey responses, or
              operational metrics, the insights are there - they're just locked behind complex interfaces and technical
              barriers.
            </p>
            <p>
              As a hackathon project, we set out to solve this problem by combining the power of modern AI with
              intuitive conversational interfaces. What started as a weekend experiment has grown into a platform that
              serves users from small vendors to enterprise teams.
            </p>
            <p>
              Today, we're proud to offer a solution that makes data analysis as natural as asking a question. Our users
              can upload their CSV files and immediately start getting insights without learning complex formulas or
              navigating complicated dashboards.
            </p>
          </div>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Accessibility</h3>
            <p className="text-muted-foreground text-sm">
              Data analysis should be available to everyone, not just data scientists and analysts.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Simplicity</h3>
            <p className="text-muted-foreground text-sm">
              Complex problems deserve simple solutions. We focus on intuitive, user-friendly experiences.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Innovation</h3>
            <p className="text-muted-foreground text-sm">
              We leverage cutting-edge AI technology to push the boundaries of what's possible.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Ready to Transform Your Data Analysis?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of users who are already getting insights from their data through conversation.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Chatting with Your Data
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
