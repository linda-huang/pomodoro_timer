import React from "react";
import "./wavestyle.css";
import { connect } from "react-redux";
import { WORK, BREAK, NONE, INTERMEDIATE } from "../timer/timerDucks";

class WaveAnimation extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.countdown_state === WORK) {
      const tolsec = this.props.work_time;
      this.state = { total: tolsec, height: 0 };
    } else if (this.props.countdown_state === BREAK) {
      const tolsec = this.props.break_time;
      this.state = { total: tolsec, height: 100 };
    } else if (this.props.countdown_state === NONE) {
      this.state = { total: 0, height: 20 };
    }
  }

  componentDidUpdate(prevProps) {

    if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === WORK
    ) {
      this.setState({ total: this.props.work_time, height: 0 });
    } else if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === BREAK
    ) {
      this.setState({ total: this.props.break_time, height: 100 });
    } else if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === NONE
    ) {
    
      this.setState({ total: 0, height: 20 });
    }

    if (
      this.props.countdown_state === WORK ||
      this.props.countdown_state === BREAK
    ) {
      if (this.props.time !== prevProps.time) {
        let total = this.state.total;

        if (this.props.time > total) {
          total = this.props.time;
          this.setState({ total: this.props.time });
        }

        const percent = (this.props.time / total) * 100;

        if (this.props.countdown_state === WORK) {
          
          this.setState({ height: 100 - percent });

        } else if (this.props.countdown_state === BREAK) {
          this.setState({ height: percent });
       
        }
      }
    }
  }

  render() {

    return (
      <section id="container">
        <div
          id="w1"
          className="water"
          style={{
            height: `${this.state.height}%`,
            animationPlayState: `${this.props.pause ? "paused" : "running"}`,
          }}
        >
          <span
            id="wave1"
            className="wave animation"
            style={{
              animationPlayState: `${this.props.pause ? "paused" : "running"}`,
            }}
          ></span>
          <span id="deep1" className="deep animation"></span>
        </div>
        <div
          className="water"
          id="w2"
          style={{
            height: `${this.state.height}%`,
            animationPlayState: `${this.props.pause ? "paused" : "running"}`,
          }}
        >
          <span
            id="wave2"
            className="wave animation"
            style={{
              animationPlayState: `${this.props.pause ? "paused" : "running"}`,
            }}
          ></span>
          <span id="deep2" className="deep animation"></span>
        </div>
        <div
          className="water"
          id="w3"
          style={{
            height: `${this.state.height}%`,
            animationPlayState: `${this.props.pause ? "paused" : "running"}`,
          }}
        >
          <span
            id="wave3"
            className="wave animation"
            style={{
              animationPlayState: `${this.props.pause ? "paused" : "running"}`,
            }}
          ></span>
          <span id="deep3" className="deep animation"></span>
        </div>
        <div
          id="w4"
          className="water"
          style={{
            height: `${this.state.height}%`,
            animationPlayState: `${this.props.pause ? "paused" : "running"}`,
          }}
        >
          <span
            id="wave4"
            className="wave animation"
            style={{
              animationPlayState: `${this.props.pause ? "paused" : "running"}`,
            }}
          ></span>
          <span id="deep4" className="deep animation"></span>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  work_time: state.time.work_time,
  break_time: state.time.break_time,
  pause: state.countdown.pause,
  countdown_state: state.countdown.countdown_state,
  prev_state: state.countdown.prev_state,
});

export default connect(mapStateToProps)(WaveAnimation);
