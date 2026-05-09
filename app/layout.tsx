import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mohd Sheharyar | Gameplay Systems & Unreal Engine 5 Developer",
  description: "Cinematic portfolio of Mohd Sheharyar, Gameplay Systems Developer, VR Developer, and Unreal Engine 5 Developer. Showcasing AAA-quality projects and technical expertise.",
  keywords: ["Unreal Engine 5", "Gameplay Systems", "VR Developer", "Game Developer Portfolio", "C++", "Blueprint"],
  authors: [{ name: "Mohd Sheharyar" }],
  openGraph: {
    title: "Mohd Sheharyar | Game Developer Portfolio",
    description: "AAA-quality game developer portfolio showcasing Unreal Engine 5, VR, and gameplay systems work.",
    url: "https://mohdsheharyar.dev",
    siteName: "Mohd Sheharyar Portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
