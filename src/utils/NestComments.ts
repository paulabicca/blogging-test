import { Comment } from '../types/Posts';

export const NestComments = (comments: Comment[]) => {
  const map = new Map<number, Comment>();

  comments.forEach(comment => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  const tree: Comment[] = [];

  comments.forEach(comment => {
    if (comment.respondsTo) {
      const parent = map.get(comment.respondsTo.id);
      if (parent) {
        parent.replies?.push(map.get(comment.id)!);
      }
    } else {
      tree.push(map.get(comment.id)!);
    }
  });

  return tree;
};
