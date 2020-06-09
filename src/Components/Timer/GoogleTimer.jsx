import './timers.css';
import React, { useState, useEffect } from 'react';

//sleek google version
export default function GoogleTimer (){
    const [time, setTime] = useState();
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [color, setColor] = useState("#21b8a1");

    const changeTime = (event) => {
        const time = event.currentTarget.value;
        if (!isNaN(parseInt(time)) || time == ""){
            setTime(time);
            const temp = parseInt(time);
            if (isNaN(temp)){
                setMinute(0);
                setHour(0);
            }
            else if (temp > 99){
                setMinute(temp % 100);
                setHour(Math.floor(temp/100));
            }
            else{
                setMinute(temp);
                setHour(0);
            }
            
        }
    }

    const changeColor1 = event =>{
        setColor("#84e3d1")
    }

    const changeColor2 = event =>{
        setColor("#21b8a1")
    }
    return(
        
        <div class ="container">
            
            <div>
                <input
                    type = "text"
                    class = "hideInput"
                    placeholder = "0"
                    maxlength = "4"
                    size = "19"
                    value = {time}
                    onBlur = {changeColor2}
                    onFocus = {changeColor1}
                    onChange = {changeTime}
                    
                />
            </div>
            <div>
                <h1 class = "timeDisplay"
                    style = {{
                        color: color
                    }}>
                    {hour < 10? `0${hour}` : hour}h {minute < 10? `0${minute}` : minute}m
                </h1>
            </div>
            
        </div>
        )
}