import '../timer/timers.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setBreakHour, setBreakMin, setBreakSec } from './inputDucks'

//sleek google version
function BreakInput ({setBreakHour, setBreakMin, setBreakSec, save, use, break_hour, break_min, break_sec, work_countdown, break_countdown}){

    const [time, setTime] = useState();
    const [hour, setHour] = useState(break_hour);
    const [minute, setMinute] = useState(break_min);
    const [second, setSecond] = useState(break_sec);
    const [color, setColor] = useState();


    const changeTime = (event) => {
        const time = event.currentTarget.value;
        if (!isNaN(parseInt(time)) || time === ""){
            setTime(time);
            let temp = parseInt(time);
            if (isNaN(temp)){
                setMinute(0);
                setHour(0);
                setSecond(0);
            }
            else if (temp > 9999){
                setHour(Math.floor(temp / 10000));
                const temp2 = temp - Math.floor(temp / 100)*100; //first four digits
                setMinute(temp2 - hour * 100);
                setSecond(temp - temp2);
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


    useEffect(() => {
        if (save === true) {
            recalibrate(second, minute)
        }
    }, [save])


    //recalculate hours and minutes when minutes > 59
    function recalibrate (inputSecond, inputMinute){
        let actionHour = hour
        let actionMinute = minute
        let actionSecond = second

        if (second > 59){
            let extraMinute = Math.floor(inputSecond/60);
            console.log("extra minute: ", extraMinute);
            inputSecond = inputSecond % 60;
            actionMinute = 0 + extraMinute;
            actionSecond = inputSecond;
        }
        if (minute > 59){
            let extraHour = Math.floor(inputMinute/60);
            inputMinute = inputMinute % 60;
            actionHour = hour + extraHour;
            actionMinute = inputMinute;
        }
        setBreakMin(actionMinute);
        setBreakHour(actionHour);
        setBreakSec(actionSecond);
    }
    
    if (use === 'countdown' && (work_countdown === true || break_countdown === true)) {
        return null
    }
    else{
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
                            onBlur = {() => setColor("#21b8a1")}
                            onFocus = {() => setColor("#84e3d1")}
                            onChange = {changeTime}    
                        />
                    </div>
    
                    <div>
                        <h1 className = "timeDisplay"
                            style = {{
                                color: color
                            }}>
                            {hour < 10? `0${hour}` : hour}h {minute < 10? `0${minute}` : minute}m {second < 10? `0${second}` : second}s
                        </h1>
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

/**
 * @constant mapDispatchToProps
 * Returns a plain object, where each field is a separate prop for the Classifier
 * component. 
 * 
 * @param {function} dispatch
 * A function from the Redux store which dispatches actions.
 * 
 * @description
 * 
 * Supplementary Notes:
 * 1) If action creators are used (as opposed to plain object actions) inside dispatch, 
 * it is a convention to  name the field key the same name as the action creator.
 */
const mapDispatchToProps = dispatch => ({
    setBreakMin: minutes => dispatch(setBreakMin(minutes)),
    setBreakHour: hours => dispatch(setBreakHour(hours)),
    setBreakSec: seconds => dispatch(setBreakSec(seconds)),
  })

const mapStateToProps = state => ({
    break_hour : state.breakLength.break_hour,
    break_min : state.breakLength.break_min,
    break_sec: state.breakLength.break_sec,

    work_countdown : state.countdown.work_countdown,
    break_countdown : state.countdown.break_countdown,
})

export default connect(mapStateToProps, mapDispatchToProps)(BreakInput)


