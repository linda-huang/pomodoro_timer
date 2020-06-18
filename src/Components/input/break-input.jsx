import './inputs.css';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setBreakHour, setBreakMin, setBreakSec } from './inputDucks'
import {NONE} from '../timer/timerDucks'

//sleek google version
function BreakInput ({setBreakHour, setBreakMin, setBreakSec, start, use, break_hour, break_min, break_sec, countdown_state}){

    //const [time, setTime] = useState();
    const [hour, setHour] = useState(break_hour);
    const [minute, setMinute] = useState(break_min);
    const [second, setSecond] = useState(break_sec);
    const [color, setColor] = useState();


    const inputText = useRef(null);

    const changeTime = (event) => {
        const input = event.currentTarget.value;
        let time = extractNum(input);
        inputText.current.value = time;
        let temp = parseInt(time);
        
        if (isNaN(temp)){
            setMinute(0);
            setHour(0);
            setSecond(0);
        }
        else if (temp > 9999){
            const tempHour = Math.floor(temp/10000);
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

    const thecursor = useRef(null);
    const fakeline = useRef(null);

    const blur = (event) => {
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
        if (start === true) {
            recalibrate(second, minute)
        }
    }, [start])


    //recalculate hours and minutes when minutes > 59
    function recalibrate (inputSecond, inputMinute){
        let actionHour = hour
        let actionMinute = minute
        let actionSecond = second

        if (second > 59){
            let extraMinute = Math.floor(inputSecond/60);
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
    else{
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
                           {hour < 10? `0${hour}` : hour}h {minute < 10? `0${minute}` : minute}m {second < 10? `0${second}` : second}<hr className = "fakeCursor" ref = {thecursor} style = {{display : "none"}} width="1" size="35"></hr>s </h1>
                        <hr ref = {fakeline} style = {{
                            visibility: "hidden"
                        }}></hr>
                    </div>  
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
    countdown_state : state.countdown.countdown_state
})

export default connect(mapStateToProps, mapDispatchToProps)(BreakInput)


