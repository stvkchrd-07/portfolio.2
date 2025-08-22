export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  date: string;
}
