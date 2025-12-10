import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExamGuru AI - Unified Platform for Government Exam Guidance & Employment Support",
  description: "AI-powered platform for comprehensive government exam preparation, study materials, mock tests, and employment support. Achieve your dream government career with personalized guidance.",
  keywords: ["government exams", "exam preparation", "AI guidance", "employment support", "civil services", "banking exams", "railway exams", "career counseling"],
  authors: [{ name: "ExamGuru AI Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ExamGuru AI - Government Exam Success Platform",
    description: "AI-powered platform for government exam preparation and employment support",
    url: "https://examguru-ai.com",
    siteName: "ExamGuru AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamGuru AI - Government Exam Success Platform",
    description: "AI-powered platform for government exam preparation and employment support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
