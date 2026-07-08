'use client'
import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Is JumpStart a subscription or a one-time purchase?",
    answer:
      "One-time. You pay once and the 14 days unlock at your own pace — no recurring charge.",
  },
  {
    question: "Can I cancel the coaching subscription anytime?",
    answer:
      "Yes. Cancel any time from your billing portal — you keep access through the end of the period you already paid for, no partial refunds for unused time.",
  },
  {
    question: "What if I miss a scheduled coaching call?",
    answer:
      "Reschedule at least 24 hours ahead and you're covered. Less notice or a no-show isn't eligible for a free reschedule — see the Refund Policy for details.",
  },
  {
    question: "Do I need a gym or equipment?",
    answer:
      "No. The systems here are about consistency and discipline, not a specific gym setup — they work whether you train at home or in a full gym.",
  },
  {
    question: "What if this doesn't work for me?",
    answer:
      "This is general discipline and motivation coaching, not medical treatment — it works if you actually follow the system. If access is ever broken on our end, email chukwudioshilim@gmail.com and it gets fixed or refunded.",
  },
];

const FAQAccordionItem = ({ item, index }: { item: FAQItem; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.08, 0.6)}
      className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-white font-semibold text-[15px]">{item.question}</span>
        <span
          className={`shrink-0 text-red-500 text-[20px] leading-none transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <p className="px-5 pb-5 text-white/60 text-[14px] leading-relaxed">{item.answer}</p>
      )}
    </motion.div>
  );
};

const FAQ = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Before you ask</p>
      <h2 className={styles.sectionHeadText}>Common questions.</h2>
    </motion.div>

    <div className="mt-10 flex flex-col gap-4 max-w-3xl">
      {FAQ_ITEMS.map((item, index) => (
        <FAQAccordionItem key={item.question} item={item} index={index} />
      ))}
    </div>
  </>
);

export default SectionWrapper(FAQ, "faq");
