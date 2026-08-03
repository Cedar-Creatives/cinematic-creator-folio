import type { PortfolioProject, Skill, Service, Testimonial, SocialLink } from '../types';

export const PERSONAL_INFO = {
  name: 'Dauda Yakubu',
  title: 'Content Creator | Video Editor | Graphic Designer',
  tagline: 'Cinematic Storytelling Through Motion & Design',
  bio: 'I craft visual narratives that captivate, inspire, and leave a lasting impression. With over 5 years of experience in video editing, motion graphics, and graphic design, I transform raw footage into cinematic masterpieces.',
  email: 'yakubuimakhu@gmail.com',
  phone: '+2349152051610',
  location: 'Nigeria',
  avatar: '/b1.jpg',
  resumeUrl: '#',
};

export const HERO_BACKGROUND = '/b1.jpg';

export const projects: PortfolioProject[] = [
  {
    id: 'p1',
    title: 'Cinematic Brand Reel',
    category: 'video',
    thumbnail: 'https://img.youtube.com/vi/c_cuRuA4_sM/maxresdefault.jpg',
    mediaUrl: 'https://www.youtube.com/embed/c_cuRuA4_sM',
    description: 'A cinematic brand reel showcasing storytelling through motion, color grading, and sound design. Shot and edited to deliver a high-impact visual experience.',
    tags: ['Cinematic', 'Color Grading', 'Sound Design', 'Storytelling'],
    year: 2024,
    featured: true,
  },
  {
    id: 'p2',
    title: 'Short Film / Reel',
    category: 'video',
    thumbnail: 'https://img.youtube.com/vi/MRBFkB34Eas/maxresdefault.jpg',
    mediaUrl: 'https://www.youtube.com/embed/MRBFkB34Eas',
    description: 'A punchy YouTube Short — fast-cut editing, dynamic transitions, and engaging visual rhythm designed to hold attention from first frame to last.',
    tags: ['Short Form', 'Fast Cuts', 'Transitions', 'Reels'],
    year: 2024,
    featured: true,
  },
  {
    id: 'p3',
    title: 'Creative Video Edit',
    category: 'video',
    thumbnail: 'https://img.youtube.com/vi/jA2BRaxfFbc/maxresdefault.jpg',
    mediaUrl: 'https://www.youtube.com/embed/jA2BRaxfFbc',
    description: 'A creative video edit with expressive cuts, visual effects, and an immersive soundtrack that draws viewers into the story.',
    tags: ['Creative Edit', 'VFX', 'Motion', 'Immersive'],
    year: 2024,
    featured: false,
  },
  {
    id: 'p4',
    title: 'Cinematic Visual Story',
    category: 'video',
    thumbnail: 'https://img.youtube.com/vi/xLMPl8yTWiU/maxresdefault.jpg',
    mediaUrl: 'https://www.youtube.com/embed/xLMPl8yTWiU',
    description: 'A cinematic visual narrative combining seamless transitions, colour-graded footage, and emotive audio to produce a compelling watch.',
    tags: ['Narrative', 'Cinematic', 'Color Grade', 'Audio'],
    year: 2024,
    featured: true,
  },
  {
    id: 'p5',
    title: 'TikTok Content — Viral Reel',
    category: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1611605698335-8441a2ec5b8c?w=800&q=80',
    mediaUrl: 'https://vm.tiktok.com/ZS4kqsu9J/',
    description: 'Engaging short-form TikTok content crafted for maximum retention — snappy edits, trending audio, and visual hooks that drive shares and follows.',
    tags: ['TikTok', 'Short Form', 'Viral', 'Social Media'],
    year: 2024,
    featured: false,
  },
  {
    id: 'p6',
    title: 'Instagram Reel — Motion Edit',
    category: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    mediaUrl: 'https://www.instagram.com/reel/DB4CfVgime1/',
    description: 'A stylised Instagram Reel with smooth motion edits, text animations, and platform-optimised vertical framing for peak engagement.',
    tags: ['Instagram', 'Reel', 'Vertical', 'Motion Edit'],
    year: 2024,
    featured: false,
  },
  {
    id: 'p7',
    title: 'Graphic Design — Visual 1',
    category: 'graphic',
    thumbnail: '/b2.jpg',
    description: 'Professional graphic design work — bold composition, intentional typography, and a strong visual identity that communicates with impact.',
    tags: ['Graphic Design', 'Typography', 'Composition', 'Branding'],
    year: 2024,
    featured: true,
  },
  {
    id: 'p8',
    title: 'Graphic Design — Visual 2',
    category: 'graphic',
    thumbnail: '/b3.jpg',
    description: 'A visually striking design piece with clean layout principles, colour harmony, and purposeful use of negative space.',
    tags: ['Design', 'Layout', 'Colour', 'Visual Identity'],
    year: 2024,
    featured: false,
  },
  {
    id: 'p9',
    title: 'Graphic Design — Visual 3',
    category: 'graphic',
    thumbnail: '/b4.jpg',
    description: 'Creative artwork combining illustration, digital manipulation, and typographic elements for a cohesive brand-forward design.',
    tags: ['Illustration', 'Digital Art', 'Brand Design', 'Creative'],
    year: 2024,
    featured: false,
  },
  {
    id: 'p10',
    title: 'Graphic Design — Visual 4',
    category: 'graphic',
    thumbnail: '/b5.jpg',
    description: 'A polished graphic design showcasing proficiency in layout, hierarchy, and visual storytelling through still imagery.',
    tags: ['Poster', 'Layout', 'Hierarchy', 'Visual'],
    year: 2024,
    featured: false,
  },
  {
    id: 'p11',
    title: 'Graphic Design — Visual 5',
    category: 'graphic',
    thumbnail: '/b6.jpg',
    description: 'Bold and expressive design work with strong use of colour blocking, modern typography, and a clear messaging hierarchy.',
    tags: ['Bold Design', 'Colour Blocking', 'Modern', 'Typography'],
    year: 2023,
    featured: false,
  },
  {
    id: 'p12',
    title: 'Graphic Design — Visual 6',
    category: 'graphic',
    thumbnail: '/b7.jpg',
    description: 'A detailed graphic design piece that blends creativity with technical precision — every element intentionally placed for maximum visual impact.',
    tags: ['Precision', 'Creative', 'Design', 'Impact'],
    year: 2023,
    featured: false,
  },
];

export const skills: Skill[] = [
  // Primary editing tools
  { name: 'CapCut', category: 'editing', level: 97 },
  { name: 'Premiere Pro', category: 'editing', level: 95 },
  { name: 'InShot', category: 'editing', level: 93 },
  { name: 'Final Cut Pro', category: 'editing', level: 75 },
  // Design tools
  { name: 'PicsArt', category: 'design', level: 96 },
  { name: 'PixelLab', category: 'design', level: 94 },
  { name: 'Photoshop', category: 'design', level: 92 },
  { name: 'Illustrator', category: 'design', level: 85 },
  // Color & motion
  { name: 'DaVinci Resolve', category: 'color', level: 90 },
  { name: 'After Effects', category: 'motion', level: 88 },
  { name: 'Lightroom', category: 'color', level: 80 },
];

export const services: Service[] = [
  {
    title: 'Video Editing',
    description: 'Cinematic cuts, color grading, sound design, and storytelling that elevates raw footage into compelling narratives.',
    icon: 'Film',
  },
  {
    title: 'Motion Graphics',
    description: 'Animated typography, logo reveals, explainer videos, and dynamic visual effects that bring ideas to life.',
    icon: 'Sparkles',
  },
  {
    title: 'Graphic Design',
    description: 'Brand identities, social media assets, print materials, and visual systems that communicate with impact.',
    icon: 'Palette',
  },
  {
    title: 'Color Grading',
    description: 'Professional color correction and creative grading using DaVinci Resolve to establish mood and visual consistency.',
    icon: 'Eye',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Dauda transformed our raw footage into something truly cinematic. His eye for color and pacing is unmatched. Our clients were blown away.',
    author: 'Sarah Mensah',
    role: 'Creative Director, Luxe Essence',
  },
  {
    id: 't2',
    quote: 'Working with Dauda on the music video was a dream. He understood the creative vision immediately and added layers we never imagined.',
    author: 'Manny Rio',
    role: 'Musician / Artist',
  },
  {
    id: 't3',
    quote: 'The brand identity Dauda created for us was exactly what we needed — modern, cohesive, and instantly recognizable.',
    author: 'Kwame Asante',
    role: 'CEO, TechVault Inc.',
  },
];

export const socialLinks: SocialLink[] = [
  { platform: 'Instagram', url: 'https://www.instagram.com/iam_barony1?igsh=MXBud3czOXc4ZjBs', icon: 'InstagramLogo' },
  { platform: 'YouTube', url: 'https://youtube.com/@iam_barony?si=lXeKSp-mnLs9XoZN', icon: 'YoutubeLogo' },
  { platform: 'TikTok', url: 'https://vm.tiktok.com/ZS9hrJ88qb6SN-gTbZx/', icon: 'TikTokLogo' },
  { platform: 'Facebook', url: 'https://www.facebook.com/share/1Bp2ER6qo9/', icon: 'FacebookLogo' },
  { platform: 'X / Twitter', url: 'https://x.com/Baronyagain?t=9Wn766hXW8p5YpOLehHnKA&s=09', icon: 'TwitterLogo' },
];
