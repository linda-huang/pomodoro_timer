import React, { useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import birds from "./BirdsInTheRain.mp3";
import oceanwaves from "./OceanWaves.mp3";

//Play Sound during work countdown
function Sound ({work_countdown, break_countdown}){

    const workaudio = useRef(null);
    const breakaudio = useRef(null)

    console.log(work_countdown);
    useEffect(() => {
        console.log("work_countdown", work_countdown);
        if(work_countdown === true){   
            console.log("starting audio");
            workaudio.current.play();
            breakaudio.current.pause();
        }
        else{
            workaudio.current.pause();
            breakaudio.current.play()

        }
    },[work_countdown])
    
    


    return (
        <div>
        <audio loop ref = {workaudio} src = {oceanwaves} type = "audio/mpeg"></audio>
        <audio loop ref = {breakaudio} src = {birds} type = "audio/mpeg"></audio>
        </div>
    )

}
const mapStateToProps = state =>({
    work_countdown : state.countdown.work_countdown,
    break_countdown : state.countdown.break_countdown,
})

export default connect(mapStateToProps)(Sound)