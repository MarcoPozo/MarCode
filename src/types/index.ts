export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
}
