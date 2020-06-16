import React, { useState, useEffect, useRef } from 'react';
import '../timer/timers.css';
import {connect} from 'react-redux';
import { setBreakCountdown, setWorkCountdown } from './timerDucks';
import { setNumRepeats } from '../settings/settingsDucks'
//sad version ;-;

function Countdown ({work_hour, work_min, work_sec, break_hour, break_min, break_sec, work_countdown, break_countdown, num_repeats, setWorkCountdown, setBreakCountdown, setNumRepeats}){

    const [displayHour, setDisplayHour] = useState(work_hour);
    const [displayMinute, setDisplayMinute] = useState(work_min);
    const [displaySecond, setDisplaySecond] = useState(work_sec);

    const [pause, setPause] = useState(true);

    let pauseLabel = (pause) ? "Pause" : "Resume";

    const handleOnClick = () => {
        setPause(!pause);
    }

    useEffect(()=>{  
        if (pause && (work_countdown || break_countdown)) {
            const interval = setInterval(() => {
                if (displaySecond > 0){
                    setDisplaySecond(displaySecond - 1);
                }
                else {
                    if (displayMinute === 0){
                        if (displayHour > 0){
                            setDisplaySecond(59)
                            setDisplayMinute(59);
                            setDisplayHour(displayHour - 1);
                        }
                    }
                    else {
                        setDisplaySecond(59);
                        setDisplayMinute(displayMinute-1);
                    }
                }
            },1000)
            return () => clearInterval(interval)
        }
    });


    
    // trying to rewind --basically if all displayHour, displayMinute, displaySecond is 0, then
    // we want to reset the timer using the break_hour, break_min etc.
    useEffect(() => {
        if (displayHour === 0 && displayMinute === 0 && displaySecond === 0) {
            // so this means, if we were previously counting work,
            // now we rewind to break
            if (work_countdown === true) {
                setBreakCountdown(true);
                setWorkCountdown(false);
                rewindToBreak();
            // if we were previously counting break, but there are repeats left,
            // we want to rewind back to work and reduce the number of repeats left by 1
            } else if (num_repeats !== 0 && break_countdown === true) {
                setBreakCountdown(false);
                setWorkCountdown(true);
                setNumRepeats(num_repeats-1);
                rewindToWork();
            }
        }
    }, [displayHour, displayMinute, displaySecond, work_countdown, break_countdown, num_repeats])

    const rewindToWork = () => {
        setDisplayHour(work_hour)
        setDisplayMinute(work_min)
        setDisplaySecond(work_sec)
    }

    const rewindToBreak = () => {
        setDisplayHour(break_hour)
        setDisplayMinute(break_min)
        setDisplaySecond(break_sec)
    }

    // set the starting times
    useEffect(() => {
        if (work_countdown === true) {    
            setDisplayHour(work_hour)
            setDisplayMinute(work_min)
            setDisplaySecond(work_sec)
        // } else {
        //     setDisplayHour(break_hour)
        //     setDisplayMinute(break_hour)
        //     setDisplaySecond(break_sec)
        }
    }, [work_hour, work_min, break_hour, break_min, work_countdown, break_sec, work_sec])

    if (work_countdown === false && break_countdown === false) return null;

    else {
        return (

            <div>
                <center>
                    <h1>
                        {displayHour < 10? `0${displayHour}` : displayHour}h {displayMinute < 10? `0${displayMinute}` : displayMinute}m {displaySecond < 10? `0${displaySecond}`: displaySecond}s
                    </h1>
                    <button onClick={handleOnClick}>
                        {pauseLabel}
                    </button>
                    
                </center>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    break_hour : state.breakLength.break_hour,
    break_min : state.breakLength.break_min,
    break_sec : state.breakLength.break_sec,
    work_hour : state.workLength.work_hour,
    work_min : state.workLength.work_min,
    work_sec : state.workLength.work_sec,
    work_countdown : state.countdown.work_countdown,
    break_countdown : state.countdown.break_countdown,
    num_repeats : state.settings.num_repeats
})

const mapDispatchToProps = dispatch => ({
    setWorkCountdown: start => dispatch(setWorkCountdown(start)),
    setBreakCountdown: start => dispatch(setBreakCountdown(start)),
    setNumRepeats: repeats => dispatch(setNumRepeats(repeats))
})

export default connect(mapStateToProps, mapDispatchToProps)(Countdown)