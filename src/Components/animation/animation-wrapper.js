import React from "react";
import { connect } from "react-redux";
import { WAVE, BALL,HIDE } from "./animationDucks";
import WaveAnimation from './WaveAnimation';
import BallAnimation from './BallAnimation';

import { WORK, BREAK, NONE, INTERMEDIATE } from "../timer/timerDucks";


function AnimationWrapper({ animation_state, countdown_state, time }) {
  if (countdown_state===WORK||countdown_state===BREAK|| countdown_state===NONE){
    if (animation_state === WAVE) {
      return <WaveAnimation time={time} />;
    } else if (animation_state === BALL) {
      return <BallAnimation time={time} />;
    } else if (animation_state === HIDE) {
      return null;
    }

}
else{
    return null;
}
}


const mapStateToProps = (state) => ({
  animation_state: state.animation.animation_state,
  countdown_state: state.countdown.countdown_state,
});

export default connect(mapStateToProps)(AnimationWrapper);


