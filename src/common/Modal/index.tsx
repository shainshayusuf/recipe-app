import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import './style.css';

type ModalProps = {
    showModal: boolean;
    closeModal: () => void;
    title: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, title, children }) => {
    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto'; 
        };
    }, [showModal]);
    return ReactDOM.createPortal(<div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{title}</h2>
            <div>
                {children}
            </div>
        </div>
    </div>, document.getElementsByClassName('app')[0]);
};

export default Modal;
