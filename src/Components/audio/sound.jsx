import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import {WORK} from '../timer/timerDucks';
import birds from "./BirdsInTheRain.mp3";
import oceanwaves from "./OceanWaves.mp3";
import reflections from "./Toshifumi Hinata-Reflections.mp3";

//Play Sound during work countdown
function Sound ({countdown_state, pause, work_music, break_music}){
    
    const workaudio = useRef(null);
    const breakaudio = useRef(null);


    useEffect(() => {
        if (!pause){
            if(countdown_state === WORK){  
                if (work_music){
                    workaudio.current.play();
                }
                else{
                    workaudio.current.pause();
                }
                breakaudio.current.pause();
                
            }
            else { 
                workaudio.current.pause();
                if (break_music){
                    breakaudio.current.play();
                }
                else{
                    breakaudio.current.pause();
                }
            }
        }
        else{
            workaudio.current.pause();
            breakaudio.current.pause();
        }
    },[countdown_state, pause, work_music, break_music])
    
    


    return (
        <div>
            <audio loop ref = {workaudio} src = {oceanwaves} type = "audio/mpeg"></audio>
            <audio loop ref = {breakaudio} src = {reflections} type = "audio/mpeg"></audio>
        </div>
    )

}
const mapStateToProps = state =>({
    countdown_state : state.countdown.countdown_state,
    pause: state.countdown.pause,
    work_music: state.settings.work_music,
    break_music: state.settings.break_music
})

export default connect(mapStateToProps)(Sound)