'use client'
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => (
  <>
    <motion.div variants={textVariant()}>
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary text-[12px] font-medium mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Mr. Discipline
      </span>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>My story.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      I&apos;m Chukwudi — I built Mr. Discipline because motivation never got me
      through a hard week, but a system did. No fad diets, no hype, no
      &quot;just believe in yourself.&quot; Just a straightforward, repeatable way to
      show up daily: a 14-day JumpStart program, real 1-on-1 coaching, and the
      planners and guides I actually use myself. If you want a coach who
      tells it straight and holds you to the system, that&apos;s what this is.
    </motion.p>
  </>
);

export default SectionWrapper(About, "about");
