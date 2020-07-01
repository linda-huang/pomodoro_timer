import React from "react";
import "./wavestyle.css";
import { connect } from "react-redux";
import { WORK, BREAK, NONE, INTERMEDIATE } from "../timer/timerDucks";

class WaveAnimation extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.countdown_state === WORK) {
      console.log("this prop");
      console.log(this.props.work_time);
      const tolsec = this.props.work_time;
      this.state = { total: tolsec, height: 3 };
    } else if (this.props.countdown_state === BREAK) {
      const tolsec = this.props.break_time;
      this.state = { total: tolsec, height: 100 };
    } else if (this.props.countdown_state === NONE) {
      this.state = { total: 0, height: 20 };
    }
  }

  componentDidUpdate(prevProps) {
    /*console.log("component update call");
    console.log("the state is");
    console.log(this.props.countdown_state);
    console.log("the prevstate is ");
    console.log(prevProps.countdown_state);
    console.log("this.props.countdown_state !== prevProps.countdown_state is");
    console.log(this.props.countdown_state != prevProps.countdown_state);
    console.log(" this.props.countdown_state === NONE");
    console.log(this.props.countdown_state);
    console.log(NONE);

    console.log(this.props.countdown_state === NONE);*/

    if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === WORK
    ) {
      this.setState({ total: this.props.work_time, height: 3 });
    } else if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === BREAK
    ) {
      this.setState({ total: this.props.break_time, height: 100 });
    } else if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === NONE
    ) {
      //console.log("in chaging to none");
      this.setState({ total: 0, height: 20 });
    }

    if (
      this.props.countdown_state === WORK ||
      this.props.countdown_state === BREAK
    ) {
      if (this.props.time !== prevProps.time) {
        let total = this.state.total;
        /*console.log("this is total");
        console.log(total);
        console.log("this is current");
        console.log(this.props.time);*/
        if (this.props.time > total) {
          total = this.props.time;
          this.setState({ total: this.props.time });
        }

        const percent = (this.props.time / total) * 100;

        // console.log(`percent height=${percent}%`);

        if (this.props.countdown_state === WORK) {
          //console.log("in work");
          if (100 - percent < 3) {
            this.setState({ height: 3 });
          } else {
            this.setState({ height: 100 - percent });
          }

          /*console.log("height is set");
          console.log(100 - percent);
          console.log("current height setted");
          console.log(this.state.height);*/
        } else if (this.props.countdown_state === BREAK) {
          this.setState({ height: percent });
          /*console.log("in break");
          console.log("height");
          console.log(this.state.height);*/
        }
      }
    }
  }

  render() {
    /*console.log("height");
    console.log(this.state.height);*/
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
