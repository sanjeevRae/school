export interface SchoolSettings {
  id: string;
  schoolName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  favicon: string;
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
  aboutText: string;
  visionText: string;
  missionText: string;
  aboutSectionLabel: string;
  aboutSectionTitle: string;
  aboutImage1: string;
  aboutImage2: string;
  aboutImage3: string;
  aboutImage4: string;
  aboutFeature1Title: string;
  aboutFeature1Desc: string;
  aboutFeature2Title: string;
  aboutFeature2Desc: string;
  aboutFeature3Title: string;
  aboutFeature3Desc: string;
  aboutFeature4Title: string;
  aboutFeature4Desc: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

export interface CoreValue {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  fullContent: string;
  features: string[];
  order: number;
  isActive: boolean;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  publishedAt: string;
  isActive: boolean;
  updatedAt: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix: string;
  icon: string;
  order: number;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

export interface AdmissionInfo {
  id: string;
  title: string;
  content: string;
  requirements: string[];
  process: string[];
  fees: string;
  updatedAt: string;
}

export interface CareerPost {
  id: string;
  title: string;
  department: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  postedAt: string;
  updatedAt: string;
}

export interface PageContent {
  id: string;
  page: string;
  section: string;
  content: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category: string;
  order: number;
  isActive: boolean;
  updatedAt: string;
}
