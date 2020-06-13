import React, { useState, useEffect } from 'react';
import './timers.css';
import {connect} from 'react-redux'

//sad version ;-;
function Countdown ({work_hour, work_min, displayInput, submitted}){

    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [pause, setPause] = useState(true);


    const handleOnClick = event =>{
        setPause(!pause);
        console.log("Paused: ", pause);
    }

    useEffect(()=>{  
        if (pause){
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
                        console.log("decreasing minute by 1")
                        setMinute(minute-1);
                        setSecond(59);
                    }
                }
            },1000)
            return () => clearInterval(interval)
        }
    }, [submitted, pause, second, minute, hour]);


    useEffect(()=>{
        console.log("setting hours and minutes");
        if( submitted){
            setHour(hours);
            setMinute(minutes);
        }
        
    }, [submitted])


    return (

        <div style = {{
            display: displayInput,
        }}>
            <center>
                <h1>
                    {hour < 10? `0${hour}` : hour}h {minute < 10? `0${minute}` : minute}m {second < 10? `0${second}`:second}s
                </h1>
                <button onClick={handleOnClick}>
                    Pause
                </button>
            </center>
        </div>
    )
}

const mapStateToProps = state => ({
    break_hour : state.breakLength.break_hour,
    break_min : state.breakLength.break_min,
    work_hour : state.workLength.work_hour,
    work_min : state.workLength.work_min
})
export default connect(mapStateToProps)(Countdown)