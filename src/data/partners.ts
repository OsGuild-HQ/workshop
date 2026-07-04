import osguildLogo from '../assets/osguild.png';
import osguildWhiteLogo from '../assets/Osguils-white.png';
import gdgLogo from '../assets/GDG.png';
import bitdevsLogo from '../assets/bitdevs-black.png';
import bitdevsWhiteLogo from '../assets/bitdevs-white.png';

export interface Partner {
  id: string;
  name: string;
  logo: string | null;
  logoDark?: string | null;
  placeholder: boolean;
  website?: string;
}

export const partners: Partner[] = [
  { 
    id: "osguild", 
    name: "OSGuild", 
    logo: osguildLogo, 
    logoDark: osguildWhiteLogo, 
    placeholder: false,
    website: "https://osguild.dev"
  },
  { 
    id: "bitdevs-mu", 
    name: "BitDevs Mauritius", 
    logo: bitdevsLogo, 
    logoDark: bitdevsWhiteLogo, 
    placeholder: false,
    website: "https://www.bitdevsmauritius.org/"
  },
  { 
    id: "gdg", 
    name: "GDG", 
    logo: gdgLogo, 
    placeholder: false,
    website: "https://gdg.community.dev/gdg-on-campus-university-of-mauritius-reduit-mauritius/"
  },
];
