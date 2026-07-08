'use client'
import { motion } from "framer-motion";
import Link from "next/link";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { products } from "../constants";

const FEATURED_SLUGS = ["jumpstart", "coaching", "consult"];

const Offerings = () => {
  const featured = FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I offer</p>
        <h2 className={styles.sectionHeadText}>Pick your path.</h2>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        {featured.map((product, index) => (
          <motion.div
            key={product.slug}
            variants={fadeIn("up", "spring", index * 0.15, 0.6)}
            className={`flex flex-col p-7 rounded-2xl bg-white/[0.03] border transition-colors duration-300 ${
              product.flagship
                ? "border-red-500/40 shadow-[0_0_50px_-15px_rgba(220,38,38,0.5)]"
                : "border-white/10 hover:border-red-500/30"
            }`}
          >
            <h3 className="text-white font-bold text-[19px]">{product.name}</h3>
            <p className="mt-1 text-red-500 font-black text-[24px]">
              {product.price === 0 ? "Free" : `$${product.price}`}
              {product.billingSuffix && (
                <span className="text-white/40 text-[13px] font-normal">
                  {product.billingSuffix}
                </span>
              )}
            </p>
            <p className="mt-3 text-secondary text-[14px] leading-relaxed">{product.tagline}</p>

            <ul className="mt-5 flex flex-col gap-2 flex-1">
              {product.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-white/70 text-[13px]">
                  <span className="text-red-500 shrink-0 mt-[2px]">✓</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <Link
              href={product.href ?? "/products"}
              className="mt-6 text-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-full transition-colors duration-200"
            >
              Get Started
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Offerings, "offerings");
