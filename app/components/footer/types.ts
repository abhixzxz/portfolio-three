export interface FooterLink {
  label: string;
  href: string;
}

export interface SlideImage {
  url: string;
  alt: string;
}

export interface IconProps {
  name: string;
  size?: number;
}

export interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

export interface ContactInfoProps {
  email: string;
  location: string;
}

export interface SocialLinksProps {
  github: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  
}
