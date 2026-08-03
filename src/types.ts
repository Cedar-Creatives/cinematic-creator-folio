export interface PortfolioProject {
  id: string;
  title: string;
  category: 'video' | 'graphic' | 'branding' | 'motion' | 'photo';
  thumbnail: string;
  mediaUrl?: string;
  description: string;
  tags: string[];
  year: number;
  client?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'editing' | 'design' | 'motion' | 'color' | 'tools';
  level: number; // 0-100
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}