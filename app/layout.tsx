import type { Metadata, Viewport } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Dark Experience",
  description: "Tailwind CSS dark theme with neon accents",
  openGraph: {
    title: "Premium Dark Experience",
    description: "Tailwind CSS dark theme with neon accents",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script>
          {`
            if (localStorage.getItem('analytics-consent') === 'true') {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            }
          `}
        </script>
      </head>
      <body
        className={`${oswald.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `,
            backgroundAttachment: "fixed",
          }}
          aria-hidden="true"
        />
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
