import './inputs.css';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setWorkTime, setBreakTime } from './inputDucks';
import {NONE, WORK, BREAK} from '../timer/timerDucks';

//sleek google version
function TimerInput ({setWorkTime, setBreakTime, workBreak, save, use, work_time, break_time, countdown_state, setWorkChange, setBreakChange, text_size}){
    
    const [totalTime, setTotalTime] = useState((workBreak===WORK) ? work_time : break_time);

    const [hour, setHour] = useState(Math.floor(totalTime / 3600));
    const [minute, setMinute] = useState(Math.floor((totalTime % 3600)/60));
    const [second, setSecond] = useState(totalTime % 60);

    const [color, setColor] = useState(); //display color
    const [focused, setFocused] = useState(false); //whethere the input box was clicked

    const inputText = useRef(null);
    
    const [size, setSize] = useState(50);

    const changeTime = (event) => {
        const input = event.currentTarget.value;
        let time = extractNum(input);
        inputText.current.value = time;
        let temp = parseInt(time);
        
        if (isNaN(temp)){
            //setTotalTime(0);
            setHour(0);
            setMinute(0);
            setSecond(0);
        }
        else if (temp > 9999){
            const tempHour = Math.floor(temp/10000);
            const temp2 = temp % (tempHour * 10000);
            const tempMinute = Math.floor(temp2/100);
            //setTotalTime(tempHour * 3600 + tempMinute * 60 + (temp2 - tempMinute * 100));
            setHour(tempHour);
            setMinute(tempMinute);
            setSecond(temp2 - tempMinute * 100);  
        }
        else if (temp > 99){
            setSecond(temp % 100);
            setMinute(Math.floor(temp/100));
            setHour(0);
            //setTotalTime((Math.floor(temp/100) * 60) + (temp % 100));
        }
        else{
            //setTotalTime(temp);
            setSecond(temp);
            setMinute(0);
        }  
    }


    const thecursor = useRef(null)
    const fakeline = useRef(null)

    const blur = (event) => {
        inputText.current.value = ''; //clear input box when user clicks out of textbox
        if(hour === 0 && minute === 0 && second === 0){
            (workBreak===WORK) ? setMinute(25) : setMinute(5);
        }
        else{
            recalibrate();
        }
        setColor("#999999");
        setFocused(false);
        if (thecursor.current !== null) {thecursor.current.style.display = "none"};
        if (fakeline.current !== null) {
            fakeline.current.style.visibility = "hidden";
            
        };

    }


    const focus = (event) => {       
        setColor("#CCCCCC");
        setHour(0);
        setMinute(0);
        setSecond(0);
        setFocused(true);
        if (thecursor.current !== null) {thecursor.current.style.display = "inline"};
        if (fakeline.current !== null) {
            fakeline.current.color = "#8eb6bf"};
            fakeline.current.style.visibility = "visible";
    } 


    const mouseLeave = (event) =>{
        if(!focused){
            setColor("#999999");
            fakeline.current.style.visibility = "hidden";
        }
    }


    const mouseEnter = (event) =>{
        if(!focused){
        fakeline.current.style.visibility = "visible";
        fakeline.current.color = "#bbbbbb";
        setColor("#cccccc");
        }
    }


    useEffect(() => {
        if (save === true) {
            if (workBreak === WORK) {
                setWorkTime(hour*3600 + minute*60 + second)
                setWorkChange(true)
            } else {
                setBreakTime(hour*3600 + minute*60 + second)
                setBreakChange(true)
            }
        }
    }, [save])


    /*Change display size*/
    useEffect(() => {
        setSize(text_size);
    }, [text_size])


    /*recalculate hours and minutes when minutes > 59
    Parameters:
    inputSecond: seconds inputed by user
    inputMinute: minutes inputed by user
    
    Precondition:
    inputSecond and inputMinute are integers*/
    function recalibrate (inputSecond, inputMinute){

        let seconds = hour*3600 + minute*60 + second;
        setHour(Math.floor(seconds / 3600));
        setMinute(Math.floor((seconds % 3600)/60));
        setSecond(seconds % 60);
     }


   
    /* Extract only numbers out of input box and returns a string of text containing at most 6 numbers
    Parameter: text is a string
    Returns a string of only numbers or empty string*/

    //list of acceptable characters
    const numList = ['0','1','2','3','4','5','6','7','8','9'];
    function extractNum(text) {
        //last character in the string
        let lastChar = text.slice(-1); 

        //Check if the lastChar is in list of acceptable characters
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
                            size = {size*22/25}
                            style = {{ 
                                height: `${size*1.5}vw`,
                                width: `${size*6.4}vw`
                            }}
                            onBlur = {blur}
                            onFocus = {focus}
                            onMouseEnter = {mouseEnter}
                            onMouseLeave = {mouseLeave}
                            onChange = {changeTime}    
                        />
                    </div>
    
                    <div>
                        <h3 className = "timeDisplay" 
                            style = {{
                                color: color,
                                fontSize: `${size}vw`,
                                lineHeight: `${size*7/5}vw`,
                            }}>
                           {hour < 10 ? `0${hour}` : hour}h &#160;
                           {minute < 10 ? `0${minute}` : minute}m &#160;
                           {second < 10 ? `0${second}` :  second}
                           <hr className = "fakeCursor" ref = {thecursor} style = {{display : "none"}} width = "1" ></hr>
                           s   
                        </h3>
                        <hr ref = {fakeline} style = {{
                            visibility: "hidden",
                            marginBottom: `${1}vw`,
                            border: "none",
                            height: `${1}%`
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
