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

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialogElement = modalRef.current;

    if (!dialogElement) {
      return;
    }

    const rect = dialogElement.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );

    if (!isInDialog) {
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
      onClick={handleBackdropClick}
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