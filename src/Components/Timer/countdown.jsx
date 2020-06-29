import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux';

import AnimationWrapper from '../animation/animation-wrapper';

import { setPrevState, setCountdownState, NONE, WORK, BREAK, INTERMEDIATE } from './timerDucks';
import { setNumRepeats } from '../settings/settingsDucks';
import AddTime from './addTime/add-button';


import './timer.css';
import './addTime/add-buttons.css';

import Sound from '../audio/sound';


function Countdown ({pause, work_time, break_time, countdown_state, num_repeats, setCountdownState, setPrevState, setNumRepeats}){

    // const [displayHour, setDisplayHour] = useState(work_hour);
    // const [displayMinute, setDisplayMinute] = useState(work_min);
    // const [displaySecond, setDisplaySecond] = useState(work_sec);
    const [totalTime, setTotalTime] = useState((countdown_state === WORK) ? work_time : break_time);

    useEffect(()=>{  
        if (!pause && (countdown_state !== NONE && countdown_state !== INTERMEDIATE)) {
            const interval = setInterval(() => {
                setTotalTime(totalTime -1)
                // if (displaySecond > 0){
                //     setDisplaySecond(displaySecond - 1);
                // }
                // else {
                //     if (displayMinute === 0){
                //         if (displayHour > 0){
                //             setDisplaySecond(59)
                //             setDisplayMinute(59);
                //             setDisplayHour(displayHour - 1);
                //         }
                //     }
                //     else {
                //         setDisplaySecond(59);
                //         setDisplayMinute(displayMinute-1);
                //     }
                // }
            },1000)
            return () => clearInterval(interval)
        }
    });


    
    // trying to rewind --basically if all displayHour, displayMinute, displaySecond is 0, then
    // we want to reset the timer using the break_hour, break_min etc.
    useEffect(() => {
        if (
            // displayHour === 0 && displayMinute === 0 && displaySecond === 0
            totalTime < 0
            ) {
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
            } else if (countdown_state === BREAK) {
                setCountdownState(NONE)
                setPrevState(BREAK)
            }   
        }
    }, [
        // displayHour, displayMinute, displaySecond, 
        totalTime, countdown_state])

    
    const rewindToWork = () => {
        // setDisplayHour(work_hour)
        // setDisplayMinute(work_min)
        // setDisplaySecond(work_sec)
        setTotalTime(work_time);
    }

    const rewindToBreak = () => {
        // setDisplayHour(break_hour)
        // setDisplayMinute(break_min)
        // setDisplaySecond(break_sec)
        setTotalTime(break_time);

    }

   
    useEffect(() => {
        if (countdown_state === WORK) {    
            setTotalTime(work_time);
            // setDisplayHour(work_hour)
            // setDisplayMinute(work_min)
            // setDisplaySecond(work_sec)
        }
        else if (countdown_state === BREAK) {
            setTotalTime(break_time)

            // setDisplayHour(break_hour)
            // setDisplayMinute(break_min)
            // setDisplaySecond(break_sec)
        }
    }, [countdown_state])


    return (        
        <div className='parent'>
            <AnimationWrapper time={totalTime} />
          
            <div className='child'>
                <div className='content'>
                    <h1 className='item'>
                        {Math.floor(totalTime / 3600) < 10 ? `0${Math.floor(totalTime / 3600)}` : Math.floor(totalTime / 3600)}h
                    </h1>
                    <h1 className='item'>
                        {Math.floor((totalTime % 3600) / 60) < 10 ? `0${Math.floor((totalTime % 3600) / 60)}` : Math.floor((totalTime % 3600) / 60)}m 
                    </h1>
                    <h1 className='item'>
                        {Math.floor(totalTime % 60) < 10 ? `0${Math.floor(totalTime % 60)}` :  Math.floor(totalTime % 60)}s
                    </h1>
                </div>   
            </div>
            <div className='child'>
                <AddTime 
                    addTime={(input) => setTotalTime(input)}
                    totalTime={totalTime}
                />
            </div>
            <div>
               
                <Sound/>
            </div> 
        </div>   
    )
}

const mapStateToProps = state => ({
    work_time : state.time.work_time,
    break_time : state.time.break_time,
    countdown_state : state.countdown.countdown_state,
    num_repeats : state.settings.num_repeats
})

const mapDispatchToProps = dispatch => ({
    setCountdownState: state => dispatch(setCountdownState(state)),
    setPrevState : state => dispatch(setPrevState(state)),
    setNumRepeats: repeats => dispatch(setNumRepeats(repeats))
})

export default connect(mapStateToProps, mapDispatchToProps)(Countdown)