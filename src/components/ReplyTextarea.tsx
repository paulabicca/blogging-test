import React from "react";
import "../styles/ReplyTextarea.css";

const ReplyTextarea = ({
  value,
  message,
  onChange,
  onSave,
}: {
  value: string;
  message: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSave: () => void;
}) => {
  return (
    <div>
      <textarea
        className="reply"
        placeholder={message}
        value={value}
        onChange={onChange}
      ></textarea>
      <button className="btn" onClick={onSave}>
        Salvar
      </button>
    </div>
  );
};

export default ReplyTextarea;
