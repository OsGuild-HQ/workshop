import sadiqImage from '../assets/speakers/Sadiq.jpg';
import simonImage from '../assets/speakers/simon.jpeg';
import chuksImage from '../assets/speakers/chuks.jpg';
import hanifImage from '../assets/speakers/Hanif.jpg';
import toosharImage from '../assets/speakers/Tooshar.jpg';

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
  },
  {
    id: "simon",
    name: "Simon",
    organization: "Bitcoin educator/opensource contributor and coofounder BitDevs Nairobi",
    image: simonImage,
    github: "https://github.com/xyephy"
  },
  {
    id: "chuks",
    name: "Chuks Agbakuru",
    organization: "Btrust Grantee & LDK contributor",
    image: chuksImage,
    github: "https://github.com/chuksys?ref=blog.btrust.tech"
  },
  {
    id: "hanif",
    name: "Hanif Olayiwola",
    organization: "Founder, The Blockchain Society ALCHE",
    image: hanifImage,
    github: ""
  },
  {
    id: "tooshar",
    name: "Tooshar Sauntoo",
    organization: "Software engineer",
    image: toosharImage,
    github: "https://github.com/TxKxS"
  }
];
