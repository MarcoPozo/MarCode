export interface LocalizedText {
  es: string;
  en: string;
}

export interface Project {
  id: number;
  title: string;
  category: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
}
