import React from "react";
import './wavestyle.css';
import { connect } from "react-redux";


class WaveAnimation extends React.Component {
    constructor(props){
        super(props);
        
        const tolsec = this.props.work_countdown
          ? (this.props.work_hour * 3600 + this.props.work_min * 60)
          : (this.props.break_hour * 3600 + this.props.break_min * 60);
        console.log(
          `in construct the time is ${this.props.work_min} work min  ${this.props.break_min} sec`
        );
        console.log(`eval the total =${tolsec}`)
        const inH = this.props.work_hour? 100:0;
         console.log(`in construnct height is set to ${inH}`);
        this.state= {total: tolsec, height: inH}
    }

    componentDidUpdate(prevProps){
      if (
        
        this.props.sec !== prevProps.sec ||
        this.props.hr !== prevProps.hr ||
        this.props.min !== prevProps.min
      ) {
        console.log(`currently it ${this.props.hr}hr ${this.props.min}min ${this.props.sec}sec`)
        const current =
          this.props.hr * 3600 + this.props.min * 60 + this.props.sec;
        // console.log(`current time eval in to ${current}`);
       
        // console.log(`total time ${this.state.total}`);
        
       

        const percent = (current / this.state.total) * 100;
        console.log(`percent height=${percent}%`);
        
        if (this.props.work_countdown) {
          console.log("in work");
          this.setState({ height: 100 - percent });

          console.log("height is set");
          console.log(100 - percent);
          console.log("current height setted")
          console.log(this.state.height);
        } else {
          this.setState({ height: percent });
          console.log("in break");
          console.log("height");
          console.log(this.state.height);
        }
      }

      if (this.props.work_countdown!== prevProps.work_countdown){
         const tolsec = this.props.work_countdown
           ? this.props.work_hour * 3600 + this.props.work_min * 60
           : this.props.break_hour * 3600 + this.props.break_min * 60;
         const inH = this.props.work_hour ? 100 : 0;
         console.log(`in update height is set to ${inH}`)
           this.setState({total:tolsec, height: inH});

      }

    }

    render(){

        return (
          <section id="container">
            <div
              id="w1"
              className="water"
              style={{ height: `${this.state.height}%` }}
            ></div>
            <div
              id="w2"
              className="water"
              style={{ height: `${this.state.height}%` }}
            ></div>
            <div
              id="w3"
              className="water"
              style={{ height: `${this.state.height}%` }}
            ></div>
            <div
              id="w4"
              className="water"
              style={{ height: `${this.state.height}%` }}
            ></div>
          </section>
        );
    }
}

const mapStateToProps = (state) => ({
  break_hour: state.breakLength.break_hour,
  break_min: state.breakLength.break_min,
  work_hour: state.workLength.work_hour,
  work_min: state.workLength.work_min,
  work_countdown: state.countdown.work_countdown,

  
});

export default connect(mapStateToProps) (WaveAnimation);

