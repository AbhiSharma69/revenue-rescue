"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BarChart3, ArrowLeft, Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
              <Link href="/help" className="text-foreground hover:text-primary transition-colors">
                Help
              </Link>
              <Link href="/contact" className="text-primary font-medium">
                Contact
              </Link>
            </div>
            <Link href="/chat">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Send us a Message
            </h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-primary font-medium">Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 min-h-[120px]"
                  placeholder="Tell us about your question, feedback, or how we can help..."
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Company Info */}
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-muted-foreground">support@datachat-ai.com</p>
                    <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-muted-foreground">24-48 hours</p>
                    <p className="text-sm text-muted-foreground">Monday to Friday, 9 AM - 6 PM PST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                    <p className="text-sm text-muted-foreground">Serving users worldwide</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Technical Issues</h4>
                  <p className="text-sm text-muted-foreground">
                    Having trouble uploading files or getting responses? Check our Help page first.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Feature Requests</h4>
                  <p className="text-sm text-muted-foreground">
                    We love hearing about new features you'd like to see. Send us your ideas!
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Business Inquiries</h4>
                  <p className="text-sm text-muted-foreground">
                    Interested in enterprise features or partnerships? Let's talk.
                  </p>
                </div>
              </div>
              <Link href="/help" className="inline-block mt-4">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Visit Help Center
                </Button>
              </Link>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  GitHub
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
