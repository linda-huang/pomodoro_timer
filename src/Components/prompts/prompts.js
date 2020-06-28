import React, { useState, useEffect } from "react";
import {
  setPrevState,
  setCountdownState,
  WORK,
  BREAK,
  INTERMEDIATE,
} from "../timer/timerDucks";
import { connect } from "react-redux";
import Alert from "../audio/alert";
// import sadcat from ".assets/679796247967694906.png";
// import happycat from ".assets/568124064485343241.gif";
import walk from "./assets/pawnwalk.gif";
import rSleep from "./assets/catmorealsleep.gif";
import hideCat from "./assets/hidecat.gif";
import studyCat from "./assets/studycat3.gif";

function Prompts({
  countdown_state,
  prev_state,
  setPrevState,
  setCountdownState,
}) {
  const [prompt, setPrompt] = useState(null);
  const [img, setImg] = useState(null);

  const pawn = (
    <div className="catWalk">
      <img src={walk} alt="cat walk" />
    </div>
  );

  const realsleep = (
    <div className="realSleep catGif">
      <img src={rSleep} alt="real sleep cat" />
    </div>
  );

  useEffect(() => {
    if (countdown_state === INTERMEDIATE) {
      if (prev_state === WORK) {
        setPrompt("YAY! You've finished work!");
        setImg(realsleep);
      } else {
        setPrompt("Time to get to work!");
        setImg(pawn);
      }
      setTimeout(() => {
        setPrompt(null);
        setCountdownState(prev_state === WORK ? BREAK : WORK);
        setPrevState(INTERMEDIATE);
      }, 2000);
    }
  }, [countdown_state]);

  if (prompt === null) return null;
  else {
    return (
      <div>
        {img}
        {/* <div className = "cat">
                <img src = {img} alt = "cat"/>
                </div> */}
        <div className="intermission">
          <h2 className="prompt">{prompt}</h2>

          <Alert />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  countdown_state: state.countdown.countdown_state,
  prev_state: state.countdown.prev_state,
});

const mapDispatchToProps = (dispatch) => ({
  setCountdownState: (state) => dispatch(setCountdownState(state)),
  setPrevState: (state) => dispatch(setPrevState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prompts);
