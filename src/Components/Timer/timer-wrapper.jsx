import './timers.css';
import React, { useState } from 'react';
import Countdown from './countdown';
import BreakInput from '../input/break-input';
import WorkInput from '../input/work-input';
import { setCountdownState, NONE, WORK, BREAK, INTERMEDIATE } from './timerDucks';
import { connect } from 'react-redux';

function TimerWrapper ({ setCountdownState, countdown_state}) {

    const [save, setSave] = useState(false)
    let workLabel = (countdown_state === NONE) ? <p>Work Length:</p> : null
    let breakLabel = (countdown_state === NONE) ? <p>Break Length:</p> : null

    const handleStartClick = () => {
        setSave(true)
        setCountdownState(WORK)
    }

    let startButton = (countdown_state !==  NONE) ? null : <button onClick={handleStartClick}>
        START
    </button>
    
    return (
        <div>
            
            {workLabel}
            <WorkInput use="countdown" save={save} setSave={(input) => {setSave(input)}}/>

            {breakLabel}
            <BreakInput use="countdown" save={save}/>
            
            {startButton}
            <Countdown/>
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