'use client'
import { useEffect, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId("");
      return;
    }

    const sections = navLinks
      .map((nav) => document.querySelector<HTMLElement>(`[data-section="${nav.id}"]`))
      .filter((el): el is HTMLElement => el !== null);

    const handleScroll = () => {
      const probeY = window.innerHeight * 0.5;
      let current = "";
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          current = el.dataset.section ?? "";
          break;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const activeTitle = navLinks.find((nav) => nav.id === activeId)?.title ?? "";

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={36} height={36} className="object-contain" priority />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Chukwudi &nbsp;
            <span className="sm:block hidden"> | Codechuks</span>
          </p>
        </Link>

        <div className="hidden sm:flex flex-row items-center gap-10">
          <ul className="list-none flex flex-row gap-10">
            {navLinks.map((nav) => (
              <li key={nav.id} className="relative">
                <Link
                  href={`/#${nav.id}`}
                  className={`${
                    activeTitle === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-200`}
                >
                  {nav.title}
                </Link>
                {activeTitle === nav.title && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-red-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/products"
            className="bg-red-600 hover:bg-red-500 text-white text-[14px] font-bold py-2 px-5 rounded-full transition-colors duration-200"
          >
            Mr. Discipline
          </Link>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center gap-4">
          <Link
            href="/products"
            className="bg-red-600 hover:bg-red-500 text-white text-[13px] font-bold py-1.5 px-4 rounded-full transition-colors duration-200"
          >
            Shop
          </Link>
          <Image
            src={toggle ? close : menu}
            alt="menu"
            width={28}
            height={28}
            className="object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="p-6 bg-black-100/90 backdrop-blur-md border border-white/10 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-card"
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-white transition-colors duration-200 ${
                        activeTitle === nav.title ? "text-white" : "text-secondary"
                      }`}
                      onClick={() => setToggle(false)}
                    >
                      <Link href={`/#${nav.id}`}>{nav.title}</Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
