'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { styles } from "../styles";

const Hero = () => (
  <section className="relative w-full h-screen h-[100svh] mx-auto overflow-hidden snap-start bg-black">
    <div className="absolute inset-0">
      <Image
        src="/fitness/hero-lift.jpg"
        alt="Mr. Discipline training"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[65%_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 sm:via-black/35 to-black/10" />
      <a
        href="https://instagram.com/tiz_chuks"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View more photos on Instagram"
        className="absolute bottom-6 right-6 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm text-white text-[12px] font-medium hover:bg-black/60 hover:border-white/40 transition-colors duration-200"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.256 1.216.6 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.048 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.048-1.405.06-4.122.06-2.717 0-3.056-.012-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.013-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.012 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.858.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.858.048-1.054.058-1.37.058-4.04 0-2.67-.01-2.985-.058-4.04-.045-.975-.207-1.504-.344-1.857a3.09 3.09 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.858-.344-1.054-.048-1.37-.059-4.04-.059zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm5.338-1.986a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
        </svg>
        More on Instagram
      </a>
    </div>

    <div
      className={`relative z-10 h-full max-w-7xl mx-auto ${styles.paddingX} flex flex-col justify-center pt-[100px] pb-16`}
    >
      <span className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-secondary text-[12px] font-medium mb-2 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Mr. Discipline
      </span>
      <h1 className={`${styles.heroHeadText} text-white max-w-2xl`}>
        Your discipline
        <br />
        starts <span className="text-red-500">here.</span>
      </h1>
      <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-xl`}>
        Motivation quits. Discipline doesn&apos;t. 14-day JumpStart program, 1-on-1
        coaching, and the systems I use to show up every day — even the days I
        don&apos;t feel like it.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/products"
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-7 rounded-full transition-colors duration-200"
        >
          Begin Now
        </Link>
        <Link
          href="/consult"
          className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium py-3 px-7 rounded-full transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
          </svg>
          Book a call
        </Link>
      </div>
    </div>

    <div className="absolute xs:bottom-10 bottom-8 w-full flex justify-center items-center">
      <Link href="#about">
        <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
          <motion.div
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            className="w-3 h-3 rounded-full bg-secondary mb-1"
          />
        </div>
      </Link>
    </div>
  </section>
);

export default Hero;
