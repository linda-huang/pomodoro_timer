import React, { useEffect, useState } from 'react';
import './modal.css';
import BreakInput from '../input/break-input';
import WorkInput from '../input/work-input';
import { connect } from 'react-redux';
import { setNumRepeats } from './settingsDucks';
// import { Keyboard } from 'react-native';

function SandboxModal ({hide, setNumRepeats, num_repeats}) {
    const [save, setSave] = useState(false);
    const [tempNumRepeats, setTempNumRepeats] = useState(num_repeats);


    const onDialogClick = (event) => {
        event.stopPropagation();
    }

    const handleConfigSubmit = (event) => {
       setSave(true)
       setNumRepeats(parseInt(tempNumRepeats));
       console.log('dispatching actions')
       event.preventDefault();
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
                            <WorkInput use="settings" save={save}/>
                        </label>
                        <label>
                            How long should we break for?
                            <BreakInput use="settings" save={save}/>
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
    setNumRepeats: num_repeats => dispatch(setNumRepeats(num_repeats))
  })

const mapStateToProps = state => ({
    num_repeats : state.settings.num_repeats,
})

/* Merges the return of the mapDispatchToProps function to SandboxModal component 
as props.*/
export default connect(mapStateToProps, mapDispatchToProps)(SandboxModal)
