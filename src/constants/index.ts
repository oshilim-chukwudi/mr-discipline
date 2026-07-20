export interface NavLink {
  id: string;
  title: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  billingSuffix?: string;
  free?: boolean;
  flagship?: boolean;
  tagline: string;
  bullets: string[];
  pdfFile?: string;
  stripeLink?: string;
  checkoutEndpoint?: string;
  href?: string;
}

export interface FitnessStat {
  label: string;
  value: string;
}

export interface FitnessFocus {
  title: string;
  description: string;
}

export const navLinks: NavLink[] = [
  { id: "about", title: "About" },
  { id: "fitness", title: "Fitness" },
  { id: "workouts", title: "Workouts" },
  { id: "offerings", title: "Offers" },
  { id: "contact", title: "Contact" },
];

export interface WorkoutPhoto {
  src: string;
  alt: string;
}

// Update with the week's new Reel URLs and photos — the only edit needed
// to publish that week's workout. Leave reels empty to fall back to a
// plain "follow me" card instead of embeds.
export const latestWorkout = {
  reels: [
    "https://www.instagram.com/reel/Da_MWDeygqc/?igsh=dDc1cjJ5ajVvZGo2",
    "https://www.instagram.com/reel/DatWsM1yVxu/?igsh=cHF2d3U1bDF5bDlr",
  ] as string[],
  photos: [
    { src: "/fitness/back-lift.jpg", alt: "Chukwudi performing a barbell back exercise" },
    { src: "/fitness/back-lift-dark.jpg", alt: "Chukwudi training in low light" },
    { src: "/fitness/overhead-press.jpg", alt: "Chukwudi pressing 30kg overhead" },
    { src: "/fitness/snow-lift.jpg", alt: "Chukwudi lifting outdoors in the snow" },
  ] as WorkoutPhoto[],
};

const products: Product[] = [
  {
    slug: "jumpstart",
    name: "JumpStart — 14-Day Video Program",
    price: 47,
    flagship: true,
    tagline:
      "A guided 14-day video program to support your mood through movement — one short session a day.",
    bullets: [
      "14 short guided video sessions",
      "Mood check-ins before and after every day",
      "New sessions unlock as you go, at your pace",
    ],
    checkoutEndpoint: "/api/checkout/jumpstart",
  },
  {
    slug: "coaching",
    name: "Live Coach Consultation",
    price: 99,
    billingSuffix: "/mo",
    tagline: "A weekly 1-on-1 coaching call — ongoing support, not just a one-off session.",
    bullets: [
      "One live call every week",
      "Book any time that works for you",
      "Cancel any time from your billing portal",
    ],
    checkoutEndpoint: "/api/checkout/coaching",
  },
  {
    slug: "consult",
    name: "Book a Call",
    price: 1,
    tagline: "Not ready for a subscription? Book a one-off call instead — from $1.",
    bullets: [
      "Quick Call — 15 minutes, $1",
      "Focus Session — 30 minutes, $20",
      "Coaching Hour — 60 minutes, $50",
    ],
    href: "/consult",
  },
  {
    slug: "greek-god",
    name: "The Greek God Program",
    price: 22,
    tagline: "A 4-day training system for broad shoulders, a narrow waist, and a body built on proportion.",
    bullets: [
      "4 training days a week, full exercise breakdown",
      "Built around the shoulder-to-waist V-taper look",
      "One progression rule — no guesswork after day one",
    ],
    pdfFile: "greek-god-program.pdf",
    checkoutEndpoint: "/api/checkout/greek-god",
  },
  {
    slug: "planner",
    name: "30-Day Weight Lifting Planner",
    price: 27,
    tagline: "A day-by-day lifting program for beginners who want structure, not guesswork.",
    bullets: [
      "30 days of programmed lifts, sets, and reps",
      "Beginner-friendly progressions",
      "Printable, phone-friendly PDF",
    ],
    pdfFile: "30-day-weight-lifting-planner.pdf",
    checkoutEndpoint: "/api/checkout/planner",
  },
  {
    slug: "workbook",
    name: "Fitness Goal Workbook",
    price: 17,
    tagline: "Set goals you'll actually keep, with a system for tracking the discipline behind them.",
    bullets: [
      "Goal-setting worksheets",
      "Weekly progress trackers",
      "Habit + discipline checklists",
    ],
    pdfFile: "fitness-goal-workbook.pdf",
    checkoutEndpoint: "/api/checkout/workbook",
  },
  {
    slug: "guide",
    name: "Fast Food Eating Guide",
    price: 12,
    tagline: "Stay on track even when life happens — smarter picks at the drive-thru.",
    bullets: [
      "Better-choice breakdowns for major chains",
      "Macro-friendly swaps",
      "No-excuses eating-out strategy",
    ],
    pdfFile: "fast-food-eating-guide.pdf",
    checkoutEndpoint: "/api/checkout/guide",
  },
  {
    slug: "affirmations",
    name: "Daily Fitness Affirmations",
    price: 7,
    tagline: "Short daily reminders to keep showing up, even on the hard days.",
    bullets: [
      "30 daily affirmation cards",
      "Built around discipline, not motivation",
      "Read in under a minute a day",
    ],
    pdfFile: "daily-fitness-affirmations.pdf",
    checkoutEndpoint: "/api/checkout/affirmations",
  },
  {
    slug: "discipline-reset",
    name: "The Discipline Reset",
    price: 0,
    free: true,
    tagline: "A short reset guide for the days motivation disappears and you need a system instead.",
    bullets: [
      "What to do on the days you don't feel like it",
      "A quick reset routine, not a pep talk",
      "Built around discipline, not motivation",
    ],
    pdfFile: "discipline-reset.pdf",
  },
  {
    slug: "shopping-list",
    name: "Weight Loss Shopping List",
    price: 0,
    free: true,
    tagline: "The exact grocery list to stop guessing in the store and start losing weight.",
    bullets: [
      "Aisle-by-aisle shopping list",
      "Budget-friendly staples",
      "Zero fluff — just what to buy",
    ],
    pdfFile: "weight-loss-shopping-list.pdf",
  },
];

const fitnessStats: FitnessStat[] = [
  { label: "Years training", value: "8+" },
  { label: "Workouts logged", value: "1,200+" },
  { label: "Programs written", value: "5" },
  { label: "Rest days skipped", value: "0" },
];

const fitnessFocus: FitnessFocus[] = [
  {
    title: "Strength Training",
    description:
      "Progressive lifting programs built around compound movements and consistent overload.",
  },
  {
    title: "Nutrition Discipline",
    description:
      "Practical, no-nonsense eating strategies that survive real life — including fast food runs.",
  },
  {
    title: "Habit Systems",
    description:
      "Tracking and accountability tools that make showing up the default, not the exception.",
  },
  {
    title: "Mindset Over Motivation",
    description:
      "Motivation quits. Discipline doesn't — daily systems for the days you don't feel like it.",
  },
];

export { products, fitnessStats, fitnessFocus };
