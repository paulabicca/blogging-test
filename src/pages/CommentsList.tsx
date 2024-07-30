import { useState } from 'react';
import CommentsCard from './CommentsCard';
import { rawPost } from '../data/rawPost';
import { Post, Comment } from '../types/Posts';
import "../styles/CommentsList.css";
import React from 'react'

const CommentsList = () => {
  const [post, setPost] = useState<Post>(rawPost);

  const addReply = (reply: Comment, parentId: number) => {
    const addReplyToComment = (comments: Comment[], parentId: number): Comment[] => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies ? [...comment.replies, reply] : [reply]
          };
        } else if (comment.replies) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies, parentId)
          };
        } else {
          return comment;
        }
      });
    };

    setPost(prevPost => ({
      ...prevPost,
      comments: addReplyToComment(prevPost.comments, parentId)
    }));
  };

  return (
    <div className="main__comments">
      <h2 className="main__comments_title">Comentários</h2>
      {post.comments.map((comment) => (
        <CommentsCard key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
};

export default CommentsList;
