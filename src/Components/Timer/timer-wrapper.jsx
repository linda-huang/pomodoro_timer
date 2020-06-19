import React, { useState } from 'react';
import CountdownWrapper from './countdown-wrapper';
import BreakInput from '../input/break-input';
import WorkInput from '../input/work-input';
import Settings from '../settings/settings-modal-wrapper';
import { setCountdownState, NONE, WORK, BREAK, INTERMEDIATE } from './timerDucks';
import { connect } from 'react-redux';
import { useEffect } from 'react';

function TimerWrapper ({ setCountdownState, countdown_state}) {

    // start countdown
<<<<<<< HEAD
    const [save, setSave] = useState(false)
    
=======
    const [save, setSave] = useState(false);
    const[workChange, setWorkChange] = useState(false);
    const[breakChange, setBreakChange] = useState(false);

>>>>>>> trying to fix bug
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
        <div>
            
            {workLabel}
            <WorkInput use="countdown" save={save} setWorkChange={(input) => setWorkChange(input)}/>

            {breakLabel}
            <BreakInput use="countdown" save={save} setBreakChange={(input) => setBreakChange(input)}/>
            
            {startButton}
            <CountdownWrapper/>

            <Settings start={save}/>

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