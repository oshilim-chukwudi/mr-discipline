import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import MetaPixel from "../components/analytics/MetaPixel";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mr-discipline.vercel.app"
  ),
  title: "Mr. Discipline | Chukwudi Oshilim",
  description:
    "Mr. Discipline — the 14-day JumpStart program, 1-on-1 coaching, and no-nonsense discipline systems from Chukwudi Oshilim.",
  keywords: [
    "Mr. Discipline",
    "fitness coaching",
    "discipline coaching",
    "JumpStart program",
    "accountability coach",
    "1-on-1 coaching",
  ],
  authors: [{ name: "Chukwudi Oshilim" }],
  openGraph: {
    title: "Mr. Discipline | Chukwudi Oshilim",
    description:
      "The 14-day JumpStart program, 1-on-1 coaching, and no-nonsense discipline systems.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Discipline | Chukwudi Oshilim",
    description: "Discipline coaching, JumpStart program, and 1-on-1 calls.",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png?v=4", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png?v=4", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png?v=3",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mr-discipline.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mr. Discipline",
    url: siteUrl,
    image: `${siteUrl}/fitness/hero-lift.jpg`,
    description:
      "The 14-day JumpStart program, 1-on-1 coaching, and no-nonsense discipline systems from Chukwudi Oshilim.",
    founder: { "@type": "Person", name: "Chukwudi Oshilim" },
    areaServed: "Online",
  };

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaMeasurementId && <GoogleAnalytics measurementId={gaMeasurementId} />}
        {metaPixelId && <MetaPixel pixelId={metaPixelId} />}
        <main className="relative z-0 bg-primary">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
