import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Play alert sound when a countdown reaches 0
function Alert ({work_countdown, break_countdown}){

    
    const mapStateToProps = state =>({
        work_countdown : state.countdown.work_countdown,
        break_countdown : state.countdown.break_countdown,
    })
}