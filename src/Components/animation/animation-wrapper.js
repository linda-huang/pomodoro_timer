import React from "react";
import { connect } from "react-redux";
import { WAVE, BALL,HIDE } from "./animationDucks";
import WaveAnimation from './WaveAnimation';
import BallAnimation from './BallAnimation';


function AnimationWrapper({animation_state, time}){
    if (animation_state===WAVE){
        
        return (<WaveAnimation time={time}/>);
    }

    else if (animation_state===BALL){
        return(<BallAnimation time={time}/>)
    }

    else if (animation_state===HIDE){
        return null;
    }
}


const mapStateToProps = (state) => ({
  animation_state: state.animation.animation_state,
  
});

export default connect(mapStateToProps)(AnimationWrapper);


