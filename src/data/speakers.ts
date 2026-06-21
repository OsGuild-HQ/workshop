export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  image?: string;
}

export const speakers: Speaker[] = [];
