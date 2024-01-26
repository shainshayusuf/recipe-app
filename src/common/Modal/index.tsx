import React, { useState } from 'react';
import './style.css'; // Import your modal styles
import ReactDOM from 'react-dom';


type ModalProps = {
    showModal: boolean;
    closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
    return ReactDOM.createPortal( <div className={`modal ${showModal ? 'show' : ''}`}>
    <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Modal Title</h2>
        <p>This is the content of the modal.</p>
    </div>
</div> , document.getElementsByClassName('app')[0]);
};

export default Modal;
