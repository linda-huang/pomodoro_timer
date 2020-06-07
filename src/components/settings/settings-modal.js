import React, { useEffect } from 'react';
import './modal.css';
// import { Keyboard } from 'react-native';

export default function SandboxModal ({hide, onClose}) {

    useEffect(() => {
        if (onClose) {
            window.addEventListener('keydown', listenKeyboard, true);
            return () => window.removeEventListener('keydown', listenKeyboard, true);
        }
    }, [])
          
    const listenKeyboard = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            onClose(true);
        }
    }

    const onDialogClick = (event) => {
        event.stopPropagation();
    }
  
    if (hide) return null;

    else {
        return (
            <div>
              <div className="modal-content-div">
                <div className="modal-dialog-div" onClick={onDialogClick}>
                  <h1> Floaty Modal :) </h1>
                </div>
                <button onClick={onClose}>
                    Save
                </button>
              </div>
            </div>
          );
    }
}