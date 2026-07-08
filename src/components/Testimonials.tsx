'use client'
import { motion } from "framer-motion";
import Image from "next/image";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// SAMPLE TESTIMONIALS — placeholder content, no real customers yet.
// Replace with genuine client feedback (real names/photos, with permission)
// before running paid ads or otherwise presenting this as real social proof.
interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  photo: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Jade M.",
    role: "JumpStart client",
    quote:
      "The JumpStart program gave me exactly the structure I needed. Simple, no-nonsense, and I actually finished all 14 days.",
    photo: "/testimonials/testimonial-1.jpg",
  },
  {
    name: "Marcus T.",
    role: "Coaching client",
    quote:
      "Working with Chukwudi kept me accountable every single week. It's like having a coach who actually calls you out.",
    photo: "/testimonials/testimonial-2.jpg",
  },
  {
    name: "Amara K.",
    role: "JumpStart client",
    quote:
      "I've bought fitness plans before and never finished one. This is the first one I actually stuck with start to finish.",
    photo: "/testimonials/testimonial-3.jpg",
  },
  {
    name: "David R.",
    role: "Coaching client",
    quote:
      "Straightforward calls, real advice, zero fluff. Exactly what I needed to get back on track.",
    photo: "/testimonials/testimonial-4.jpg",
  },
];

const TestimonialCard = ({ name, role, quote, photo }: TestimonialItem) => (
  <div className="w-[320px] sm:w-[360px] shrink-0 p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-colors duration-300">
    <div className="flex text-red-500 text-[14px] gap-0.5">
      {"★★★★★"}
    </div>
    <p className="mt-4 text-white/70 text-[14px] leading-relaxed">&ldquo;{quote}&rdquo;</p>
    <div className="mt-6 flex items-center gap-3">
      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/10">
        <Image src={photo} alt={name} fill className="object-cover" />
      </div>
      <div>
        <p className="text-white font-bold text-[14px]">{name}</p>
        <p className="text-secondary text-[12px]">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Client stories</p>
        <h2 className={styles.sectionHeadText}>What people say.</h2>
      </motion.div>

      <div className="mt-10 -mx-6 sm:-mx-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee flex gap-6 w-max px-6 sm:px-10">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Testimonials, "testimonials");
