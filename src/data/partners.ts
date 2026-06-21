export interface Partner {
  id: string;
  name: string;
  logo: string | null;
  placeholder: boolean;
}

export const partners: Partner[] = [
  { id: "osguild", name: "OSGuild", logo: null, placeholder: false },
  { id: "bitdevs-mu", name: "BitDevs Mauritius", logo: null, placeholder: false },
  { id: "slot-3", name: "Your logo here", logo: null, placeholder: true },
  { id: "slot-4", name: "Your logo here", logo: null, placeholder: true },
  { id: "slot-5", name: "Your logo here", logo: null, placeholder: true },
];
