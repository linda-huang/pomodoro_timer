import React, { useState, useEffect } from 'react';
// import {connect} from 'react-redux';
// import { WORK, BREAK } from '../timerDucks';
//import { setWorkHour, setWorkMin, setWorkSec, setBreakHour, setBreakMin, setBreakSec } from '../../input/inputDucks'
import './add-buttons.scss'
// import './add-plus.scss';

export default function AddTime ({addTime, totalTime}) {

    const handleHourClick = () => {
        addTime(totalTime + 3600);
    }

    const handleMinClick = () => {
        addTime(totalTime+5*60)
    }

    const handleSecClick = () => {
        addTime(totalTime+10)
    }

    return(
        <div className='content'>
            <button className='button'  onClick={handleHourClick}><span>+1</span></button>
            <button className='button' onClick={handleMinClick}><span>+5</span></button> 
            <button className='button'  onClick={handleSecClick}><span>+10</span></button>
            {/* <AddPlus time={1}/>
            <AddPlus time={5}/>
            <AddPlus time={10}/> */}
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