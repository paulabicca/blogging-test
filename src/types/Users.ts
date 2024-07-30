import { users } from '../data/users';

export interface UserPost {
  id: number;
  title: string;
  subtitle: string;
  content: string;
}

export interface User {
  id: number;
  username: string;
  memberSince: string;
  friendIds: number[];
  posts: {
    id: number;
    title: string;
    subtitle: string;
    content: string;
  }[];
}

export const fetchUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 10));
  return users;
};

