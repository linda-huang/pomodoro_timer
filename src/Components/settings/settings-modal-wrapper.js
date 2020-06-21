import React, { useState, useEffect } from 'react';
import SandboxModal from './settings-modal';
import "./modal.css";


export default function ModalWrapper ({start}) {

    const [hide, setHide] = useState(true);

    const handleClick = () => {
        setHide(!hide);
    }

    useEffect(() => {
        if (hide) {
            window.addEventListener('keydown', listenKeyboard, true);
            return () => window.removeEventListener('keydown', listenKeyboard, true);
        }
    }, [])
          
    const listenKeyboard = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            setHide(true);
        }
    }

    return (
      <div>
        <button onClick={handleClick} >
          Settings
        </button>
        <div>
          <SandboxModal
            hide={hide}
            start={start}
            setHide={(input) => setHide(input)}
          />
        </div>
      </div>
    );
}