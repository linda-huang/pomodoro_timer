import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux';

import AnimationWrapper from '../animation/animation-wrapper';

import { setPrevState, setCountdownState, NONE, WORK, BREAK, INTERMEDIATE, SESSION_END } from './timerDucks';
import { setNumRepeats } from '../settings/settingsDucks';
import AddTime from './addTime/add-button';

import './timer.css';
import './addTime/add-buttons.scss';

import Sound from '../audio/sound';


function Countdown ({pause, work_time, break_time, countdown_state, num_repeats, setCountdownState, setPrevState, setNumRepeats, updateTime}){

    const [totalTime, setTotalTime] = useState((countdown_state === WORK) ? work_time : break_time);

    

    useEffect(()=>{  
        if (!pause && (countdown_state === WORK || countdown_state === BREAK)) {
            const interval = setInterval(() => {
                setTotalTime(totalTime - 1);
                updateTime(totalTime);
            },1000)
            return () => clearInterval(interval)
        }
    });

    useEffect(() => {
        if (totalTime < 0) {
  
            if (countdown_state === WORK) {
                setCountdownState(INTERMEDIATE)
                setPrevState(WORK)
                rewindToBreak();
         
            } else if (num_repeats !== 0 && countdown_state === BREAK) {
                setCountdownState(INTERMEDIATE)
                setPrevState(BREAK)
                setNumRepeats(num_repeats-1);
                rewindToWork();

            } else if (countdown_state === BREAK) {
                setCountdownState(SESSION_END)
                setPrevState(BREAK)
            }   
        }
    }, [totalTime, countdown_state])

    
    const rewindToWork = () => {
        setTotalTime(work_time);
    }

    const rewindToBreak = () => {
        setTotalTime(break_time);

    }

   
    useEffect(() => {
        if (countdown_state === WORK) {  
            setTotalTime(work_time);
        }
        else if (countdown_state === BREAK) {
            setTotalTime(break_time)
        }
        
    }, [countdown_state, work_time, break_time])


    return (        
        <div className='countdown-box'>
            

            <div className='countdown-child'>
                <div className='countdown-content'>
                    <h1 className='countdown-item'>
                        {Math.floor(totalTime / 3600) < 10 ? `0${Math.floor(totalTime / 3600)}` : Math.floor(totalTime / 3600)}h 
                    </h1>
                    <h1 className='countdown-item'>
                        {Math.floor((totalTime % 3600) / 60) < 10 ? `0${Math.floor((totalTime % 3600) / 60)}` : Math.floor((totalTime % 3600) / 60)}m 
                    </h1>
                    <h1 className='countdown-item'>
                        {Math.floor(totalTime % 60) < 10 ? `0${Math.floor(totalTime % 60)}` :  Math.floor(totalTime % 60)}s 
                    </h1>
                </div>   
            </div>
            <div className='countdown-child'>
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