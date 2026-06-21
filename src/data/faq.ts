export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  { id: "prior-experience", question: "Do I need prior open-source experience?", answer: "No. Genesis is built for people taking their first steps as much as for people who've contributed before." },
  { id: "beginner-friendly", question: "Is the workshop beginner friendly?", answer: "Yes — sessions are designed to be approachable for first-time contributors, with no assumed background beyond basic coding." },
  { id: "what-to-bring", question: "What should I bring?", answer: "A laptop with Git installed and a GitHub account. Everything else will be covered on the day." },
  { id: "is-it-free", question: "Is participation free?", answer: "TBA - Confirm with organizer before launch." },
  { id: "recordings", question: "Will recordings be available?", answer: "TBA - Confirm with organizer before launch." },
];
