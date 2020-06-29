import React, { useState, useEffect } from "react";
import {
  setPrevState,
  setCountdownState,
  NONE,
  WORK,
  BREAK,
  INTERMEDIATE,
  SESSION_END,
} from "../timer/timerDucks";
import { connect } from "react-redux";
import Alert from "../audio/alert";

import walk from "./assets/pawnwalk.gif";
import rSleep from "./assets/catmorealsleep.gif";
import hideCat from "./assets/hidecat.gif";
import studyCat from "./assets/studycat3.gif";
import thumb from "./assets/thumb.gif";
import sleep2 from "./assets/sleepVer3.gif";
import tail from "./assets/cantailv2.gif";

function randomInt(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Prompts({
  countdown_state,
  prev_state,
  num_repeats,
  setPrevState,
  setCountdownState,
  setNumRepeats,
}) {
  const [prompt, setPrompt] = useState(null);
  const [img, setImg] = useState(null);

  const pawn = (
    <div className="full_cat">
      {/* <img src={walk} alt="cat walk" className="fullcatGif" /> */}
    </div>
  );

  const realsleep = (
    <div className="cat">
      <img src={rSleep} alt="real sleep cat" className="catGif" />
    </div>
  );

  const hide = (
    <div className="cat">
      <img src={hideCat} alt="hiding cat" className="catGif" />
    </div>
  );

  const study = (
    <div className="cat">
      <img src={studyCat} alt="study cat" className="catGif" />
    </div>
  );

  const sleep = (
    <div className="cat">
      <img src={sleep2} alt="sleep cat" className="catGif" />
    </div>
  );

  const tailCat = (
    <div className="cat">
      <img src={tail} alt="wagging tail cat" className="catGif" />
    </div>
  );

  const thumbUP = (
    <div className="cat">
      <img src={thumb} alt="thumb up cat" className="catGif" />
    </div>
  );

  const workDone = [
    "YAY! You've finished work!",
    "Good Work",
    "Have a nice long break",
  ];
  const breakDone = ["Time to get to work!", "One more push"];
  const endSession = ["Congratulation!!! you are done", "great work"];

  const workDonePic = [pawn, tailCat, sleep, realsleep];
  const breakDonePic = [pawn, hide, study];
  const endSessionPic = [thumbUP];

  useEffect(() => {
    if (countdown_state === INTERMEDIATE || countdown_state === SESSION_END) {
      if (prev_state === WORK) {
        setPrompt(workDone[randomInt(0, workDone.length - 1)]);
        setImg(workDonePic[randomInt(0, workDonePic.length - 1)]);
      } else if (prev_state === BREAK) {
        setPrompt(breakDone[randomInt(0, breakDone.length - 1)]);
        setImg(breakDonePic[randomInt(0, breakDonePic.length - 1)]);
      } else if (countdown_state === SESSION_END) {
        setPrompt(endSession[randomInt(0, endSession.length - 1)]);
        setImg(endSessionPic[randomInt(0, endSessionPic.length - 1)]);
      }

      setTimeout(() => {
        setPrompt(null);
        if (countdown_state === SESSION_END) {
          setCountdownState(NONE);
          setPrevState(SESSION_END);
        } else {
          setCountdownState(prev_state === WORK ? BREAK : WORK);
          setPrevState(INTERMEDIATE);
        }
      }, 4000);
    }
  }, [countdown_state]);

  if (prompt === null) return null;
  else {
    return (
      <div className="intermission">
        <h2 className="prompt">{prompt}</h2>

        {img}
        <Alert />
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
