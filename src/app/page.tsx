import Hero from "../components/Hero";
import About from "../components/About";
import Fitness from "../components/Fitness";
import Workouts from "../components/Workouts";
import Offerings from "../components/Offerings";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import { getLatestInstagramPermalinks } from "../lib/instagram";

export default async function Home() {
  const reels = await getLatestInstagramPermalinks(3);

  return (
    <>
      <Hero />
      <About />
      <Fitness />
      <Workouts reels={reels} />
      <Offerings />
      <FAQ />
      <Testimonials />
      <Contact />
    </>
  );
}
