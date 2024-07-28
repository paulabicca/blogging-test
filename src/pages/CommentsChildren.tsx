import "../styles/Comments.css";
import { Comment } from "../dataType";
import { useState } from "react";
import ReplyTextarea from "../components/ReplyTextarea";
import { useData } from "../hooks/useData";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ModalUsers from "../components/ModalUsers";
import UsersContent from "../components/UsersContent";
import "../styles/CommentsChildren.css";

const calculateIndentation = (id?: number) => {
  if (id === undefined) {
    return 0;
  }
  return id >= 2 ? 20 * Math.pow(2, id - 2) : 0;
};

const CommentsChildren = ({
  comment,
  addReply,
}: {
  comment: Comment;
  addReply: (reply: Comment, parentId: number) => void;
}) => {
  const indentation = calculateIndentation(comment.respondsTo?.id);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { post } = useData();
  const authorId = post?.author?.id || 0;
  const authorUsername = post?.author?.username || "Desconhecido";

  const handleReplyClick = () => {
    if (isReplying && replyContent.trim() !== "") {
      const newReply: Comment = {
        id: authorId,
        respondsTo: { id: comment.id },
        author: { id: authorId, username: authorUsername },
        timestamp: new Date().toISOString(),
        content: replyContent,
        replies: [],
      };
      addReply(newReply, comment.id);
      setReplyContent("");
      setIsReplying(false);
    } else {
      setIsReplying(!isReplying);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) return "****";
    return format(date, "d MMM yyyy, 'às' HH'h':mm", { locale: ptBR });
  };

  const formattedDate = formatTimestamp(comment.timestamp);

  return (
    <div className="main__coments_block" style={{ marginLeft: indentation }}>
      <div className="main__coments_info">
        <ModalUsers
          id="modal_users"
          title=""
          trigger={
            <div>
              <a href="#modal-users">{comment.author.username}</a> -{" "}
              {formattedDate}
            </div>
          }
          content={
        <UsersContent/>
          }
        />
      </div>
      <p className="main__coments_paragraph">{comment.content}</p>
      <div className="main__comments_btns">
        <button className="btn">Compartilhar</button>
        <button className="btn" onClick={handleReplyClick}>
          Responder
        </button>
        <button className="btn">Reportar</button>
      </div>
      {isReplying && (
        <ReplyTextarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          onSave={handleReplyClick}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentsChildren
              key={reply.id}
              comment={reply}
              addReply={addReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsChildren;
