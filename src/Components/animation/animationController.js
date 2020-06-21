import React from "react";
import { connect } from "react-redux";
import { WAVE, BALL , HIDE} from "./animationDucks";
import {setAnimationState} from './animationDucks';
import "./wavestyle.css";


class AnimationController extends React.Component {
    constructor(props){
        super(props);
        this.ballClick = this.ballClick.bind(this);
        this.waveClick = this.waveClick.bind(this);
    }

    ballClick(){
        console.log("ball out")
        if (this.props.animation_state!== BALL &&this.props.animation_state!==HIDE){
            console.log("ball")
            this.props.setAnimationState(BALL);
            console.log(this.props.animation_state);
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
            <label htmlFor="wave" className="block animation_lab">
              
            </label>
            <input
              id="wave"
              onClick={this.waveClick}
              type="radio"
              name="animation_con"
              defaultChecked={this.props.animation_state === WAVE}
            />
            <label htmlFor="ball" className="block animation_lab">
              
            </label>
            <input
              id="ball"
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