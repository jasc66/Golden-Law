import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { site } from "@/content";
import { locale, t } from "@/i18n";
import { consentScript, themeScript } from "@/lib/head-scripts";
import { JsonLd, legalServiceLd } from "@/lib/jsonld";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand.name} · ${site.brand.tagline}`, template: `%s · ${site.brand.name}` },
  description: site.brand.description,
  applicationName: site.brand.name,
  openGraph: { type: "website", locale: locale === "es" ? "es_CR" : "en_US", siteName: site.brand.name, url: "/" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121316" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ed" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning className={`${archivo.variable} ${instrument.variable} ${inter.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${themeScript};${consentScript}` }} />
      </head>
      <body>
        <a href="#contenido" className="label-mono fixed top-2 left-4 z-[100] -translate-y-24 bg-invert px-4 py-3 text-invert-fg focus:translate-y-0">
          {t.skip}
        </a>
        <JsonLd data={legalServiceLd()} />
        <Header />
        <main id="contenido" tabIndex={-1} className="focus:outline-none">{children}</main>
        <Footer />
        <MobileCallBar />
        <CookieBanner />
      </body>
    </html>
  );
}
