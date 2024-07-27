import React from "react";

const ReplyTextarea = ({
  value,
  onChange,
  onSave,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSave: () => void;
}) => {
  return (
    <div>
      <textarea
        className="main__comments_reply"
        placeholder="Escreva sua resposta aqui :)"
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
