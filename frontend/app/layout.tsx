import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex" });

export const metadata: Metadata = {
  title: "HireMe MCP — AI Agent Server for Hiring Djaouad Frih",
  description:
    "An MCP server that exposes Djaouad Frih's profile, shipped projects, pricing and a project-brief intake — so Claude, Cursor or ChatGPT can find him, vet him and hire him for you.",
  openGraph: {
    title: "HireMe MCP — AI Agent Server for Hiring Djaouad Frih",
    description:
      "Connect this MCP server to your AI assistant and let it vet the work, check pricing and file the project brief.",
    url: "https://mcp.djaouad.tech",
    siteName: "HireMe MCP",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${space.variable} ${plex.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
