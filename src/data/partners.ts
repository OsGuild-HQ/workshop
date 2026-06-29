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
}

export const partners: Partner[] = [
  { id: "osguild", name: "OSGuild", logo: osguildLogo, logoDark: osguildWhiteLogo, placeholder: false },
  { id: "bitdevs-mu", name: "BitDevs Mauritius", logo: bitdevsLogo, logoDark: bitdevsWhiteLogo, placeholder: false },
  { id: "gdg", name: "GDG", logo: gdgLogo, placeholder: false },
];
