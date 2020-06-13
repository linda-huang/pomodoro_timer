import './timers.css';
import React, { useState } from 'react';
// import Countdown from './countdown';
import BreakInput from '../input/break-input';
import WorkInput from '../input/work-input';
import { setWorkCountdown } from './timerDucks';
import { connect } from 'react-redux';

function TimerWrapper ({ setWorkCountdown, work_countdown }) {

    const [save, setSave] = useState(false)

    const handleStartClick = () => {
        setSave(true)
        setWorkCountdown(true)
    }


    return (
        <div>
            <label>
                Work Length:
                <WorkInput save={save}/>
            </label>
            <label>
                Break Length:
                <BreakInput save={save}/>
            </label>
            <button onClick={handleStartClick}>
                START
            </button>
            {/* <Countdown/> */}
            
        </div>
    )

} 

const mapDispatchToProps = dispatch => ({
    setWorkCountdown: start => dispatch(setWorkCountdown(start))
})

const mapStateToProps = state => ({
    work_countdown : state.countdown.work_countdown
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerWrapper)