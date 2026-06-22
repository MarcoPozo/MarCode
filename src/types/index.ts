export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  icon?: string;
  level?: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}
