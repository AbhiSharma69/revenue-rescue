"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Upload, MessageSquare, BarChart3, Zap, CheckCircle, Users, Building, Rocket } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group">
              <BarChart3 className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xl font-serif font-bold">DataChat AI</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/chat"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                Chat
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/help"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                Help
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            <Link href="/chat">
              <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 animate-in fade-in duration-1000">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 px-4 py-2 animate-in slide-in-from-top duration-700 delay-200">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Data Analysis
          </Badge>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-in slide-in-from-bottom duration-700 delay-300">
            Chat with Your CSV Data
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-in slide-in-from-bottom duration-700 delay-500">
            Transform complex spreadsheets into simple conversations. Upload your CSV files and get instant insights
            through natural language queries powered by advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom duration-700 delay-700">
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                Upload CSV & Start Chatting
                <Upload className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-muted/50"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in slide-in-from-left duration-700">
              <h2 className="text-3xl font-serif font-bold mb-6">The Problem</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Data is everywhere, but understanding it shouldn't require a PhD in statistics. Most people struggle
                with complex spreadsheets, formulas, and data analysis tools.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2">
                  <CheckCircle className="w-5 h-5 text-destructive" />
                  <span>Complex formulas and pivot tables</span>
                </li>
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2">
                  <CheckCircle className="w-5 h-5 text-destructive" />
                  <span>Time-consuming data analysis</span>
                </li>
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2">
                  <CheckCircle className="w-5 h-5 text-destructive" />
                  <span>Steep learning curve for tools</span>
                </li>
              </ul>
            </div>
            <div className="animate-in slide-in-from-right duration-700">
              <h2 className="text-3xl font-serif font-bold mb-6">Our Solution</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Simply ask questions in plain English and get instant, accurate insights from your data. No formulas, no
                complex tools - just conversation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Natural language queries</span>
                </li>
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Instant AI-powered insights</span>
                </li>
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>No technical expertise required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in duration-700">
            <h2 className="text-4xl font-serif font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to unlock insights from your data</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-in slide-in-from-bottom duration-700 delay-100">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg font-semibold mb-2">Easy Upload</h3>
              <p className="text-muted-foreground text-sm">
                Drag and drop your CSV files. Supports files up to 10MB with instant parsing.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-in slide-in-from-bottom duration-700 delay-200">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg font-semibold mb-2">Natural Chat</h3>
              <p className="text-muted-foreground text-sm">
                Ask questions like you would to a human analyst. No SQL or formulas needed.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-in slide-in-from-bottom duration-700 delay-300">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg font-semibold mb-2">Smart Analysis</h3>
              <p className="text-muted-foreground text-sm">
                AI understands your data structure and provides contextual insights.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-in slide-in-from-bottom duration-700 delay-400">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground text-sm">
                Get answers in seconds, not hours. Real-time processing and responses.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-in fade-in duration-700">
            <h2 className="text-4xl font-serif font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get insights from your data in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-100 group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-muted-foreground">
                Drop your CSV file and we'll instantly analyze its structure and content.
              </p>
            </div>
            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-200 group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask</h3>
              <p className="text-muted-foreground">
                Type your questions in plain English - no technical knowledge required.
              </p>
            </div>
            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-300 group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-muted-foreground">
                Receive detailed analysis, trends, and actionable insights instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in duration-700">
            <h2 className="text-4xl font-serif font-bold mb-4">Perfect For Everyone</h2>
            <p className="text-lg text-muted-foreground">From small vendors to enterprise teams</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-in slide-in-from-left duration-700 delay-100">
              <Users className="w-16 h-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-2xl font-semibold mb-4">Small Vendors</h3>
              <p className="text-muted-foreground mb-4">
                Track sales, inventory, and customer trends without complex tools.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="transition-all duration-300 hover:translate-x-2">• Sales performance analysis</li>
                <li className="transition-all duration-300 hover:translate-x-2">• Customer behavior insights</li>
                <li className="transition-all duration-300 hover:translate-x-2">• Inventory optimization</li>
              </ul>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-in slide-in-from-bottom duration-700 delay-200">
              <Rocket className="w-16 h-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-2xl font-semibold mb-4">Startups</h3>
              <p className="text-muted-foreground mb-4">Make data-driven decisions without hiring a data team.</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="transition-all duration-300 hover:translate-x-2">• User engagement metrics</li>
                <li className="transition-all duration-300 hover:translate-x-2">• Growth trend analysis</li>
                <li className="transition-all duration-300 hover:translate-x-2">• Market research insights</li>
              </ul>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-in slide-in-from-right duration-700 delay-300">
              <Building className="w-16 h-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-2xl font-semibold mb-4">Enterprises</h3>
              <p className="text-muted-foreground mb-4">Democratize data access across all departments and teams.</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="transition-all duration-300 hover:translate-x-2">• Department performance</li>
                <li className="transition-all duration-300 hover:translate-x-2">• Financial analysis</li>
                <li className="transition-all duration-300 hover:translate-x-2">• Operational efficiency</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in duration-700">
            <h2 className="text-4xl font-serif font-bold mb-6">The Future of Data Analysis</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're building the next generation of data interaction tools
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 animate-in slide-in-from-left duration-700 delay-100 hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Interactive Charts</h3>
              <p className="text-muted-foreground text-sm">Dynamic visualizations that update as you ask questions</p>
            </div>
            <div className="p-6 animate-in slide-in-from-bottom duration-700 delay-200 hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground text-sm">Predictive modeling and machine learning insights</p>
            </div>
            <div className="p-6 animate-in slide-in-from-right duration-700 delay-300 hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Enterprise Integration</h3>
              <p className="text-muted-foreground text-sm">Connect with databases, APIs, and business tools</p>
            </div>
          </div>
          <div className="animate-in slide-in-from-bottom duration-700 delay-500">
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Start Your Data Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-in slide-in-from-left duration-700">
              <div className="flex items-center gap-2 mb-4 group">
                <BarChart3 className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-lg font-serif font-bold">DataChat AI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making data analysis accessible to everyone through the power of conversation.
              </p>
            </div>
            <div className="animate-in slide-in-from-bottom duration-700 delay-100">
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/chat"
                    className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    Chat Interface
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-in slide-in-from-bottom duration-700 delay-200">
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-in slide-in-from-right duration-700 delay-300">
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block hover:scale-105"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block hover:scale-105"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block hover:scale-105"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground animate-in fade-in duration-700 delay-700">
            <p>&copy; 2024 DataChat AI. All rights reserved. Built with ❤️ for data enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
