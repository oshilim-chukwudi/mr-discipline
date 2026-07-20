'use client'
import { motion } from "framer-motion";
import Image from "next/image";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { useInView } from "../hooks/useInView";
import { latestWorkout } from "../constants";

const IG_PROFILE_URL = "https://instagram.com/tiz_chuks";

const InstagramFollowCard = () => (
  <div className="w-full max-w-[280px] aspect-[9/16] rounded-2xl bg-white/[0.03] border border-white/10 mx-auto sm:mx-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
    <span className="text-red-500 font-black tracking-[0.2em] text-[12px] uppercase">
      Every Sunday
    </span>
    <p className="text-white/70 text-[14px] leading-relaxed">
      This week&apos;s session drops on Instagram. Follow along and train with me.
    </p>
    <a
      href={IG_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
    >
      Follow @tiz_chuks
    </a>
  </div>
);

const InstagramReelEmbed = ({ reelUrl }: { reelUrl: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const embedSrc = `${reelUrl.split("?")[0].replace(/\/$/, "")}/embed`;

  return (
    <div
      ref={ref}
      className="w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10"
    >
      {inView && (
        <iframe
          src={embedSrc}
          className="w-full h-full"
          loading="lazy"
          allow="encrypted-media"
          title="Workout on Instagram"
        />
      )}
    </div>
  );
};

const WorkoutPhotoGrid = () => (
  <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] mx-auto sm:mx-0">
    {latestWorkout.photos.map((photo) => (
      <a
        key={photo.src}
        href={IG_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="170px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </a>
    ))}
  </div>
);

interface WorkoutsProps {
  reels?: string[];
}

const Workouts = ({ reels }: WorkoutsProps) => {
  const activeReels = reels && reels.length > 0 ? reels : latestWorkout.reels;

  return (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>New every Sunday</p>
      <h2 className={styles.sectionHeadText}>Latest workout.</h2>
    </motion.div>

    <motion.div
      variants={fadeIn("up", "spring", 0.2, 0.8)}
      className="mt-10 flex flex-col lg:flex-row gap-10 items-center lg:items-start"
    >
      {activeReels.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {activeReels.map((reelUrl) => (
            <InstagramReelEmbed key={reelUrl} reelUrl={reelUrl} />
          ))}
        </div>
      ) : (
        <InstagramFollowCard />
      )}

      <div className="flex-1 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
        <p className="text-white/70 text-[15px] leading-relaxed max-w-md">
          A new training session posts every Sunday — real workouts, no fluff. Follow
          along on Instagram and train with me week to week.
        </p>

        <WorkoutPhotoGrid />

        <a
          href={IG_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
        >
          See all workouts on Instagram
        </a>
      </div>
    </motion.div>
  </>
  );
};

export default SectionWrapper(Workouts, "workouts");
