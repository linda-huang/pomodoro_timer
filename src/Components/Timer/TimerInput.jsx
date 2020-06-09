import React, { useState, useEffect } from 'react';
import './timers.css';

//sad version ;-;
export default function TimerInput (hours, minutes, displayInput){

    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [start, setStart] = useState(false);


    //recalculate hours and minutes when minutes > 59
    function recalibrate (inputSecond, inputMinute){
        if (inputSecond > 59){
            const extraMinute = Math.floor(inputSecond/60);
            inputSecond = inputSecond % 60;
            setMinute(0 + extraMinute);
            console.log(0+extraMinute);
            setSecond(inputSecond);
        }
        if (minute > 59){
            const extraHour = Math.floor(inputMinute/60);
            inputMinute = inputMinute % 60;
            setHour(parseInt(hour) + extraHour);
            setMinute(inputMinute);
        }
    }

    const handleOnClick = event =>{
        setStart(!start);
        console.log("start timer", start);
    }

    useEffect(()=>{  
        if (start){
            const interval = setInterval(() => {
                if (second > 0){
                    setSecond(second - 1);
                }
                else {
                    if (minute === 0){
                        if (hour > 0){
                            setSecond(59)
                            setMinute(59);
                            setHour(hour - 1);
                        }
                    }
                    else{
                        setMinute(minute-1);
                        setSecond(59);
                    }
                }
            },1000)
            return () => clearInterval(interval)
        }
    });

    return (

        <div>
        
            <center>
                <button onClick={handleOnClick}>
                    Start
                </button>
                <h1 style = {{
                    display: displayInput
                }}>
                    {hour < 10? `0${hour}` : hour}h {minute < 10? `0${minute}` : minute}m {second < 10? `o${second}`:second}s
                </h1>
            </center>
         
        </div>
    )
}