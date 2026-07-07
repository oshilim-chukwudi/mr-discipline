'use client'
import { memo } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import Image from "next/image";

import { styles } from "../styles";
import { services, Service } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

interface ServiceCardProps extends Service {
  index: number;
}

const ServiceCard = memo(({ index, title, icon }: ServiceCardProps) => (
  <Tilt options={{ max: 25, scale: 1.02, speed: 450 }} className="xs:w-[220px] w-full">
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.6)}
      className="w-full h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 backdrop-blur-sm transition-colors duration-300 flex flex-col items-center text-center gap-4"
    >
      <div className="w-16 h-16 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
        <Image src={icon} alt={title} width={36} height={36} className="object-contain" />
      </div>
      <h3 className="text-white text-[16px] font-bold">{title}</h3>
    </motion.div>
  </Tilt>
));

ServiceCard.displayName = "ServiceCard";

const About = () => (
  <>
    <motion.div variants={textVariant()}>
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary text-[12px] font-medium mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        AI Security Engineer
      </span>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      I&apos;m an AI Security Engineer and Full-Stack Developer with 6+ years of
      professional experience building scalable, secure, and performant systems.
      I currently lead quality engineering and security practices at BioAro —
      combining AI-assisted tooling, threat-aware engineering, and hands-on
      development across React, Node.js, and modern cloud infrastructure. Strong
      collaborator across cross-functional teams, from architecture decisions to
      production deployments.
    </motion.p>

    <div className="mt-16 flex flex-wrap justify-center gap-6">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, "about");
