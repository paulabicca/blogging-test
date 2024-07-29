import "../styles/CommentsList.css";
import { Comment } from "../types/Posts";
import { useState } from "react";
import ReplyTextarea from "../components/ReplyTextarea";
import { useData } from "../hooks/useData";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Modal from "../components/Modal";
import UserProfile from "../components/UserProfile";
import "../styles/CommentsCard.css";

const calculateIndentation = (id?: number) => {
  if (id === undefined) {
    return 0;
  }
  return id >= 2 ? 20 * Math.pow(2, id - 2) : 0;
};

const CommentsCard = ({
  comment,
  addReply,
}: {
  comment: Comment;
  addReply: (reply: Comment, parentId: number) => void;
}) => {
  const indentation = calculateIndentation(comment.respondsTo?.id);
  const [isReplying, setIsReplying] = useState(false);
  const [userId, setUserId] = useState<number>(0);
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

    if (isNaN(date.getTime())) return "00/00/0000";
    return format(date, "d MMM yyyy, 'às' HH'h':mm", { locale: ptBR });
  };

  const formattedDate = formatTimestamp(comment?.timestamp);

  const handleId = () => {
    if (comment && comment?.author && comment?.author?.id) {
      setUserId(comment.author.id);
    }
  };

  return (
    <div className="main__coments_block" style={{ marginLeft: indentation }}>
      <div className="main__coments_info">
        <Modal
          id="modal_users"
          title=""
          trigger={
            <div>
              <a href="#modal-users" onClick={handleId}>{comment.author.username}</a> - {" "}
              {formattedDate}
            </div>
          }
          content={
        <UserProfile userId={userId}/>
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
          message={"Digite aqui sua mensagem :)"}
          onChange={(e) => setReplyContent(e.target.value)}
          onSave={handleReplyClick}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentsCard
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

export default CommentsCard;
