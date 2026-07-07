import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "../../../constants";

interface DownloadPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.filter((product) => product.pdfFile).map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: DownloadPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  return {
    title: product ? `${product.name} | Mr. Discipline` : "Download | Mr. Discipline",
  };
}

export default function DownloadPage({ params }: DownloadPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product || !product.pdfFile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center py-24">
        <span className="inline-block text-red-500 font-black tracking-[0.2em] text-[13px] uppercase">
          Mr. Discipline
        </span>

        <h1 className="mt-4 text-white font-black text-[32px] sm:text-[40px] leading-tight">
          {product.free ? "You're in." : "Thank you."}
        </h1>

        <p className="mt-4 text-white/60 text-[15px]">
          {product.name} is ready for you. Tap below to download your PDF.
        </p>

        <a
          href={`/products/${product.pdfFile}`}
          download
          className="mt-8 inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-10 rounded-lg transition-colors duration-200"
        >
          Download {product.name}
        </a>

        <div className="mt-10 flex flex-col gap-2">
          <Link
            href="/products"
            className="text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
          >
            ← Browse more Mr. Discipline products
          </Link>
          <Link
            href="/"
            className="text-white/30 hover:text-white/60 text-[13px] transition-colors duration-200"
          >
            Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
