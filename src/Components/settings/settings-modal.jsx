import React, { useEffect, useState, useRef } from 'react';
import './modal.css';
// import TimerInput from '../input/break-input';
import TimerInput from '../input/work-input';
import { connect } from 'react-redux';
import { setNumRepeats, setAlertSound, setWorkMusic, setBreakMusic} from './settingsDucks';
import { NONE, WORK, BREAK, INTERMEDIATE } from '../timer/timerDucks';
import Toggle from '../UIKits/Toggle'
import StyledMenu from './menu.styles'

import Button from '../UIKits/Button';
// import { Keyboard } from 'react-native';

function SandboxModal ({setHide, hide, setNumRepeats, num_repeats, setAlertSound, alert_sound, setWorkMusic, work_music, setBreakMusic, break_music, countdown_state, start}) {
    const [save, setSave] = useState(false);
    const [tempNumRepeats, setTempNumRepeats] = useState(num_repeats);
    const [checked1 , setChecked1] = useState(alert_sound);
    const [checked2 , setChecked2] = useState(work_music);
    const [checked3, setChecked3] = useState(break_music);
    const[workChange, setWorkChange] = useState(false);
    const[breakChange, setBreakChange] = useState(false);
    
    useEffect(() => {
        if (start===true) {
            setHide(true)
        }
    }, [start])

    useEffect(() => {
        setTempNumRepeats(num_repeats);
        if (workChange === true && breakChange === true) {
            setSave(false)
            setWorkChange(false)
            setBreakChange(false)
        }
    }, [workChange, breakChange, num_repeats])

    const onDialogClick = (event) => {
        event.stopPropagation();
    }

    const handleConfigSubmit = (event) => {
       setSave(true)
       setNumRepeats(parseInt(tempNumRepeats));
       setAlertSound(checked1);
       setWorkMusic(checked2);
       setBreakMusic(checked3);
       event.preventDefault();
       if (countdown_state === NONE) setSave(false);
    }

    const handleRepeatChange = (event) => {
        setTempNumRepeats(event.target.value);
    }
    
    let breakInput = (countdown_state !== NONE) ? 
    <label>
        Set Break Time
        <TimerInput workBreak={BREAK} use="settings" save={save} text_size = {20} setBreakChange={(input) => setBreakChange(input)}/>
    </label> : null
    let workInput  = ( countdown_state !== 'NONE' )  ? 
    <label>
        Set Work Time
        <TimerInput workBreak={WORK} use="settings" save={save} text_size = {20} setWorkChange={(input) => setWorkChange(input)}/>
    </label> : null
  
    if (hide) return null;

    else {
        return (
            <StyledMenu>
                    <h5> SETTINGS </h5>
                    <div />
                    <form onSubmit={handleConfigSubmit}>
                       {workInput}
                        {breakInput}
                        <div>
                            <label>
                                Number of Repeats 
                            </label>
                            <input 
                                    type='number'
                                    min="0"
                                    value={tempNumRepeats}
                                    onChange={handleRepeatChange}/>
                        </div>
                        <div>
                            <label>
                                Alert Sound
                            </label>
                                <Toggle isChecked={checked1} handleToggle={()=>setChecked1(!checked1)} size="small"/>
                        </div>
                        <div>
                        <label>
                            Work Music
                        </label>
                            <Toggle isChecked={checked2} handleToggle={()=>setChecked2(!checked2)} size="small"/>
                        </div>
                        <div>
                        {/*<input
                            type = 'checkbox'
                            checked = {checked3}
                            onChange = {() => setChecked3(!checked3)}
                            />*/}
                        <label>
                            Break Music
                        </label>
                            <Toggle isChecked={checked3} handleToggle={()=>setChecked3(!checked3)} size="small"/>
                        </div>
                        <button type="submit">Save</button>
                    </form>
            </StyledMenu>
          );
    }
}
/**
 * @constant mapDispatchToProps
 * Returns a plain object, where each field is a separate prop for the Classifier
 * component. 
 * 
 * @param {function} dispatch
 * A function from the Redux store which dispatches actions.
 * 
 * @description
 * 
 * Supplementary Notes:
 * 1) If action creators are used (as opposed to plain object actions) inside dispatch, 
 * it is a convention to  name the field key the same name as the action creator.
 */
const mapDispatchToProps = dispatch => ({
    setNumRepeats: num_repeats => dispatch(setNumRepeats(num_repeats)),
    setAlertSound: state => dispatch(setAlertSound(state)),
    setWorkMusic: state => dispatch(setWorkMusic(state)),
    setBreakMusic: state => dispatch(setBreakMusic(state))
  })

const mapStateToProps = state => ({
    num_repeats : state.settings.num_repeats,
    countdown_state : state.countdown.countdown_state,
    prev_state : state.countdown.prev_state,
    alert_sound: state.settings.alert_sound,
    work_music: state.settings.work_music,
    break_music: state.settings.break_music
    
})

/* Merges the return of the mapDispatchToProps function to SandboxModal component 
as props.*/
export default connect(mapStateToProps, mapDispatchToProps)(SandboxModal)
