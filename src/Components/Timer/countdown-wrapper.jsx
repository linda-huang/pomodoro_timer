import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//import AddTime from './addTime/add-button';
import Countdown from "./countdown";
import Prompts from "../prompts/prompts";
import { NONE, INTERMEDIATE, setPaused, SESSION_END } from "./timerDucks";
import "./timer.css";

import "../../App.css";
import Button from "../UIKits/Button";

function CountdownWrapper({ countdown_state, setPaused, pause, updateTime }) {
  let pauseLabel = !pause ? "Pause" : "Resume";

  const handleOnClick = () => {
    setPaused(!pause);
  };

  if (countdown_state === NONE) return null;
  else if (countdown_state === INTERMEDIATE || countdown_state === SESSION_END)
    return <Prompts />;
  else {
    return (
      <div className="CountdownWrapper">
        <div className="countdownDisplay">
          <Countdown pause={pause} updateTime={updateTime} />
        </div>

        <div className="pauseBttn">
          <Button type="secondary" size="medium" onClick={handleOnClick}>
            {pauseLabel}
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPaused: (state) => dispatch(setPaused(state)),
});

const mapStateToProps = (state) => ({
  countdown_state: state.countdown.countdown_state,
  pause: state.countdown.pause,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownWrapper);
