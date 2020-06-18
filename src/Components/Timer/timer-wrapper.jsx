import React, { useState } from 'react';
import CountdownWrapper from './countdown-wrapper';
import BreakInput from '../input/break-input';
import WorkInput from '../input/work-input';
import Settings from '../settings/settings-modal-wrapper';
import { setCountdownState, NONE, WORK, BREAK, INTERMEDIATE } from './timerDucks';
import { connect } from 'react-redux';
import Alert from '../audio/alert';
import Sound from '../audio/sound';

function TimerWrapper ({ setCountdownState, countdown_state}) {

    // start countdown
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