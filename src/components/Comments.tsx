import { useState } from "react";
import "../styles/Comments.css";
import { usePost } from "../hooks/usePost";

const Comments = () => {
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const { post, formattedDate, loading, error } = usePost();

  const handleClick = (commentId: number) => {
    setActiveCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Comentário não encontrado.</p>;

  return (
    <div className="main__comments">
      <h2 className="main__comments_title">Comentários</h2>
      {post.comments.map((comment) => (
        <div className="main__coments_block" key={comment.id}>
          <div className="main__coments_info">
            <a href="#">{comment.author.username} </a> - {formattedDate}
          </div>
          <p className="main__coments_paragraph">{comment.content}</p>
          {activeCommentId === comment.id && (
            <textarea
              className="main__comments_reply"
              placeholder="Escreva sua resposta aqui :)"
            ></textarea>
          )}

          <div className="main__comments_btns">
            <button className="btn">compartilhar</button>
            <button className="btn" onClick={() => handleClick(comment.id)}>
              responder
            </button>

            <button className="btn">reportar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
