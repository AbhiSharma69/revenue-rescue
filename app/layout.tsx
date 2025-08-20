import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3, Playfair_Display } from "next/font/google"
import "./globals.css"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Chat with CSV - AI Data Assistant",
  description: "Upload CSV files and chat with your data using AI-powered insights",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  )
}
