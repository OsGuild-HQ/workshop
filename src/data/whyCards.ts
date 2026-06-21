export interface WhyCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const whyCards: WhyCard[] = [
  {
    id: "new-contributors",
    icon: "compass",
    title: "Open Source Needs New Contributors",
    description: "Many developers want to contribute but don't know where to start.",
  },
  {
    id: "ai-changes",
    icon: "cpu",
    title: "AI Changes Everything",
    description: "AI makes writing code easier, but understanding systems still matters.",
  },
  {
    id: "community",
    icon: "users",
    title: "Community Matters",
    description: "Great software is built through collaboration, feedback, and trust.",
  },
];
