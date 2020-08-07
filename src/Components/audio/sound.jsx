import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import {WORK, BREAK} from '../timer/timerDucks';
import {WAVE, BALL} from '../animation/animationDucks.js';

//import oceanwaves from "./OceanWaves.mp3";
import reflections from "./1 - Fire.mp3";
import water from './18 - Water Lapping Wind.mp3';
import rain from './9 - Rain On Rooftop.mp3';


/* Play Sound during work countdown and break countdown*/
function Sound ({countdown_state, pause, work_music, break_music, animation_state}){
    

    const audio = useRef(null);
    
    const audioPromise = useRef(undefined);


    /* switch audio file when the animation changes*/
    useEffect(() => {
        if(countdown_state === WORK){
            if (animation_state === WAVE){     
                audio.current.src = water;
                
            }
            else{
                audio.current.src = rain;
            }
            if (!pause){
                audio.current.play();
            }
        }
    }, [animation_state, countdown_state])

    useEffect(()=> {
        if (countdown_state === BREAK){
            audio.current.src = reflections;
        }
    }, [countdown_state])

    useEffect(() => {
        if(!pause){
            audio.current.volume = 0.75;
            audioPromise.current = audio.current.play();
            if (countdown_state === WORK){ 
                if (work_music){
                    audioPromise.current = audio.current.play();  
                }  
                else if (audioPromise.current !== undefined){
                    audioPromise.current.then(_ => {
                        audio.current.pause();
                    })
                    .catch(error => {
                        console.log("problem pausing audio");
                    })  
                }
            }
            else {
                if (break_music){
                    audioPromise.current = audio.current.play();
                }     
                else if (audioPromise.current !== undefined){
                    audioPromise.current.then(_ => {
                        audio.current.pause();
                    })
                    .catch(error => {
                        console.log("problem pausing audio");
                    })  
                }
            }
        }
        else{
            if(audioPromise !== undefined){
                audioPromise.current.then(_ => {
                    audio.current.pause();
                })
                .catch(error => {
                    console.log("problem pausing work aduio during work");
                })  
            }
        }
    },[countdown_state, pause, work_music, break_music])
    
    


    return (
        <div>
            <audio loop ref = {audio} src = {water} type = "audio/mpeg"></audio>
    
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