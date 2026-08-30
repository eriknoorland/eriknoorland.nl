import React, { useState, useEffect, useRef } from 'react';
import type { TModalProps } from './interfaces';
import './styles.scss';

const Modal = (props: TModalProps) => {
  const [isModalOpen, setModalOpen] = useState(props.isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (props.onClose) {
      props.onClose();
    }

    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="modal"
    >
      <div
        className="modal__close"
        onClick={handleCloseModal}
      />

      {props.children}
    </dialog>
  );
};

export default Modal;