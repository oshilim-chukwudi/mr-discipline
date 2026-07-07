'use client'
import { motion } from "framer-motion";
import Image from "next/image";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Skills</p>
      <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
    </motion.div>

    <div className="mt-16 flex flex-row flex-wrap justify-center gap-6">
      {technologies.map((technology, index) => (
        <motion.div
          key={technology.name}
          variants={fadeIn("up", "spring", index * 0.05, 0.5)}
          whileHover={{ y: -6, scale: 1.05 }}
          className="group relative w-28 h-28 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-2 transition-colors duration-300 hover:border-red-500/50 hover:bg-white/[0.06]"
        >
          <div className="absolute inset-0 rounded-2xl bg-red-600/0 group-hover:bg-red-600/10 blur-xl transition-all duration-300 -z-10" />
          <Image
            src={technology.icon}
            alt={technology.name}
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="text-white/70 group-hover:text-white text-[11px] font-medium text-center px-1 transition-colors duration-300">
            {technology.name}
          </p>
        </motion.div>
      ))}
    </div>
  </>
);

export default SectionWrapper(Tech, "tech");
