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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://horizon-ss.com'),
  title: "Horizon ( Intelligent Technology / Smart Solutions )",
  description: "Elite turnkey IT engineering & security solutions in Palestine. Specializing in mission-critical networks, custom datacenters, corporate VoIP, and high-end CCTV infrastructure. حلول هندسية متكاملة، شبكات اتصالات حرجية، بنى تحتية متطورة لمراكز البيانات وأنظمة الرقابة الذكية والمنشآت السيادية.",
  keywords: [
    "Horizon Smart Solutions", "أفق الحلول الذكية", "Enterprise Infrastructure Palestine", "بنية تحتية للمنشآت",
    "Cybersecurity Ramallah", "الأمن السيبراني فلسطين", "VoIP Networks", "شبكات الاتصالات المؤسسية",
    "CCTV Automation", "أنظمة المراقبة الذكية", "Datacenters", "مراكز البيانات", "Sovereign Networks", "المعدات السيادية"
  ],
  icons: {
    icon: '/horizon-logo.png',
  },
  alternates: {
    canonical: 'https://horizon-ss.com',
    languages: {
      'en-US': 'https://horizon-ss.com',
      'ar-PS': 'https://horizon-ss.com',
    },
  },
  openGraph: {
    title: "Horizon ( Intelligent Technology / Smart Solutions )",
    description: "Elite turnkey IT engineering & security solutions in Palestine. حلول هندسية متكاملة، شبكات اتصالات حرجية، بنى تحتية متطورة لمراكز البيانات.",
    url: 'https://horizon-ss.com',
    siteName: 'Horizon Smart Solutions',
    images: [
      {
        url: '/media/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'Horizon Smart Solutions preview image',
      }
    ],
    locale: 'en_US',
    alternateLocale: ['ar_PS'],
    type: 'website',
  },
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
