import sadiqImage from '../assets/speakers/Sadiq.jpg';

export interface Speaker {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  bio?: string;
  image?: string;
  github?: string;
  twitter?: string;
  nostr?: string;
  website?: string;
}

export const speakers: Speaker[] = [
  {
    id: "sadiq",
    name: "Sadiq Rabiu",
    organization: "Bitdevs Mauritius & OSGuild Founder",
    image: sadiqImage,
    github: "https://github.com/sadeeqrabiu"
  }
];
