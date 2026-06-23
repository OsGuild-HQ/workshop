export interface AgendaItemDetail {
  type: 'card' | 'list';
  badge?: string;
  number?: string;
  title: string;
  emoji?: string;
  completed?: boolean;
}

export interface AgendaTimeSlot {
  time: string;
  label: string;
  status?: 'completed' | 'active' | 'upcoming';
  badge?: string;
  details?: AgendaItemDetail[];
}

export interface AgendaTrack {
  trackName: string;
  slots: AgendaTimeSlot[];
}

export const agendaData: Record<string, AgendaTrack> = {
  "day-1": {
    trackName: "Day 1: Core Fundamentals",
    slots: [
      {
        time: "09:00",
        label: "Welcome & Setup",
        status: "completed",
        badge: "Delivered",
        details: [
          {
            type: "list",
            emoji: "☕",
            title: "Introductory Coffee & Networking",
            completed: true
          },
          {
            type: "list",
            emoji: "⚙️",
            title: "Development environment alignment & verification",
            completed: true
          }
        ]
      },
      {
        time: "10:30",
        label: "Open Source Workflows",
        status: "active",
        badge: "In Progress",
        details: [
          {
            type: "card",
            number: "01",
            title: "Collaborative Git Mechanics",
            completed: true
          },
          {
            type: "list",
            emoji: "🍴",
            title: "Upstream syncing, forking, and branch management",
            completed: true
          },
          {
            type: "list",
            emoji: "🤝",
            title: "Creating high-quality Pull Requests & reviews",
            completed: false
          }
        ]
      },
      {
        time: "13:30",
        label: "Bitcoin Protocols & Rust",
        status: "upcoming",
        details: [
          {
            type: "card",
            number: "02",
            title: "Introduction to Rust Protocol Codebase",
            completed: false
          },
          {
            type: "list",
            emoji: "🦀",
            title: "Rust syntax basics & memory safety models",
            completed: false
          },
          {
            type: "list",
            emoji: "⚡",
            title: "Bitcoin protocols, block validation rules, and libraries",
            completed: false
          }
        ]
      }
    ]
  },
  "day-2": {
    trackName: "Day 2: Advanced Build",
    slots: [
      {
        time: "09:30",
        label: "AI-Assisted Development",
        status: "upcoming",
        details: [
          {
            type: "card",
            number: "03",
            title: "Developing with LLM tools",
            completed: false
          },
          {
            type: "list",
            emoji: "🤖",
            title: "Optimizing prompts and context windows",
            completed: false
          }
        ]
      },
      {
        time: "13:00",
        label: "Group Project Build & Demo",
        status: "upcoming",
        details: [
          {
            type: "card",
            number: "04",
            title: "Final project deployment",
            completed: false
          },
          {
            type: "list",
            emoji: "🚀",
            title: "Live staging deployment & contribution showcase",
            completed: false
          }
        ]
      }
    ]
  }
};
