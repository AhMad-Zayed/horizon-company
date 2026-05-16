import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/app/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Horizon Intelligent Technology | Enterprise Infrastructure",
  description: "Transforming enterprise infrastructure with sovereign IT solutions, high-end cybersecurity, robust wireless backhaul, and mission-critical communications since 2010.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} font-sans antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-white dark:bg-[#09090B] text-zinc-900 dark:text-zinc-300 relative selection:bg-red-500/30 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
