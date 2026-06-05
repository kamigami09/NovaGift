import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import {
  siteMetadata,
  siteViewport,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
  generateItemListSchema
} from "@/lib/seo";
import { products } from "@/data/products";
import { OrderProvider } from "@/context/OrderContext";
import OrderFloatingPanel from "@/components/OrderFloatingPanel";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import EmailButton from "@/components/EmailButton";

// Load Google Fonts for premium design aesthetics
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  ...siteMetadata,
  metadataBase: new URL("https://novagift.me")
};
export const viewport: Viewport = siteViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate catalog item list schema
  const itemListSchema = generateItemListSchema(products);

  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Geo Meta Tags for local SEO Casablanca/Morocco */}
        <meta name="geo.region" content="MA-CAS" />
        <meta name="geo.placename" content="Casablanca, Morocco" />
        <meta name="geo.position" content="33.5731;-7.5898" />
        <meta name="ICBM" content="33.5731, -7.5898" />

        {/* JSON-LD Structured Data Schema Blocks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black font-body">
        <OrderProvider>
          <Navbar />
          {children}
          <OrderFloatingPanel />
          <WhatsAppButton isShifted={false} />
          <EmailButton isShifted={false} />
        </OrderProvider>
      </body>
    </html>
  );
}
