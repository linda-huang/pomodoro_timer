import React, { useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux';

//Play Sound during work countdown
function Sound ({work_countdown, break_countdown}){



    const mapStateToProps = state =>({
        work_countdown : state.countdown.work_countdown,
        break_countdown : state.countdown.break_countdown,
    })

    
}
