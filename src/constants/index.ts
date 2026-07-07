import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export interface NavLink {
  id: string;
  title: string;
}

export interface Service {
  title: string;
  icon: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link: string;
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
  { id: "tech", title: "Tech" },
  { id: "works", title: "Projects" },
  { id: "fitness", title: "Fitness" },
  { id: "contact", title: "Contact" },
];

const services: Service[] = [
  { title: "Web Developer", icon: web },
  { title: "Frontend Developer", icon: mobile },
  { title: "Backend Developer", icon: backend },
  { title: "Content Creator", icon: creator },
];

const technologies: Technology[] = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Three JS", icon: threejs },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
];

const testimonials: Testimonial[] = [
  {
    testimonial:
      "I've had the pleasure of using the applications developed by Chuks, our full-stack developer.The user experience is consistently seamless and intuitive",
    name: "Emily Samuels",
    designation: "CEO",
    company: "Swipe",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like chuks does.",
    name: "Wilfred Patterson",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Chuks optimized our website, our traffic increased by 50%. We can't thank you enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: Project[] = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "restapi", color: "green-text-gradient" },
      { name: "scss", color: "pink-text-gradient" },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "supabase", color: "green-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

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
    price: 15,
    tagline: "Not ready for a subscription? Book a one-off Quick Call or Coaching Hour instead.",
    bullets: [
      "Quick Call — 15 minutes, $15",
      "Coaching Hour — 60 minutes, $50",
      "No account or sign-up needed",
    ],
    href: "/consult",
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
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_PLANNER_LINK",
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
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_WORKBOOK_LINK",
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
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_GUIDE_LINK",
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
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_AFFIRMATIONS_LINK",
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

export {
  services,
  technologies,
  testimonials,
  projects,
  products,
  fitnessStats,
  fitnessFocus,
};
