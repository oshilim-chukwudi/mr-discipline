'use client'
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, boolean>>;

const FIELD_CLASSES =
  "bg-tertiary/60 py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border font-medium transition-colors duration-200";

const SuccessCard = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.2 }}
    className="relative flex flex-col items-center text-center gap-4 py-10"
  >
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="absolute -top-2 -right-2 w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors duration-200"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      </svg>
    </button>

    <span className="w-14 h-14 rounded-full bg-red-600/15 border border-red-500/30 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-red-500">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>

    <h3 className="text-white font-bold text-[22px]">Thank you for contacting Mr. Discipline.</h3>
    <p className="text-secondary text-[15px] max-w-xs">
      We&apos;ll get back to you within 24 hours.
    </p>

    <Link
      href="/"
      className="mt-2 bg-red-600 hover:bg-red-500 py-3 px-8 rounded-full text-white font-bold transition-all duration-200 hover:-translate-y-0.5"
    >
      Back to home
    </Link>
  </motion.div>
);

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendError(false);

    const nextErrors: FormErrors = {
      name: form.name.trim().length === 0,
      email: form.email.trim().length === 0,
      message: form.message.trim().length === 0,
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_s7lter8",
        "template_5m8ce8w",
        {
          from_name: form.name,
          to_name: "Mr. Discipline",
          from_email: form.email,
          to_email: "Chukwudioshilim@gmail.com",
          message: form.message,
        },
        "9xtDvDVnd2Wj4C1Vk"
      )
      .then(
        () => {
          setLoading(false);
          setSubmitted(true);
          setForm({ name: "", email: "", message: "" });
        },
        (error: unknown) => {
          setLoading(false);
          console.error(error);
          setSendError(true);
        }
      );
  };

  const fieldClass = (field: keyof FormState) =>
    `${FIELD_CLASSES} ${errors[field] ? "border-red-500/70" : "border-white/10 focus:border-red-500/60"}`;

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        initial="hidden"
        animate="show"
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessCard key="success" onClose={() => setSubmitted(false)} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className={styles.sectionSubText}>Get in touch with me</p>
              <h3 className={styles.sectionHeadText}>Contact.</h3>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-secondary text-[12px] font-semibold uppercase tracking-wider">
                    Your name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    className={fieldClass("name")}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-secondary text-[12px] font-semibold uppercase tracking-wider">
                    Your email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    className={fieldClass("email")}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-secondary text-[12px] font-semibold uppercase tracking-wider">
                    Your message
                  </span>
                  <textarea
                    rows={6}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Leave a message?"
                    className={fieldClass("message")}
                  />
                </label>

                {Object.values(errors).some(Boolean) && (
                  <p className="text-red-500 text-[14px] font-medium -mt-2">
                    Please fill in all fields before sending.
                  </p>
                )}
                {sendError && (
                  <p className="text-red-500 text-[14px] font-medium -mt-2">
                    Something went wrong sending your message. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-red-600 hover:bg-red-500 py-3 px-8 rounded-full outline-none w-fit text-white font-bold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        initial="hidden"
        animate="show"
        className="relative xl:flex-1 xl:h-auto md:h-[550px] h-[350px] rounded-2xl overflow-hidden border border-white/10"
      >
        <Image
          src="/fitness/snow-lift.jpg"
          alt="Chukwudi training outdoors in the snow"
          fill
          sizes="(max-width: 1280px) 100vw, 40vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
