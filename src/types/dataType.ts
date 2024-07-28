import { rawPost } from "../data/rawPost";

export const fetchData = async (): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return rawPost;
};

export interface Author {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  respondsTo: { id: number } | null;
  author: Author;
  timestamp: string;
  content: string;
  replies?: Comment[];
}

export interface Post {
  id: number;
  timestamp: string;
  author: Author;
  title: string;
  subtitle: string;
  content: string;
  comments: Comment[];
}
