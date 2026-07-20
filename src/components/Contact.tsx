'use client'
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const FIELD_CLASSES =
  "bg-tertiary/60 py-3.5 px-5 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/10 focus:border-red-500/60 font-medium transition-colors duration-200";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          alert("Thank you for your message. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error: unknown) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        initial="hidden"
        animate="show"
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch with me</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
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
              className={FIELD_CLASSES}
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
              className={FIELD_CLASSES}
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
              className={FIELD_CLASSES}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-red-600 hover:bg-red-500 py-3 px-8 rounded-full outline-none w-fit text-white font-bold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
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
