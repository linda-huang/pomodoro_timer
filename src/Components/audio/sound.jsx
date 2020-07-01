import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import {WORK, setPrevState} from '../timer/timerDucks';
import {WAVE, BALL} from '../animation/animationDucks.js';

import oceanwaves from "./OceanWaves.mp3";
import reflections from "./Toshifumi Hinata-Reflections.mp3";
import water from './18 - Water Lapping Wind.mp3';
import rain from './9 - Rain On Rooftop.mp3';

/* Play Sound during work countdown and break countdown*/
function Sound ({countdown_state, pause, work_music, break_music, animation_state}){
    

    const workaudio = useRef(null);
    const breakaudio = useRef(null);

    const breakPromise = useRef(undefined);
    const workPromise = useRef(undefined);
    

    /* switch audio file when the animation changes*/
    useEffect(() => {
        if (animation_state === WAVE){     
            workaudio.current.src = water;
            if (!pause){
                workaudio.current.play();

            }
        }
        else if (animation_state === BALL){
            
            workaudio.current.src = rain;
            if (!pause){
                workaudio.current.play();
            }
        }
    }, [animation_state])


    

    useEffect(() => {
        
        if (!pause){
            
            workaudio.current.volume = 0.75;
            
            if(countdown_state === WORK){  
                breakPromise.current = breakaudio.current.play();
                //console.log("work sound", work_music);
                //console.log("workPromise", workPromise);
                if (work_music){ 
                    //console.log("playing work audio")
                    workPromise.current = workaudio.current.play();
                    console.log("workPromise", workPromise);
                    
                }
                else if (workPromise.current !== undefined){
                    //console.log("pausing work sound")
                    workPromise.current.then(_ => {
                        workaudio.current.pause();
                    })
                    .catch(error => {
                        console.log("problem pausing work aduio during work");
                    })  
                }

                if (breakPromise.current !== undefined){
                    breakPromise.current.then(_ => {
                        breakaudio.current.pause();
                    })
                    .catch(error => {
                        console.log("problem pausing break audio during work");
                    })
                    
                }
                //breakaudio.current.pause();
                
            }
            else { 
                workPromise.current = workaudio.current.play();
                if (break_music){
                    breakPromise.current = breakaudio.current.play();
                }
                else if (breakPromise.current !== undefined){
                    breakPromise.current.then(_ => {
                        breakaudio.current.pause();
                    })
                    .catch(error => {
                        console.log("problem pausing break audio");
                    })
                }
                
                if (workPromise.current !== undefined){
                    workPromise.current.then(_ => {
                        workaudio.current.pause();
                    })
                    .catch(error => {
                        console.log("problem pausing work audio during break")
                    })
                }
                //workaudio.current.pause();
                }
            }

        else{
            if (workPromise.current !== undefined){
                workPromise.current.then (_ =>{
                    workaudio.current.pause();
                })
                .catch(error => {
                    console.log("problem pausing work audio in pause")
                })
            }
            
            if (breakPromise.current !== undefined){
                breakPromise.current.then (_ =>{
                    breakaudio.current.pause();
                })
                .catch(error => {
                    console.log("problem pausing break audio in pause")
                })
            }
           
        }
    },[countdown_state, pause, work_music, break_music])
    
    


    return (
        <div>
            <audio loop ref = {workaudio} src = {water} type = "audio/mpeg"></audio>
            <audio loop ref = {breakaudio} src = {reflections}  type = "audio/mpeg"></audio>
        </div>
    )

}
const mapStateToProps = state =>({
    countdown_state : state.countdown.countdown_state,
    pause: state.countdown.pause,
    work_music: state.settings.work_music,
    break_music: state.settings.break_music,
    animation_state: state.animation.animation_state,
})

export default connect(mapStateToProps)(Sound)