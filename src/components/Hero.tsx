'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { styles } from "../styles";

const Hero = () => (
  <section className="relative w-full h-screen h-[100svh] mx-auto overflow-hidden snap-start bg-black">
    <div className="absolute inset-0">
      <Image
        src="/fitness/workouts-logged.png"
        alt="Mr. Discipline training"
        fill
        priority
        className="object-cover object-[80%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 sm:via-black/70 to-black/20" />
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
          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
            ▶
          </span>
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
