import '../timer/timers.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setWorkHour, setWorkMin, setWorkSec } from './inputDucks';

//sleek google version
function WorkInput ({setWorkHour, setWorkMin, setWorkSec, save, setSave, use, work_hour, work_min, work_sec, work_countdown, break_countdown}){

    const [time, setTime] = useState();
    const [hour, setHour] = useState(work_hour);
    const [minute, setMinute] = useState(work_min);
    const [second, setSecond] = useState(work_sec)
    const [color, setColor] = useState();
    const [cursor, setCursor] = useState("");
    const [line, setLine] = useState("none");


    const changeTime = (event) => {
        const time = event.currentTarget.value;
        if (!isNaN(parseInt(time)) || time === ""){
            setTime(time);
            const temp = parseInt(time);
            if (isNaN(temp)){
                setMinute(0);
                setHour(0);
                setSecond(0);
            }
            else if (temp > 9999){
                const tempHour = Math.floor(temp/10000)
                const temp2 = temp % (tempHour * 10000);
                const tempMinute = Math.floor(temp2/100);
                setHour(tempHour);
                setMinute(tempMinute);
                setSecond(temp2 - tempMinute * 100);  
            }
            else if (temp > 99){
                setSecond(temp % 100);
                setMinute(Math.floor(temp/100));
                setHour(0);
            }
            else{
                setSecond(temp);
                setMinute(0);
                setHour(0);
            }
            
        }
    }

    const blur = (event) => {
        setColor("#999999");
        setCursor("");
        setLine("none")

    }

    const focus = (event) => {
        setColor("#CCCCCC");
        setCursor("|");
        setLine("block");
    }

    useEffect(() => {
        if (save === true) {
            recalibrate(second, minute)
            setSave(false)
        }
    }, [save])

    //recalculate hours and minutes when minutes > 59
    function recalibrate (inputSecond, inputMinute){
        let actionHour = hour
        let actionMinute = minute
        let actionSecond = second

        if (second > 59){
            let extraMinute = Math.floor(inputSecond/60);
            inputSecond = inputSecond % 60;
            actionMinute = minute + extraMinute;
            actionSecond = inputSecond;
        }
        if (minute > 59){
            let extraHour = Math.floor(inputMinute/60);
            inputMinute = inputMinute % 60;
            actionHour = hour + extraHour;
            actionMinute = inputMinute;
        }

        setWorkMin(actionMinute);
        setWorkHour(actionHour);
        setWorkSec(actionSecond);
    }
    if (use === 'countdown' && (work_countdown === true || break_countdown === true)) {
        return null
    }
    else {
        return(   
            <div>
                <div className ="container">  
                    <div>
                        <input
                            type = "text"
                            className = "hideInput"
                            //maxlength = "4"
                            size = "29"
                            value = {time}
                            onBlur = {blur}
                            onFocus = {focus}
                            onChange = {changeTime}    
                        />
                    </div>
    
                    <div>
                        <h1 className = "timeDisplay"
                            style = {{
                                color: color
                            }}>
                            {hour < 10? `0${hour}` : hour}h {minute < 10? `0${minute}` : minute}m {second < 10? `0${second}` : second}{cursor}s
                        </h1>
                        <hr style = {{
                            display: line
                        }}></hr>

                    </div>  
    
                    {/* <div style = {{
                        display: hide,
                    }}>
                        <button onClick={handleOnClick}>
                            Submit
                        </button> 
                    </div>  */}
                </div>
            </div>
            )
    }
}

const mapDispatchToProps = dispatch => ({
    setWorkMin: minutes => dispatch(setWorkMin(minutes)),
    setWorkHour: hours => dispatch(setWorkHour(hours)),
    setWorkSec: seconds => dispatch(setWorkSec(seconds)),
  })

const mapStateToProps = state => ({
    work_hour : state.workLength.work_hour,
    work_min : state.workLength.work_min,
    work_sec : state.workLength.work_sec,
    work_countdown : state.countdown.work_countdown,
    break_countdown : state.countdown.break_countdown
    
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkInput)
