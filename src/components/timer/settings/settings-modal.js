import React, { useEffect, useState } from 'react';
import './modal.css';
import { connect } from 'react-redux'
import { setBreakLength, setWorkLength, setNumRepeats } from '../timerDucks';
// import { Keyboard } from 'react-native';

function SandboxModal ({hide, onClose, setBreakLength, setWorkLength, setNumRepeats, break_length, work_length, num_repeats}) {
    const [tempWork, setTempWork] = useState(work_length);
    const [tempBreak, setTempBreak] = useState(break_length);
    const [tempNumRepeats, setTempNumRepeats] = useState(num_repeats);

    useEffect(() => {
        if (onClose) {
            window.addEventListener('keydown', listenKeyboard, true);
            return () => window.removeEventListener('keydown', listenKeyboard, true);
        }
    }, [])
          
    const listenKeyboard = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            onClose(true);
        }
    }

    const onDialogClick = (event) => {
        event.stopPropagation();
    }

    const handleConfigSubmit = (event) => {
       setBreakLength(parseInt(tempBreak));
       setWorkLength(parseInt(tempWork));
       setNumRepeats(parseInt(tempNumRepeats));
       console.log('dispatching actions')
       event.preventDefault();
    }

    const handleBreakChange = (event) => {
        setTempBreak(event.target.value);
    }

    const handleWorkChange = (event) => {
        setTempWork(event.target.value);
    }

    const handleRepeatChange = (event) => {
        setTempNumRepeats(event.target.value);
    }
  
    if (hide) return null;

    else {
        return (
            <div>
              <div className="modal-content-div">
                <div className="modal-dialog-div" onClick={onDialogClick}>
                    <form onSubmit={handleConfigSubmit}>
                        <label>
                            How long should we work for?
                            <input 
                                type='number'
                                value={tempWork}
                                onChange={handleWorkChange}/>
                        </label>
                        <label>
                            How long should we break for?
                            <input 
                                type='number'
                                value={tempBreak}
                                onChange={handleBreakChange}/>
                        </label>
                        <label>
                            How many repeats?
                            <input 
                            type='number'
                            value={tempNumRepeats}
                            onChange={handleRepeatChange}/>
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
                <button onClick={onClose}>
                    Exit
                </button>
              </div>
            </div>
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
    setBreakLength: break_len => dispatch(setBreakLength(break_len)),
    setWorkLength: work_len => dispatch(setWorkLength(work_len)),
    setNumRepeats: num_repeats => dispatch(setNumRepeats(num_repeats))
  })


// NOTE TO Mina and Doanh I do not actually need the below function, this is to 
// demonstrate how to access state values in the global state
/**
 *
 * @constant mapStateToProps
 * Returns a plain object, where each field is a separate prop for the Classifier
 * component. 
 * 
 * @param {function} state
 * The entire Redux store state (the same value returned by a call to store.getState())
 * 
 */
const mapStateToProps = state => ({
    break_length : state.workBreakSettings.break_length,
    work_length : state.workBreakSettings.work_length,
    num_repeats : state.workBreakSettings.num_repeats
})
/* Merges the return of the mapDispatchToProps function to SandboxModal component 
as props.*/
export default connect(mapStateToProps, mapDispatchToProps)(SandboxModal)
