import React from "react";
import './wavestyle.css';
import { connect } from "react-redux";
import { WORK, BREAK } from "../timer/timerDucks";


class WaveAnimation extends React.Component {
    constructor(props){
        super(props);
        let tolsec;
        if (this.props.countdown_state === WORK){
          tolsec = this.props.work_time;
        }
        else if (this.props.countdown_state === BREAK){
           tolsec =this.props.break_time;}
     
        const inH = this.props.countdown_state===WORK? 0:100;
        //console.log(`in construnct height is set to ${inH}`);
        this.state= {total: tolsec, height: inH}
    }

    componentDidUpdate(prevProps){

      if (
       this.props.time !== prevProps.time
      ) {
        let total = this.state.total;
        if (this.props.time > total){
          total = this.props.time;
          this.setState({total: this.props.time});
        }

        const percent = (this.props.time / total) * 100;

       // console.log(`percent height=${percent}%`);
        
        if (this.props.countdown_state===WORK) {
          console.log("in work");
          this.setState({ height: 100 - percent });

          console.log("height is set");
          console.log(100 - percent);
          console.log("current height setted")
          console.log(this.state.height);
        } else if (this.props.countdown_state===BREAK) {
          this.setState({ height: percent });
          console.log("in break");
          console.log("height");
          console.log(this.state.height);
        }
      }

      if (this.props.work_countdown!== prevProps.work_countdown && this.props.work_countdown ===WORK){
         
           this.setState({total:this.props.work_time, height: 0});

      }
      else if (this.props.work_countdown!== prevProps.work_countdown && this.props.work_countdown ===BREAK){
        this.setState({ total: this.props.break_time, height: 100 });
      }

    }

    render(){
     
        return (
          <section id="container">
            <div
              id="w1"
              className="water"
              style={{
                height: `${this.state.height}%`,
                animationPlayState: `${
                  this.props.pause ? "paused" : "running"
                }`,
              }}
            >
              <span
                id="wave1"
                className="wave animation"
                style={{
                  animationPlayState: `${
                    this.props.pause ? "paused" : "running"
                  }`,
                }}
              ></span>
              <span id="deep1" className="deep animation"></span>
            </div>
            <div
              className="water"
              id="w2"
              style={{
                height: `${this.state.height}%`,
                animationPlayState: `${
                  this.props.pause ? "paused" : "running"
                }`,
              }}
            >
              <span
                id="wave2"
                className="wave animation"
                style={{
                  animationPlayState: `${
                    this.props.pause ? "paused" : "running"
                  }`,
                }}
              ></span>
              <span id="deep2" className="deep animation"></span>
            </div>
            <div
              className="water"
              id="w3"
              style={{
                height: `${this.state.height}%`,
                animationPlayState: `${
                  this.props.pause ? "paused" : "running"
                }`,
              }}
            >
              <span
                id="wave3"
                className="wave animation"
                style={{
                  animationPlayState: `${
                    this.props.pause ? "paused" : "running"
                  }`,
                }}
              ></span>
              <span id="deep3" className="deep animation"></span>
            </div>
            <div
              id="w4"
              className="water"
              style={{
                height: `${this.state.height}%`,
                animationPlayState: `${
                  this.props.pause ? "paused" : "running"
                }`,
              }}
            >
              <span
                id="wave4"
                className="wave animation"
                style={{
                  animationPlayState: `${
                    this.props.pause ? "paused" : "running"
                  }`,
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
});


export default connect(mapStateToProps) (WaveAnimation);

