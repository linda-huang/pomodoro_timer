import React, { useState, useEffect } from 'react';
import { setPrevState, setCountdownState, WORK, BREAK, INTERMEDIATE, SESSION_END } from '../timer/timerDucks';
import {connect} from 'react-redux';
import Alert from '../audio/alert';
import sadcat from './679796247967694906.png';
import happycat from './568124064485343241.gif';

function Prompts({countdown_state, prev_state, num_repeats, setPrevState, setCountdownState, setNumRepeats}) {
    const [prompt, setPrompt] = useState(null);
    const [img, setImg] = useState(null);

    useEffect(() => {
        if (countdown_state === INTERMEDIATE ) {
            if (prev_state === WORK){
                setPrompt("YAY! You've finished work!");
                setImg(happycat);
            }else{
                setPrompt ("Time to get to work!");
                setImg(sadcat);
            }
            setTimeout(() => {
                setPrompt(null)
                if (countdown_state===SESSION_END) {
                    setCountdownState(NONE)
                    setPrevState(SESSION_END)
                }
                else {
                    setCountdownState((prev_state === WORK) ? BREAK : WORK);
                    setPrevState(INTERMEDIATE);
                }
            }, 2000)
        }
    }, [countdown_state])

    if (prompt === null) return null;
    
    else {
        return(
            <div className = "intermission">
                <h2 className = "prompt">{prompt}</h2>

                <div className = "cat">
                <img src = {img} alt = "cat"/>
                </div>
                <Alert/>
            </div>
        )
    
    }
}

const mapStateToProps = state => ({
    countdown_state : state.countdown.countdown_state,
    prev_state : state.countdown.prev_state,
    num_repeats : state.settings.num_repeats
})

const mapDispatchToProps = dispatch => ({
    setCountdownState: state => dispatch(setCountdownState(state)),
    setPrevState: state => dispatch(setPrevState(state)),
    setNumRepeats: repeats => dispatch(setNumRepeats(repeats))
})

export default connect(mapStateToProps, mapDispatchToProps)(Prompts)