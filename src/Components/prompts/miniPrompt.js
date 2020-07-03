import React from "react";
import "../../App.css";
import { connect } from "react-redux";
import { WORK, BREAK, NONE, INTERMEDIATE } from "../timer/timerDucks";

class MiniPrompt extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.countdown_state === WORK) {
      this.state = {
        displayState: "work hard",
        laterDis: "break is coming soon!",
      };
    } else if (this.props.countdown_state === BREAK) {
      this.state = {
        displayState: "play harder!",
        laterDis: "take a deep breath work is starting soon!",
      };
    } else {
      this.state = { displayState: "" };
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === WORK
    ) {
      this.setState({
        displayState: "work hard!",
        laterDis: "break is coming soon!",
      });
    } else if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === BREAK
    ) {
      this.setState({
        displayState: "play harder!",
        laterDis: "take a deep breath work is starting soon!",
      });
    }
  }

  render() {
    if (
      this.props.countdown_state === WORK ||
      this.props.countdown_state === BREAK
    ) {
      return (
        <div>
          <h3 className="miniP">{this.state.displayState}</h3>
          <h3 className="miniP">
            {this.props.time < 60 ? this.state.laterDis : ""}
          </h3>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  countdown_state: state.countdown.countdown_state,
  prev_state: state.countdown.prev_state,
  num_repeats: state.settings.num_repeats,
});

export default connect(mapStateToProps)(MiniPrompt);
