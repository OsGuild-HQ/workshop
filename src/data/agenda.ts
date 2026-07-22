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
  speaker?: string;
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
    trackName: "Day 1: Genesis Technical Workshop",
    slots: [
      {
        time: "09:00",
        label: "Registration & Check-in",
        speaker: "OSGuild Team",
        status: "completed",
        badge: "Delivered",
        details: [
          { type: "list", emoji: "📋", title: "Participant check-in & badge collection", completed: true },
          { type: "list", emoji: "☕", title: "Morning coffee & setup alignment", completed: true }
        ]
      },
      {
        time: "09:30",
        label: "Breakfast & Networking",
        speaker: "All Participants",
        status: "completed",
        badge: "Delivered",
        details: [
          { type: "list", emoji: "🥐", title: "Light breakfast and community networking", completed: true }
        ]
      },
      {
        time: "10:00",
        label: "Opening Keynote: Welcome to Genesis & Git Mechanics",
        speaker: "Sadiq Rabiu",
        status: "active",
        badge: "In Progress",
        details: [
          { type: "card", number: "01", title: "Welcome to Genesis & OSGuild Vision", completed: true },
          { type: "list", emoji: "🍴", title: "Git mechanics, forking, and upstream syncing", completed: true },
          { type: "list", emoji: "🤝", title: "Creating high-quality Pull Requests & reviews", completed: true }
        ]
      },
      {
        time: "10:30",
        label: "Introduction to Bitcoin & Bitcoin Mining",
        speaker: "Simon",
        status: "upcoming",
        details: [
          { type: "card", number: "02", title: "Bitcoin Protocol & Proof-of-Work", completed: false },
          { type: "list", emoji: "⛏️", title: "How miners secure the network", completed: false },
          { type: "list", emoji: "🌐", title: "Decentralization & consensus rules", completed: false }
        ]
      },
      {
        time: "11:30",
        label: "What the Mastering Bitcoin Pathway Taught Me",
        speaker: "Tooshar Sauntoo",
        status: "upcoming",
        details: [
          { type: "list", emoji: "📖", title: "Learning Bitcoin from first principles", completed: false },
          { type: "list", emoji: "🚀", title: "Transitioning to open-source contribution", completed: false }
        ]
      },
      {
        time: "11:50",
        label: "Blockchain Basics: Real-World Uses",
        speaker: "Hanif Olayiwola",
        status: "upcoming",
        details: [
          { type: "list", emoji: "🔗", title: "Distributed ledger technology foundations", completed: false },
          { type: "list", emoji: "💡", title: "Industry applications & future potential", completed: false }
        ]
      },
      {
        time: "12:10",
        label: "Introduction to the Base58 LARP Game",
        speaker: "Sadiq Rabiu",
        status: "upcoming",
        details: [
          { type: "list", emoji: "🔓", title: "Lab objectives & team formation", completed: false },
          { type: "list", emoji: "🛠️", title: "Tools & environment setup", completed: false }
        ]
      },
      {
        time: "12:30",
        label: "Open Discussion & Q&A",
        speaker: "All Speakers",
        status: "upcoming",
        details: [
          { type: "list", emoji: "💬", title: "Morning session review & concept clarifications", completed: false }
        ]
      },
      {
        time: "13:00",
        label: "Lunch Break & Informal Mentorship",
        status: "upcoming",
        details: [
          { type: "list", emoji: "🍱", title: "Networking lunch", completed: false }
        ]
      },
      {
        time: "14:00",
        label: "From Curiosity to Confidence: My Journey",
        speaker: "Sneha",
        status: "upcoming",
        details: [
          { type: "list", emoji: "🌟", title: "Overcoming technical challenges", completed: false },
          { type: "list", emoji: "💪", title: "Building confidence through community", completed: false }
        ]
      },
      {
        time: "14:20",
        label: "Understanding the Lightning Network",
        speaker: "Chuks Agbakuru",
        status: "upcoming",
        details: [
          { type: "card", number: "03", title: "Layer-2 Scaling & Node Operations", completed: false },
          { type: "list", emoji: "⚡", title: "Payment channels & HTLC routing", completed: false },
          { type: "list", emoji: "💻", title: "Live Lightning node demonstration", completed: false }
        ]
      },
      {
        time: "15:20",
        label: "BlockQuest Challenge & Base58 LARP Game",
        speaker: "Mentors & Facilitators",
        status: "upcoming",
        details: [
          { type: "card", number: "04", title: "Hands-on Codebase & Cryptography Lab", completed: false },
          { type: "list", emoji: "🧱", title: "BlockQuest root-cause analysis & PR submission", completed: false },
          { type: "list", emoji: "🔐", title: "Base58 interactive encoding & transaction decoding", completed: false }
        ]
      },
      {
        time: "16:20",
        label: "Team Showcase & Reflection",
        speaker: "Participants & Mentors",
        status: "upcoming",
        details: [
          { type: "list", emoji: "📣", title: "Team presentations & mentor feedback", completed: false }
        ]
      },
      {
        time: "16:50",
        label: "Closing Remarks & Day 2 Preview",
        speaker: "Sadiq Rabiu",
        status: "upcoming",
        details: [
          { type: "list", emoji: "🏁", title: "Day 1 recap & recognition", completed: false }
        ]
      }
    ]
  }
};
