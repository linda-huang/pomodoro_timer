import React, { useState } from 'react';
// import Draggable from 'react-draggable';
import SandboxModal from './settings-modal';
// import Draggable from './draggable';
// import Button from './button';

export default function ModalWrapper ({updateMin}) {

    const [hide, setHide] = useState(true);

    const handleClick = () => {
        setHide(false);
    }

    return(
        <div>
            <button onClick={handleClick}>
                    Settings
            </button>
            <div>
                <SandboxModal hide={hide} onClose={(input) => setHide(input)}/>
            </div>
        </div>
    )
}