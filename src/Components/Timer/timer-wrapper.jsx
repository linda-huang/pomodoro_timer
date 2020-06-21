import React, { useState } from 'react';
import CountdownWrapper from './countdown-wrapper';
// import BreakInput from '../input/break-input'
import TimerInput from '../input/work-input';
import Settings from '../settings/settings-modal-wrapper';
import AnimationWrapper from '../animation/animation-wrapper';

import '../../App.css';

import { setCountdownState, NONE, WORK, BREAK, INTERMEDIATE } from './timerDucks';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import AnimationController from '../animation/animationController';

function TimerWrapper ({ setCountdownState, countdown_state}) {

    // start countdown
    const [save, setSave] = useState(false);
    const[workChange, setWorkChange] = useState(false);
    const[breakChange, setBreakChange] = useState(false);
    const[totalTime, setTotalTime] = useState();

    let workLabel = (countdown_state === NONE) ? <p>Work Length:</p> : null
    let breakLabel = (countdown_state === NONE) ? <p>Break Length:</p> : null


    const handleStartClick = () => {
        setSave(true);
        setCountdownState(WORK);
    }

    useEffect(() => {
        if (workChange === true && breakChange === true) {
            setSave(false)
            setWorkChange(false)
            setBreakChange(false)
        }
    }, [workChange, breakChange])

    let startButton = (countdown_state !==  NONE) ? null : <button onClick={handleStartClick}>
        START
    </button>

    return (
        <div className = "GridLayout">
            {/*<div className = "MainLayout">*/}
                <div className = "WorkInput">
                    {workLabel}
                    <TimerInput workBreak={WORK} use="countdown" save={save} setWorkChange={(input) => setWorkChange(input)}/>
                </div>
                <div className = "BreakInput">
                    {breakLabel}
                    <TimerInput workBreak={BREAK} use="countdown" save={save} setBreakChange={(input) => setBreakChange(input)}/>
                </div>
                <div className = "startBttn">
                    {startButton}
                </div>

                <CountdownWrapper updateTime={(input) => setTotalTime(input)} />  
                
             
            <div className = "Settings">
                <Settings start={save}/>
            </div>

            <div className = "AnimationController">
                <AnimationController/>
            </div>

            <div className = "animation">
                <AnimationWrapper time={totalTime} />
            </div>
           
        </div>
    )

} 

const mapDispatchToProps = dispatch => ({
    setCountdownState: state => dispatch(setCountdownState(state))
})

const mapStateToProps = state => ({
    countdown_state : state.countdown.countdown_state
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerWrapper)