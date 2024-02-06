import React, { useRef, useEffect } from 'react';
import styles from './Modal.module.scss';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ isOpen, onClose, children }) => {
  const modalClasses = [styles.modal_wrapper];
  const modalContentRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (isOpen) {
    modalClasses.push(styles.open);
  }

  return (
    <div className={modalClasses.join(' ')} onClick={onClose}>
      <div className={styles.modal_content} ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
        <div className={styles.button_modal}>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
