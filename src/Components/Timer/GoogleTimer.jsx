import './timers.css';
import React, { useState} from 'react';
import TimerInput from './TimerInput';

//sleek google version
export default function GoogleTimer (){

    const [time, setTime] = useState();
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [color, setColor] = useState("#21b8a1");
    const [start, setStart] = useState("none");
    const [hide, setHide] = useState("flex");
    const [submit, setSubmit] = useState(false);


    const changeTime = (event) => {
        const time = event.currentTarget.value;
        if (!isNaN(parseInt(time)) || time === ""){
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


    const handleOnClick = event =>{
        recalibrate(minute);
        setSubmit(true);
        setStart("block");
        setHide("none");
    }


    //recalculate hours and minutes when minutes > 59
    function recalibrate (inputMinute){
        if (minute > 59){
            const extraHour = Math.floor(inputMinute/60);
            inputMinute = inputMinute % 60;
            setHour(hour + extraHour);
            setMinute(inputMinute);
            
        }
    }

    return(   
        <div>
            <div>
                <p>
                    hello
                </p>
            </div>
            <div class ="container"
                style = {{
                display: hide,
            }}
            >  
                <div>
                    <input
                        type = "text"
                        class = "hideInput"
                        placeholder = "0"
                        maxlength = "4"
                        size = "19"
                        value = {time}
                        onBlur = {() => setColor("#21b8a1")}
                        onFocus = {() => setColor("#84e3d1")}
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

                <div style = {{
                    display: hide,
                }}>
                    <button onClick={handleOnClick}>
                        Submit
                    </button> 
                </div> 
            </div>

            <div>
                <center>
                    <div>
                        <TimerInput hours = {hour} minutes = {minute} displayInput = {start} submitted = {submit}/>
                    </div>
                </center>
            </div>
        </div> 
        )
}