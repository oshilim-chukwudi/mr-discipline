'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { fitnessStats, fitnessFocus } from "../constants";

const Fitness = () => (
  <>
    <div className="flex lg:flex-row flex-col-reverse gap-14 items-center">
      <motion.div variants={fadeIn("right", "tween", 0.2, 1)} className="flex-1">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary text-[12px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Fitness Enthusiast
        </span>

        <h1 className="mt-4 font-black text-white lg:text-[56px] sm:text-[44px] text-[34px] leading-tight">
          Code by day.
          <br />
          <span className="text-red-500">Iron</span> by night.
        </h1>

        <p className="mt-5 text-secondary text-[17px] max-w-lg leading-[28px]">
          AI security engineering pays the bills. Training with discipline keeps me
          sharp for it. Same mindset either way — show up, follow the system, do the
          work that isn&apos;t exciting yet.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-7 rounded-full transition-colors duration-200"
          >
            Shop Mr. Discipline
          </Link>
          <Link
            href="/contact"
            className="border border-white/15 hover:border-white/30 text-white font-medium py-3 px-7 rounded-full transition-colors duration-200"
          >
            Get in touch
          </Link>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className="relative w-full max-w-[320px] aspect-square shrink-0"
      >
        <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/10">
          <Image
            src="/fitness/workouts-logged.png"
            alt=""
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-black/50" />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-black-100 border border-white/10 rounded-2xl px-5 py-4 shadow-card">
          <p className="text-white font-black text-[24px]">{fitnessStats[0].value}</p>
          <p className="text-secondary text-[12px]">{fitnessStats[0].label}</p>
        </div>
        <div className="absolute -top-5 -right-4 bg-black-100 border border-red-500/30 rounded-2xl px-4 py-3 shadow-card">
          <p className="text-red-500 font-black text-[18px]">{fitnessStats[1].value}</p>
          <p className="text-secondary text-[11px]">{fitnessStats[1].label}</p>
        </div>
      </motion.div>
    </div>

    <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-5">
      {fitnessStats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10"
        >
          <p className="text-white font-black text-[26px]">{stat.value}</p>
          <p className="text-secondary text-[12px] mt-1">{stat.label}</p>
        </div>
      ))}
    </div>

    <motion.div variants={textVariant()} className="mt-20">
      <p className={styles.sectionSubText}>What I focus on</p>
      <h2 className={styles.sectionHeadText}>Training Philosophy.</h2>
    </motion.div>

    <div className="mt-10 grid sm:grid-cols-2 gap-6">
      {fitnessFocus.map((focus, index) => (
        <motion.div
          key={focus.title}
          variants={fadeIn("up", "spring", index * 0.15, 0.6)}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-colors duration-300"
        >
          <h3 className="text-white font-bold text-[18px]">{focus.title}</h3>
          <p className="mt-2 text-secondary text-[14px] leading-relaxed">
            {focus.description}
          </p>
        </motion.div>
      ))}
    </div>

    <motion.div
      variants={fadeIn("up", "tween", 0.1, 0.8)}
      className="mt-20 rounded-3xl bg-black p-10 sm:p-14 border border-red-600/30 text-center"
    >
      <p className="text-red-500 font-black tracking-[0.2em] uppercase text-[13px]">
        Mr. Discipline
      </p>
      <h3 className="mt-3 text-white font-black text-[26px] sm:text-[34px]">
        Motivation quits. Discipline doesn&apos;t.
      </h3>
      <p className="mt-3 text-white/50 max-w-lg mx-auto text-[15px]">
        Get the exact planners, workbooks, and guides I use to stay consistent.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
      >
        Shop the programs
      </Link>
    </motion.div>
  </>
);

export default SectionWrapper(Fitness, "fitness");
