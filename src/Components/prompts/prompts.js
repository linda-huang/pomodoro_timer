import React, { useState, useEffect } from 'react';
import { setPrevState, setCountdownState, WORK, BREAK, INTERMEDIATE } from '../timer/timerDucks';
import {connect} from 'react-redux';
import Alert from '../audio/alert';

function Prompts({countdown_state, prev_state, setPrevState, setCountdownState}) {
    const [prompt, setPrompt] = useState(null)

    useEffect(() => {
        if (countdown_state === INTERMEDIATE ) {
            (prev_state === WORK) ? setPrompt("YAY! You've finished work!") : setPrompt("Time to get to work!")
            setTimeout(() => {
                setPrompt(null)
                setCountdownState((prev_state === WORK) ? BREAK : WORK)
                setPrevState(INTERMEDIATE)
            }, 2000)
        }
    }, [countdown_state])

    if (prompt === null) return null;
    
    else {
        return(
            <div>
            <h1>{prompt}</h1>
            <Alert/>
            </div>

        )
    
    }
}

const mapStateToProps = state => ({
    countdown_state : state.countdown.countdown_state,
    prev_state : state.countdown.prev_state
})

const mapDispatchToProps = dispatch => ({
    setCountdownState: state => dispatch(setCountdownState(state)),
    setPrevState: state => dispatch(setPrevState(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Prompts)