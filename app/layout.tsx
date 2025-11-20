import type { Metadata, Viewport } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
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
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/oswald-v49-latin-regular.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="" 
        />
        <link 
          rel="preload" 
          href="/fonts/inter-v13-latin-regular.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="" 
        />
        
        {/* Preload 3D models for hero section */}
        <link 
          rel="preload" 
          href="/models/hero-model.glb" 
          as="fetch" 
          crossOrigin="" 
          type="model/gltf-binary"
        />
        <link 
          rel="modulepreload" 
          href="/_next/static/chunks/three-[hash].js"
        />
        <link 
          rel="modulepreload" 
          href="/_next/static/chunks/framer-motion-[hash].js"
        />

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
        
        {/* Performance monitoring in development */}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      </body>
    </html>
  );
}
