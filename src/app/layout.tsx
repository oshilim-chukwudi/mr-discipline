import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import MetaPixel from "../components/analytics/MetaPixel";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://chukwudi-portfolio-snowy.vercel.app"
  ),
  title: "Chukwudi Oshilim | AI Security Engineer",
  description:
    "Portfolio of Chukwudi Oshilim — AI Security Engineer & Full Stack Developer at BioAro. Building scalable web apps, secure AI-driven systems, and 3D experiences.",
  keywords: [
    "AI Security Engineer",
    "Full Stack Developer",
    "QA Security",
    "Tech Lead",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Chukwudi Oshilim" }],
  openGraph: {
    title: "Chukwudi Oshilim | AI Security Engineer",
    description:
      "AI Security Engineer and Full Stack Developer. Building scalable, secure, AI-driven web applications.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chukwudi Oshilim | AI Security Engineer",
    description: "AI Security Engineer and Full Stack Developer.",
  },
  icons: { icon: "/logo.svg?v=2" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en" className={poppins.variable}>
      <body>
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
