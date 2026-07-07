'use client'
import { motion } from "framer-motion";
import Link from "next/link";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => (
  <section className="relative w-full h-screen h-[100svh] mx-auto overflow-hidden snap-start">
    <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center [filter:hue-rotate(150deg)_saturate(1.4)_brightness(0.8)]" />

    <div
      className={`absolute inset-0 top-[100px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
    >
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="w-5 h-5 rounded-full bg-red-600" />
        <div className="w-1 sm:h-80 h-40 violet-gradient" />
      </div>

      <div>
        <span className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-secondary text-[12px] font-medium mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available for new opportunities
        </span>
        <h1 className={`${styles.heroHeadText} text-white`}>
          Hi, I&apos;m <span className="text-red-500">Chukwudi</span>
        </h1>
        <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          I build secure, AI-driven web applications,
          <br className="sm:block hidden" />
          and immersive 3D experiences.
        </p>
      </div>
    </div>

    <ComputersCanvas />

    <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
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
