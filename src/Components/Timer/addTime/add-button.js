import React, { useState, useEffect, useRef } from 'react';
import './add-buttons.scss';
import '../timer.css';
// import './add-plus.scss';

export default function AddTime ({addTime, totalTime}) {

    const addHour = useRef(null);
    const addMin = useRef(null);
    const addSec = useRef(null);
    const labelHour = useRef(null);
    const labelMin = useRef(null);
    const labelSec = useRef(null);

    const [isClicked, setIsClicked] = useState(false);

    const handleHourClick = () => {
        // setIsClicked(true);
        addTime(totalTime + 3600);
        addHour.current.style.background = 'rgba(114, 163, 160, 0.6)';
        labelHour.current.style.color = '#d0ffca';
        labelHour.current.style.animation = 'plus 1s cubic-bezier(0.17, 0.89, 0.32, 1.49)';
        // setIsClicked(false);
    }

    const handleMinClick = () => {
        // setIsClicked(true);
        addTime(totalTime+5*60);
        addMin.current.style.background =  'rgba(114, 163, 160, 0.6)';
        labelMin.current.style.color = '#d0ffca';
        labelMin.current.style.animation = 'plus 1s cubic-bezier(0.17, 0.89, 0.32, 1.49)';
        // setIsClicked(false);
    }

    const handleSecClick = () => {
        // setIsClicked(true);
        addTime(totalTime+10)
        addSec.current.style.background = 'rgba(114, 163, 160, 0.6)';;
        labelSec.current.style.color = '#d0ffca';
        labelSec.current.style.animation = 'plus 1s cubic-bezier(0.17, 0.89, 0.32, 1.49)';
        // setIsClicked(false);
    }

    const handleHourLeave = (e) => {
        addHour.current.style.background = 'rgba(0,0,0,0)';
        labelHour.current.style.color = 'rgb(228, 212, 212)';
        labelHour.current.style.animation = 'none';
    }

    const handleMinLeave = (e) => {
        addMin.current.style.background = 'rgba(0,0,0,0)';
        labelMin.current.style.color = 'rgb(228, 212, 212)';
        labelMin.current.style.animation = 'none';
    }

    const handleSecLeave = (e) => {
        addSec.current.style.background = 'rgba(0,0,0,0)';
        labelSec.current.style.color = 'rgb(228, 212, 212)';
        labelSec.current.style.animation = 'none';
    }

    const handleHourEnter = (e) => {
        addHour.current.style.background = 'rgba(52, 52, 52, 0.5)';
    };

    const handleMinEnter = (e) => {
        addMin.current.style.background = 'rgba(52, 52, 52, 0.5)';
    }

    const handleSecEnter = (e) => {
        addSec.current.style.background = 'rgba(52, 52, 52, 0.5)';
    }

    return(
        <div className='countdown-content'>
            <button 
                className='add-time-button' 
                ref={addHour} 
                onClick={handleHourClick} 
                onMouseLeave={handleHourLeave}
                onMouseEnter={handleHourEnter}>
                    <span 
                        ref={labelHour} 
                        >+1</span></button>
            <button 
                className='add-time-button' 
                ref={addMin} onClick={handleMinClick} 
                onMouseLeave={handleMinLeave}
                onMouseEnter={handleMinEnter}>
                    <span ref={labelMin}>+5</span></button> 
            <button 
                className='add-time-button' 
                ref={addSec} onClick={handleSecClick} 
                onMouseLeave={handleSecLeave}
                onMouseEnter={handleSecEnter}>
                    <span ref={labelSec}>+10</span></button>
        </div>
    )

}

// className={(!isClicked) ? '' : 'add-span'}
