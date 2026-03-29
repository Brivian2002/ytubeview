import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ytubeview - YouTube Intelligence, Analytics & Growth Platform",
  description:
    "Unlock YouTube growth intelligence with advanced analytics, SEO tools, trending insights, and revenue optimization. The all-in-one platform for content creators.",
  keywords: [
    "YouTube analytics",
    "YouTube SEO",
    "YouTube growth",
    "channel analyzer",
    "video analytics",
    "thumbnail tools",
    "YouTube trending",
    "revenue calculator",
    "content creator tools",
  ],
  authors: [{ name: "Bright Dumashie" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Ytubeview - YouTube Intelligence Platform",
    description:
      "Advanced YouTube analytics, SEO optimization, and growth intelligence for content creators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
