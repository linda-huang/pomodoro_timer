import React, { useState, useEffect } from 'react';


export default function TimerInput (){

    const [hour, setHour] = useState(1);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [start, setStart] = useState(false);

    const changeHour = event =>{
        const hour = event.currentTarget.value;
        setHour(hour);
    }
    const changeMinute = event =>{
        const minute = event.currentTarget.value;
        setMinute(minute);
    }
    const changeSecond = event =>{
        const second = event.currentTarget.value;
        setSecond(second);
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
            <input
            type = "number"
            min = "0"
            max = "23"
            placeholder = "0"
            value = {hour}
            onChange = {changeHour}
            />
            <input
            type = "number"
            min = "0"
            max = "59"
            placeholder = "0"
            value = {minute}
            onChange = {changeMinute}
            />
             <input
            type = "number"
            min = "0"
            max = "59"
            placeholder = "0"
            value = {second}
            onChange = {changeSecond}
            />
            <button onClick={handleOnClick}>
                Start
            </button>
            <div>
        
                {start === true
                    ? <h1>Time Remaining: {hour < 10 ? `0${hour}`: hour}:{minute < 10 ? `0${minute}`: minute}:{second < 10 ? `0${second}` : second}</h1>
                    : <h1> Time Remaining: 00:00:00</h1>
                }
            </div>
            
    
        </div>
    )
}

