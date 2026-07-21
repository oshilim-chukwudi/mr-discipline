'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

import { products, Product } from "../constants";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: "easeOut" } },
});

const FreeProductForm = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productSlug: product.slug, productName: product.name }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Lead capture failed");

        // Best-effort notification — don't block the download on this.
        emailjs
          .send(
            "service_s7lter8",
            "template_5m8ce8w",
            {
              from_name: `Mr. Discipline lead — ${product.name}`,
              to_name: "Mr. Discipline",
              from_email: email,
              to_email: "Chukwudioshilim@gmail.com",
              message: `New free lead magnet signup for "${product.name}" from ${email}.`,
            },
            "9xtDvDVnd2Wj4C1Vk"
          )
          .catch(() => {});

        setLoading(false);
        router.push(`/downloads/${product.slug}`);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="bg-black/60 border border-white/15 focus:border-red-500/60 py-3 px-4 rounded-lg text-white placeholder:text-white/40 outline-none transition-colors duration-200"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {loading ? "Sending..." : "Get it free"}
      </button>
      {error && (
        <p className="text-red-400 text-[13px]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
};

const CheckoutButton = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(product.checkoutEndpoint as string, { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="block w-full text-center bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {loading ? "Redirecting..." : `Get it — $${product.price}${product.billingSuffix ?? ""}`}
      </button>
      {error && (
        <p className="mt-2 text-red-400 text-[13px]">Something went wrong. Please try again.</p>
      )}
    </>
  );
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const isFlagship = Boolean(product.flagship);

  return (
    <motion.div
      variants={fadeUp(index * 0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative flex flex-col p-8 rounded-2xl bg-white/[0.03] border backdrop-blur-sm ${
        product.free || isFlagship
          ? "border-red-500/40 shadow-[0_0_40px_-15px_rgba(220,38,38,0.5)]"
          : "border-white/10 hover:border-red-500/30"
      } transition-colors duration-300`}
    >
      {product.free && (
        <span className="absolute -top-3 left-8 bg-red-600 text-white text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">
          FREE
        </span>
      )}
      {isFlagship && (
        <span className="absolute -top-3 left-8 bg-red-600 text-white text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">
          FLAGSHIP PROGRAM
        </span>
      )}

      <h3 className="text-white text-[22px] font-bold">{product.name}</h3>
      <p className="mt-2 text-white/60 text-[14px] leading-relaxed">{product.tagline}</p>

      <ul className="mt-5 flex flex-col gap-2">
        {product.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-white/70 text-[13px]">
            <span className="text-red-500 shrink-0 mt-[2px]">✓</span>
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        {product.free ? (
          <FreeProductForm product={product} />
        ) : product.href ? (
          <>
            <p className="text-white text-[28px] font-black mb-3">
              from ${product.price}
              {product.billingSuffix}
            </p>
            <Link
              href={product.href}
              className="block text-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              View options
            </Link>
          </>
        ) : product.checkoutEndpoint ? (
          <>
            <p className="text-white text-[28px] font-black mb-3">
              ${product.price}
              {product.billingSuffix}
            </p>
            <CheckoutButton product={product} />
          </>
        ) : (
          <>
            <p className="text-white text-[28px] font-black mb-3">${product.price}</p>
            <a
              href={product.stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Get it — ${product.price}
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
};

const Products = () => (
  <div className="min-h-screen bg-black">
    <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[14px] font-medium transition-colors duration-200"
      >
        ← Back to portfolio
      </Link>

      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <span className="inline-block text-red-500 font-black tracking-[0.2em] text-[14px] uppercase">
          Mr. Discipline
        </span>
        <h1 className="mt-4 text-white font-black text-[40px] sm:text-[56px] leading-tight">
          Motivation quits.
          <br />
          <span className="text-red-600">Discipline doesn&apos;t.</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-white/50 text-[16px]">
          Digital programs and guides built for people who show up anyway. No hype — just
          the plans and systems that keep you consistent.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </div>
  </div>
);

export default Products;
