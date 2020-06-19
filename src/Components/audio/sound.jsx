import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import {WORK} from '../timer/timerDucks';
import birds from "./BirdsInTheRain.mp3";
import oceanwaves from "./OceanWaves.mp3";
import reflections from "./Toshifumi Hinata-Reflections.mp3";

//Play Sound during work countdown
function Sound ({countdown_state}){

    const workaudio = useRef(null);
    const breakaudio = useRef(null);


    useEffect(() => {
        
        if(countdown_state === WORK ){  
            //console.log("playing work audio");
            workaudio.current.play();
            if(!breakaudio.current.paused){
                breakaudio.current.pause();
            }
        }
        else {
            //console.log("playing break audio");
            workaudio.current.pause();
            breakaudio.current.play();

        }
    },[countdown_state])
    
    


    return (
        <div>
            <audio loop ref = {workaudio} src = {oceanwaves} type = "audio/mpeg"></audio>
            <audio loop ref = {breakaudio} src = {reflections} type = "audio/mpeg"></audio>
        </div>
    )

}
const mapStateToProps = state =>({
    countdown_state : state.countdown.countdown_state,
})

export default connect(mapStateToProps)(Sound)