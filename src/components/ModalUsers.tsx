import React, { useState } from 'react';
import '../styles/ModalUsers.css'; 

interface ModalProps {
  id: string;
  title: string;
  content: React.ReactNode;
  trigger: React.ReactNode;
}

  const ModalUsers = ({ id, title, content, trigger }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
    <div onClick={handleOpen} className="modal__trigger">
      {trigger}
    </div>
    {isOpen && (
      <div id={id} className="modal">
        <div className="modal__content">
          <h1>{title}</h1>
          <div>{content}</div>
          <div className="modal__footer">
            <button onClick={handleClose} className="modal__close">
              &times;
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default ModalUsers;
