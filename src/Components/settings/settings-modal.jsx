import React, { useEffect, useState, useRef } from "react";
//import "./modal.css";
// import TimerInput from '../input/break-input';
import TimerInput from "../input/work-input";
import { connect } from "react-redux";
import {
  setNumSessions,
  setAlertSound,
  setWorkMusic,
  setBreakMusic,
} from "./settingsDucks";

import { NONE, WORK, BREAK, INTERMEDIATE } from "../timer/timerDucks";
import Toggle from "../UIKits/Toggle";
import StyledMenu from "./menu.styles";
import NumberInput from "../numberInput/NumberInput";

import Button from "../UIKits/Button";
import "../UIKits/Button.css";
import { cloneElement } from "react";
// import { Keyboard } from 'react-native';

function SandboxModal({
  setHide,
  hide,
  setNumSessions,
  num_sessions,
  setAlertSound,
  alert_sound,
  setWorkMusic,
  work_music,
  setBreakMusic,
  break_music,
  countdown_state,
}) {
  const [save, setSave] = useState(false);
  const [tempNumRepeats, setTempNumRepeats] = useState(num_sessions);

  const [tempAlert, setTempAlert] = useState(alert_sound);
  const [tempWorkSound, setTempWorkSound] = useState(work_music);
  const [tempBreakSound, setTempBreakSound] = useState(break_music);

  const [workChange, setWorkChange] = useState(false);
  const [breakChange, setBreakChange] = useState(false);

  /*True states of sound*/
  const alertSound = useRef(alert_sound);
  const workSound = useRef(work_music);
  const breakSound = useRef(break_music);

  useEffect(() => {
    setTempNumRepeats(num_sessions);
    if (workChange === true && breakChange === true) {
      setSave(false);
      setWorkChange(false);
      setBreakChange(false);
    }
  }, [workChange, breakChange, num_sessions]);

  const onDialogClick = (event) => {
    event.stopPropagation();
  };

  const handleConfigSubmit = (event) => {
    setSave(true);
    setNumSessions(parseInt(tempNumRepeats));
    console.log("work audio", tempWorkSound);

    alertSound.current = tempAlert;
    workSound.current = tempWorkSound;
    breakSound.current = tempBreakSound;
    event.preventDefault();
    if (countdown_state === NONE) setSave(false);
  };

  const handleRepeatChange = (event) => {
    setTempNumRepeats(event.target.value);
  };

  const alertSoundChange = (event) => {
    setAlertSound(!tempAlert);
    setTempAlert(!tempAlert);
  };

  const workSoundChange = (event) => {
    setWorkMusic(!tempWorkSound);
    setTempWorkSound(!tempWorkSound);
  };

  const breakSoundChange = (event) => {
    setBreakMusic(!tempBreakSound);
    setTempBreakSound(!tempBreakSound);
  };

  useEffect(() => {
    if (hide) {
      setAlertSound(alertSound.current);
      setBreakMusic(breakSound.current);
      setWorkMusic(workSound.current);
      setTempAlert(alertSound.current);
      setTempBreakSound(breakSound.current);
      setTempWorkSound(workSound.current);
    }
  },[hide])


  let breakInput = countdown_state !== NONE ? (
                                                  <label className = "countdown-label"> 
                                                  Set Break Time
                                                    <div className = "inputBox">
                                                      <TimerInput
                                                        workBreak={BREAK}
                                                        use="settings"
                                                        save={save}
                                                        text_size={2.3}
                                                        setBreakChange={(input) => setBreakChange(input)}
                                                      />
                                                    </div>
                                             
                                                </label>
                                              ) : null;


  let workInput =countdown_state !== NONE ? (
                                                <label className = "countdown-label">
                                                  Set Work Time
                                                  <div className = "inputBox">
                                                    <TimerInput
                                                      workBreak={WORK}
                                                      use="settings"
                                                      save={save}
                                                      text_size={2.3}
                                                      setWorkChange={(input) => setWorkChange(input)}
                                                    />
                                                    </div>
                                                </label>
                                               ) : null;

    if (hide) return null;

    else{
      return (
        <StyledMenu hide={hide}>
          <h4> SETTINGS </h4>
          <hr id="firstLine" />
          <form onSubmit={handleConfigSubmit}>
            <div className='countdown-settings'> 
              {workInput}
              {breakInput}
              <label className="countdown-label">Number of Work Sessions</label>
              <div className="num-repeats-div">
                <NumberInput handleRepeatChange = {(input) => setTempNumRepeats(input)}  numRepeats = {num_sessions}/>
              </div>
            </div>
            <hr id="secondLine" />
            <div className="soundSetting">
              <label className="soundLabel">Chime When Timer Ends</label>
              {/* <div className="toggle-padding"> */}
                <Toggle
                  isChecked={tempAlert}
                  handleToggle={alertSoundChange}
                  size="small"
                />
              </div>
            {/* </div> */}
            <div className="soundSetting">
              <label className="soundLabel">Work Session Music</label>
              {/* <div className="toggle-padding">  */}
              <Toggle
                isChecked={tempWorkSound}
                handleToggle={workSoundChange}
                size="small"
              />
              </div>
            {/* </div> */}
            <div className="soundSetting">
              <label className="soundLabel">Break Session Music</label>
              {/* <div className="toggle-padding"> */}
                <Toggle
                  isChecked={tempBreakSound}
                  handleToggle={breakSoundChange}
                  size="small"
                />
              </div>
            {/* </div> */}
            <hr id="thirdLine" />
            <button type="submit" className="my-btn btn-primary btn-small">
              Save
            </button>
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
const mapDispatchToProps = (dispatch) => ({
  setNumSessions: (num_sessions) => dispatch(setNumSessions(num_sessions)),
  setAlertSound: (state) => dispatch(setAlertSound(state)),
  setWorkMusic: (state) => dispatch(setWorkMusic(state)),
  setBreakMusic: (state) => dispatch(setBreakMusic(state)),
});

const mapStateToProps = (state) => ({
  num_sessions: state.settings.num_sessions,
  countdown_state: state.countdown.countdown_state,
  prev_state: state.countdown.prev_state,
  alert_sound: state.settings.alert_sound,
  work_music: state.settings.work_music,
  break_music: state.settings.break_music,
});

export default connect(mapStateToProps, mapDispatchToProps)(SandboxModal);
