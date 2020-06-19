import React, { useState, useEffect } from 'react';
// import {connect} from 'react-redux';
// import { WORK, BREAK } from '../timerDucks';
//import { setWorkHour, setWorkMin, setWorkSec, setBreakHour, setBreakMin, setBreakSec } from '../../input/inputDucks'
import './add-buttons.css'

export default function AddTime ({addTime, sec}) {

    const handleHourClick = () => {
        addTime(sec + 3600);
    }

    const handleMinClick = () => {
        // if (min >= 55) {
        //     addHour(hour+1)
        //     addMin(min-60+5)
        // } else {
        //     addMin(min+5)
        // }
        addTime(sec+5*60)
    }

    const handleSecClick = () => {
        // if (sec >= 50) {
        //     addMin(min+1)
        //     addSec(sec-60+10)
        // } else {
        //     addSec(sec + 10)
        // }
        addTime(sec+10)
    }

    return(
        <div className='content'>
            <button className='button' onClick={handleHourClick}>button 1</button>
            <button className='button' onClick={handleMinClick}>button 2</button>
            <button className='button' onClick={handleSecClick}>button 3</button>
        </div>
    )

}

// const mapStateToProps = state => ({
//     break_hour : state.breakLength.break_hour,
//     break_min : state.breakLength.break_min,
//     break_sec : state.breakLength.break_sec,
//     work_hour : state.workLength.work_hour,
//     work_min : state.workLength.work_min,
//     work_sec : state.workLength.work_sec,
//     countdown_state : state.countdown.countdown_state,
// })

// const mapDispatchToProps = dispatch => ({
//     setBreakMin: minutes => dispatch(setBreakMin(minutes)),
//     setBreakHour: hours => dispatch(setBreakHour(hours)),
//     setBreakSec: seconds => dispatch(setBreakSec(seconds)),
//     setWorkMin: minutes => dispatch(setWorkMin(minutes)),
//     setWorkHour: hours => dispatch(setWorkHour(hours)),
//     setWorkSec: seconds => dispatch(setWorkSec(seconds))
//   })

// export default connect(mapStateToProps, mapDispatchToProps)(AddTime)