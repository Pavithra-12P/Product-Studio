import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product Studio AI — Build Products Before Writing Code",
  description:
    "Transform product ideas into complete software blueprints. AI-powered requirements, architecture, database design, and deployment planning.",
  keywords: [
    "product development",
    "software architecture",
    "AI planning",
    "blueprint generation",
    "system design",
  ],
  openGraph: {
    title: "Product Studio AI",
    description: "Transform product ideas into complete software blueprints.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
