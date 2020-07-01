import React, { useState, useEffect, useRef } from "react";
import SandboxModal from './settings-modal';
import Burger from './burger-button';
import StyledMenu from './menu.styles'

export default function SlidingMenu ({start}) {

    const [hide, setHide] = useState(true);
    
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

    useEffect(() => {
        if (start === true) {
          setHide(true);
        }
      }, [start]);

    return (
        <div ref={node}>
            <Burger hide={hide} setHide={setHide}/>
            <SandboxModal
                hide={hide}
                setHide={(input) => setHide(input)}/>
        </div>
    )
}

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
            return null;
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