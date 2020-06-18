import './timers.css';
import React, { useState } from 'react';
import Countdown from './countdown';
import BreakInput from '../input/break-input';
import WorkInput from '../input/work-input';
import { setWorkCountdown } from './timerDucks';
import { connect } from 'react-redux';
import Alert from '../audio/alert';
import Sound from '../audio/sound';

function TimerWrapper ({ setWorkCountdown, work_countdown, break_countdown}) {

    const [save, setSave] = useState(false)
    let workLabel = (work_countdown === false && break_countdown === false) ? <p>Work Length:</p> : null
    let breakLabel = (work_countdown === false && break_countdown === false) ? <p>Break Length:</p> : null

    const handleStartClick = () => {
        setSave(true);
        setWorkCountdown(true);
        console.log("start button pressed");
        console.log("work countdown", work_countdown);
        console.log("break countdown", break_countdown);
    }

    let startButton = (work_countdown || break_countdown) ? null : <button onClick={handleStartClick}>
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
    setWorkCountdown: start => dispatch(setWorkCountdown(start))
})

const mapStateToProps = state => ({
    work_countdown : state.countdown.work_countdown,
    break_countdown : state.countdown.break_countdown
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerWrapper)