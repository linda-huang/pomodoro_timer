import React from "react";
import { connect } from "react-redux";
import { WAVE, BALL , HIDE} from "./animationDucks";
import {setAnimationState} from './animationDucks';
import "./wavestyle.css";
import "../../App.css";


class AnimationController extends React.Component {
    constructor(props){
        super(props);
        this.ballClick = this.ballClick.bind(this);
        this.waveClick = this.waveClick.bind(this);
    }

    ballClick(){
      
        if (this.props.animation_state!== BALL &&this.props.animation_state!==HIDE){
            this.props.setAnimationState(BALL);
        }
    }

    waveClick(){
        if (
          this.props.animation_state !== WAVE &&
          this.props.animation_state !== HIDE
        ) {
          this.props.setAnimationState(WAVE);
        }

    }



    render(){
        return (
          <div id="animation_con">
            <label
              htmlFor="wave_input"
              id="wave_lab"
              className="block animation_lab"
            ></label>
            <input
              id="wave_input"
              onClick={this.waveClick}
              type="radio"
              name="animation_con"
              defaultChecked={this.props.animation_state === WAVE}
            />

            <label
              htmlFor="ball_input"
              id="ball_lab"
              className="block animation_lab"
            ></label>
            <input
              id="ball_input"
              onClick={this.ballClick}
              type="radio"
              name="animation_con"
              defaultChecked={this.props.animation_state === BALL}
            />

            <span id="animation_slider"></span>
          </div>
        );
      }
}




const mapStateToProps = (state) => ({
  animation_state: state.animation.animation_state,
});
const mapDispatchToProps = dispatch => ({
    setAnimationState: state => dispatch(setAnimationState(state)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AnimationController);
