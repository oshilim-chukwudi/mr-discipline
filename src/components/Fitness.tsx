'use client'
import { motion } from "framer-motion";
import Link from "next/link";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { fitnessStats, fitnessFocus } from "../constants";

const Fitness = () => (
  <>
    <motion.div variants={fadeIn("up", "tween", 0.1, 1)} className="max-w-2xl">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary text-[12px] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Discipline Coach
      </span>

      <h1 className="mt-4 font-black text-white lg:text-[56px] sm:text-[44px] text-[34px] leading-tight">
        Systems over
        <br />
        <span className="text-red-500">motivation.</span>
      </h1>

      <p className="mt-5 text-secondary text-[17px] max-w-lg leading-[28px]">
        Motivation fades by Wednesday. A system doesn&apos;t care how you feel —
        you follow it anyway. That&apos;s the whole philosophy behind JumpStart,
        coaching, and everything I teach.
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
      variants={fadeIn("up", "tween", 0.2, 1)}
      className="mt-16 flex flex-wrap sm:flex-nowrap divide-x divide-white/10 border-y border-white/10 py-8"
    >
      {fitnessStats.map((stat) => (
        <div key={stat.label} className="flex-1 min-w-[45%] sm:min-w-0 text-center px-4">
          <p className="text-red-500 font-black text-[30px] sm:text-[36px] tracking-tight">
            {stat.value}
          </p>
          <p className="mt-1 text-white/60 text-[12px] uppercase tracking-wide">{stat.label}</p>
        </div>
      ))}
    </motion.div>

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
