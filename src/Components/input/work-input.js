import './inputs.css';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setWorkTime, setBreakTime } from './inputDucks';
import {NONE, WORK, BREAK} from '../timer/timerDucks';

//sleek google version
function TimerInput ({setWorkTime, setBreakTime, workBreak, save, use, work_time, break_time, countdown_state, setWorkChange, setBreakChange}){
    
    const [totalTime, setTotalTime] = useState((workBreak===WORK) ? work_time : break_time);

    const [color, setColor] = useState();

    const inputText = useRef(null);
    
    const changeTime = (event) => {
        const input = event.currentTarget.value;
        let time = extractNum(input);
        inputText.current.value = time;
        let temp = parseInt(time);
        
        if (isNaN(temp)){
            setTotalTime(0);
        }
        else if (temp > 9999){
            const tempHour = Math.floor(temp/10000);
            const temp2 = temp % (tempHour * 10000);
            const tempMinute = Math.floor(temp2/100);
            setTotalTime(tempHour * 3600 + tempMinute * 60 + (temp2 - tempMinute * 100));
            // setHour(tempHour);
            // setMinute(tempMinute);
            // setSecond(temp2 - tempMinute * 100);  
        }
        else if (temp > 99){
            // setSecond(temp % 100);
            // setMinute(Math.floor(temp/100));
            setTotalTime(Math.floor(temp/100) * 60 + temp % 100);
        }
        else{
            setTotalTime(temp);
        }  
    }


    const thecursor = useRef(null)
    const fakeline = useRef(null)

    const blur = (event) => {
        inputText.current.value = ''; //clear input box when user clicks out of textbox
        setColor("#999999");
        if (thecursor.current !== null) {thecursor.current.style.display = "none"};
        if (fakeline.current !== null) {fakeline.current.style.visibility = "hidden"};

    }

    const focus = (event) => {       
        setColor("#CCCCCC");
        if (thecursor.current !== null) {thecursor.current.style.display = "inline"};
        if (fakeline.current !== null) {fakeline.current.style.visibility = "visible"};
    } 

    useEffect(() => {
        if (save === true) {
            if (workBreak === WORK) {
                setWorkTime(totalTime)
                setWorkChange(true)
            } else {
                setBreakTime(totalTime)
                setBreakChange(true)
            }
        }
    }, [save])

    //recalculate hours and minutes when minutes > 59
    // function recalibrate (inputSecond, inputMinute){
    //     console.log("recalibrating");
    //     let actionHour = hour
    //     let actionMinute = minute
    //     let actionSecond = second

    //     if (second > 59){
    //         let extraMinute = Math.floor(inputSecond/60);
    //         inputSecond = inputSecond % 60;
    //         actionMinute = minute + extraMinute;
    //         actionSecond = inputSecond;
    //     }

    //     if (minute > 59){
    //         let extraHour = Math.floor(inputMinute/60);
    //         inputMinute = inputMinute % 60;
    //         actionHour = hour + extraHour;
    //         actionMinute = inputMinute;
    //     }
    //     setWorkMin(actionMinute);
    //     setWorkHour(actionHour);
    //     setWorkSec(actionSecond);
    // }


    //list of acceptable characters
    const numList = ['0','1','2','3','4','5','6','7','8','9'];
    //extrac only numbers out of input box and returns a string of text containing at most 6 numbers
    function extractNum(text) {
        let lastChar = text.slice(-1); //last character in the string
        if (numList.includes(lastChar)){
            return text;
        }
        else{
            return text.slice(0,-1);
        }
    }


    if (use === 'countdown' && (countdown_state !== NONE)) {
        return null
    }

    else {
        return(   
            <div>
                <div className ="container">  
                    <div>
                        <input
                            ref = {inputText}
                            type = "text"
                            className = "hideInput"
                            maxLength = "6"
                            size = "29"
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
                           {Math.floor(totalTime / 3600) < 10 ? `0${Math.floor(totalTime / 3600)}` : Math.floor(totalTime / 3600)}h {Math.floor((totalTime % 3600) / 60) < 10 ? `0${Math.floor((totalTime % 3600) / 60)}` : Math.floor((totalTime % 3600) / 60)}m {Math.floor(totalTime % 60) < 10 ? `0${Math.floor(totalTime % 60)}` :  Math.floor(totalTime % 60)}
                           <hr className = "fakeCursor" ref = {thecursor} style = {{display : "none"}} width="1" size="35"></hr>s
                           
                        </h1>
                        <hr ref = {fakeline} style = {{
                            visibility: "hidden"
                        }}></hr>

                    </div>  
                </div>
            </div>
            )
    }
}

const mapDispatchToProps = dispatch => ({
    setWorkTime: seconds => dispatch(setWorkTime(seconds)),
    setBreakTime: seconds => dispatch(setBreakTime(seconds))
  })

const mapStateToProps = state => ({
    work_time : state.time.work_time,
    break_time : state.time.break_time,
    countdown_state : state.countdown.countdown_state
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerInput)
