import React, { useState, useEffect } from 'react';
// import Draggable from 'react-draggable';
import SandboxModal from './settings-modal';
// import Draggable from './draggable';
// import Button from './button';

export default function ModalWrapper () {

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

    return(
        <div>
            <button onClick={handleClick}>
                    Settings
            </button>
            <div>
                <SandboxModal hide={hide} />
            </div>
        </div>
    )
}