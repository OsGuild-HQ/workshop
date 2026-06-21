export interface Topic {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const topics: Topic[] = [
  { id: "oss-fundamentals", icon: "git-branch", title: "Open Source Fundamentals", description: "Licenses, project structure, and how open communities actually make decisions." },
  { id: "git-github", icon: "github", title: "Git & GitHub Workflows", description: "Branching, pull requests, and the day-to-day mechanics of shipping code with others." },
  { id: "ai-dev", icon: "sparkles", title: "AI-Assisted Development", description: "Using AI tools well without losing track of what your code actually does." },
  { id: "code-review", icon: "eye", title: "Code Review Culture", description: "Giving and receiving feedback that makes the project — and you — better." },
  { id: "bitcoin-tech", icon: "bitcoin", title: "Bitcoin Technologies", description: "An introduction to the protocols and tools behind the Bitcoin ecosystem." },
  { id: "building-public", icon: "radio", title: "Building in Public", description: "Sharing work-in-progress, writing it up, and growing a track record as a contributor." },
];
