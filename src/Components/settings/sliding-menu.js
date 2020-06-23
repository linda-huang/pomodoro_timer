import React, { useState, useEffect, useRef } from "react";
import SandboxModal from './settings-modal';
import './modal.css'
import Burger from './burger-button';
import StyledMenu from './menu.styles'

export default function SlidingMenu ({start}) {

    const [hide, setHide] = useState(true);
    
    // ref is a way for us to directly access the html of an element
    const node = useRef();

    useOnClickOutside(node, () => setHide(true));

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
        <div ref={node}>
            {/* <img onClick={handleClick}  src="https://image.flaticon.com/icons/svg/2016/2016012.svg" alt="burger icon" /> */}
            <Burger hide={hide} setHide={setHide}/>
            <SandboxModal
                hide={hide}
                start={start}
                setHide={(input) => setHide(input)}/>
        </div>
    )
}

// defining our own custom react hook
const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }
        handler(event);
        };
        document.addEventListener('mousedown', listener);
        return () => {
        document.removeEventListener('mousedown', listener);
        };
    },
    [ref, handler],
    );
    };