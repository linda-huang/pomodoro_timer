import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { WORK, BREAK } from '../timerDucks';
import { setWorkHour, setWorkMin, setWorkSec, setBreakHour, setBreakMin, setBreakSec } from '../../input/inputDucks'
import './add-buttons.css'

function AddTime ({work_hour, work_min, work_sec, break_hour, break_min, break_sec, countdown_state, setBreakHour, setBreakMin, setBreakSec, setWorkHour, setWorkMin, setWorkSec}) {

    const handleHourClick = () => {
        if (countdown_state ===  WORK) {
            setWorkHour(work_hour + 1)
        }
        else {
            setBreakHour(break_hour + 1)
        }
    }

    const handleMinClick = () => {
        if (countdown_state === WORK) {
            setWorkMin(work_min + 5)
        }
        else {
            setBreakMin(break_min + 5)
        }
    }

    const handleSecClick = () => {
        if (countdown_state === WORK) {
            setWorkSec(work_sec + 5)
        }
        else {
            setBreakSec(break_sec + 5); 
        }
    }

    return(
        <div className='content'>
            <button className='button' onClick={handleHourClick}>button 1</button>
            <button className='button' onClick={handleMinClick}>button 2</button>
            <button className='button' onClick={handleSecClick}>button 3</button>
        </div>
    )

}

const mapStateToProps = state => ({
    break_hour : state.breakLength.break_hour,
    break_min : state.breakLength.break_min,
    break_sec : state.breakLength.break_sec,
    work_hour : state.workLength.work_hour,
    work_min : state.workLength.work_min,
    work_sec : state.workLength.work_sec,
    countdown_state : state.countdown.countdown_state,
})

const mapDispatchToProps = dispatch => ({
    setBreakMin: minutes => dispatch(setBreakMin(minutes)),
    setBreakHour: hours => dispatch(setBreakHour(hours)),
    setBreakSec: seconds => dispatch(setBreakSec(seconds)),
    setWorkMin: minutes => dispatch(setWorkMin(minutes)),
    setWorkHour: hours => dispatch(setWorkHour(hours)),
    setWorkSec: seconds => dispatch(setWorkSec(seconds))
  })

export default connect(mapStateToProps, mapDispatchToProps)(AddTime)