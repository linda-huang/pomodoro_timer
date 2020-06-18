import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { setPrevState, setCountdownState, NONE, WORK, BREAK, INTERMEDIATE } from './timerDucks';
import { setNumRepeats } from '../settings/settingsDucks';
import './addTime/add-buttons.css';
//sad version ;-;

function Countdown ({pause, work_hour, work_min, work_sec, break_hour, break_min, break_sec, countdown_state, num_repeats, setCountdownState, setPrevState, setNumRepeats}){

    const [displayHour, setDisplayHour] = useState(work_hour);
    const [displayMinute, setDisplayMinute] = useState(work_min);
    const [displaySecond, setDisplaySecond] = useState(work_sec);

    useEffect(()=>{  
        if (!pause && (countdown_state !== NONE && countdown_state !== INTERMEDIATE)) {
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
            if (countdown_state === WORK) {
                setCountdownState(INTERMEDIATE)
                setPrevState(WORK)
                // setCountdownState(BREAK)
                rewindToBreak();
            // if we were previously counting break, but there are repeats left,
            // we want to rewind back to work and reduce the number of repeats left by 1
            } else if (num_repeats !== 0 && countdown_state === BREAK) {
                setCountdownState(INTERMEDIATE)
                setPrevState(BREAK)
                setNumRepeats(num_repeats-1);
                rewindToWork();
<<<<<<< HEAD
            }
            else if (num_repeats === 0){
                setBreakCountdown(false);
            }
=======
            } else if (countdown_state === BREAK) {
                setCountdownState(NONE)
                setPrevState(BREAK)
            }   
>>>>>>> 3964546b4f6235151f6b7cfe04049d5d9cd6c622
        }
    }, [displayHour, displayMinute, displaySecond, countdown_state])

    
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

   
    useEffect(() => {
        if (countdown_state === WORK) {    
            setDisplayHour(work_hour)
            setDisplayMinute(work_min)
            setDisplaySecond(work_sec)
        }
        else if (countdown_state === BREAK) {
            setDisplayHour(break_hour)
            setDisplayMinute(break_min)
            setDisplaySecond(break_sec)
        }
    }, [countdown_state])


    return (        
        <div className='content'>
            <h1 className='item'>
                {displayHour < 10? `0${displayHour}` : displayHour}h
            </h1>
            <h1 className='item'>
                {displayMinute < 10? `0${displayMinute}` : displayMinute}m 
            </h1>
            <h1 className='item'>
                {displaySecond < 10? `0${displaySecond}`: displaySecond}s
            </h1>
        </div>      
    )
}

const mapStateToProps = state => ({
    break_hour : state.breakLength.break_hour,
    break_min : state.breakLength.break_min,
    break_sec : state.breakLength.break_sec,
    work_hour : state.workLength.work_hour,
    work_min : state.workLength.work_min,
    work_sec : state.workLength.work_sec,
    countdown_state : state.countdown.countdown_state,
    num_repeats : state.settings.num_repeats
})

const mapDispatchToProps = dispatch => ({
    setCountdownState: state => dispatch(setCountdownState(state)),
    setPrevState : state => dispatch(setPrevState(state)),
    setNumRepeats: repeats => dispatch(setNumRepeats(repeats))
})

export default connect(mapStateToProps, mapDispatchToProps)(Countdown)