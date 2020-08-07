import React from "react";
import { connect } from "react-redux";
import { WORK, BREAK, NONE } from "../timer/timerDucks";
import "./wavestyle.css";

//import css

// I decided to put everything inside the same component fk it

/////////////////random generation///////////////////////////////
// function to generate random int if min and max is int

// const time_minute = 30;
// const time_second = time_minute * 60;
// const time_Milsecond = time_minute * 60 * 500;
// var time_left_ball_second = time_second;

// const ball_rad_work = 26;
// const ball_rad_break= 28;
// const ball_rad_none = 24;

const ball_rad_work = 0.024;
const ball_rad_break = 0.028;
const ball_rad_none = 0.03;

// requirements: startReducing/reduceEveryMin=maxBallNum
const reduceEveryMin = 15; // reduce number of balls every () seconds
const startReducing = 1800; //start reducing once timer reach
const maxBallNum = 120; // max number of ball

const ve_work = 0.5;
const ve_break = 0.8;

//const background_Col = "#f5e8ce";
// const background_Col = "white";
const color_options = [
  "rgba(242, 197, 174, 0.4)",
  "rgba(129, 141, 151, 0.4)",
  "rgba(134, 165, 181, 0.4)",
  "rgba(119, 157, 166, 0.4)",
  "rgba(141, 182, 191, 0.4)",
];

//ball expansion
// const ball_fat = 18;
// const rad_f_m = 40;

function randomInt(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function random(min, max) {
  const num = Math.random() * (max - min) + min;
  return num;
}
//return random position the ball should spawn
function randomPosition(radius, width, height) {
  var pos = {};
  const x_coor = random(0 + radius, width - radius);
  const y_coor = random(0 + radius, height - radius);
  pos.x = x_coor;
  pos.y = y_coor;
  return pos;
}

//return random color from list of color
function randomColor(option) {
  const n = randomInt(0, option.length - 1);
  return option[n];
}

function Ball(pos, velX, velY, size) {
  this.x = pos.x;
  this.y = pos.y;
  this.velX = velX;
  this.velY = velY;
  this.color = randomColor(color_options);
  this.size = size;
}

Ball.prototype.draw = function (ct) {
  ct.beginPath();

  ct.strokeStyle = this.color;
  ct.fillStyle = this.color;

  ct.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  // ctx.fill();
  ct.stroke();
  ct.fill();
};

Ball.prototype.update = function (width, height) {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

function setup(numberOfBalls, width, height, size, ve) {
  balls = [];
  while (balls.length < numberOfBalls) {
    let pos = randomPosition(size, width, height);
    let vX = random(-ve, ve);
    let vY = random(-ve, ve);
    //prevent the ball from having valicity of zero
    while (vX === 0 || vY === 0) {
      vX = random(-ve, ve);
      vY = random(-ve, ve);
    }
    let ball = new Ball(pos, vX, vY, size);
    balls.push(ball);
  }
}

var balls = [];

class BallAnimation extends React.Component {
  //call before mount
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.canvasRef = React.createRef();

    if (this.props.countdown_state === WORK) {
      const ball_num = Math.ceil(this.props.work_time / reduceEveryMin);
      this.state = {
        width: 0,
        height: 0,
        frame: 0,
        total_ball: ball_num > maxBallNum ? maxBallNum : ball_num,
        size: ball_rad_work,
        velocity: ve_work,
      };
    } else if (this.props.countdown_state === BREAK) {
      const ball_num = Math.ceil(this.props.break_time / reduceEveryMin);
      this.state = {
        width: 0,
        height: 0,
        frame: 0,
        total_ball: ball_num > maxBallNum ? maxBallNum : ball_num,
        size: ball_rad_break,
        velocity: ve_break,
      };
    } else if (this.props.countdown_state === NONE) {
      this.state = {
        width: 0,
        height: 0,
        frame: 0,
        total_ball: 50,
        size: ball_rad_none,
        velocity: ve_work,
      };
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    setup(
      this.state.total_ball,
      window.innerWidth,
      window.innerHeight,
      window.innerWidth * this.state.size,
      this.state.velocity
    );
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateWindowDimensions() {
    setup(
      this.state.total_ball,
      window.innerWidth,
      window.innerHeight,
      window.innerWidth * this.state.size,
      this.state.velocity
    );
    const canvas = this.canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updateAnimationState() {
    this.setState((prevState) => ({ frame: prevState.frame + 1 }));
    if (!this.props.pause) {
      for (let i = 0; i < balls.length; i++) {
        balls[i].update(this.state.width, this.state.height);
      }
    }

    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    cancelAnimationFrame(this.rAF);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === WORK
    ) {
      let tolsec = this.props.work_time;
      let ball_num = Math.ceil(tolsec / reduceEveryMin);
      ball_num = ball_num > maxBallNum ? maxBallNum : ball_num;
      this.setState({
        total_ball: ball_num,
        size: ball_rad_work,
        frame: 0,
        velocity: ve_work,
      });
      setup(
        ball_num,
        window.innerWidth,
        window.innerHeight,
        window.innerWidth * ball_rad_work,
        ve_work
      );
    } else if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === BREAK
    ) {
      let tolsec = this.props.break_time;
      let ball_num = Math.ceil(tolsec / reduceEveryMin);
      ball_num = ball_num > maxBallNum ? maxBallNum : ball_num;
      this.setState({
        total_ball: ball_num,
        frame: 0,
        size: ball_rad_break,
        velocity: ve_break,
      });
      setup(
        ball_num,
        window.innerWidth,
        window.innerHeight,
        window.innerWidth * ball_rad_break,
        ve_break
      );
    } else if (
      this.props.countdown_state !== prevProps.countdown_state &&
      this.props.countdown_state === NONE
    ) {
      this.setState({
        total_ball: 200,
        frame: 0,
        size: ball_rad_break,
        velocity: ve_work,
      });
      setup(
        50,
        window.innerWidth,
        window.innerHeight,
        window.innerWidth * ball_rad_none,
        ve_work
      );
    }

    if (
      this.props.countdown_state === WORK ||
      this.props.countdown_state === BREAK
    ) {
      let should_be = Math.ceil(this.props.time / reduceEveryMin);
      should_be = should_be > maxBallNum ? maxBallNum : should_be;

      if (this.props.time < prevProps.time) {
        if (
          this.props.time < startReducing &&
          this.props.time % reduceEveryMin === 0
        ) {
          while (balls.length > 0 && balls.length > should_be) {
            balls.pop();
            this.setState((prevState) => ({
              total_ball: prevState.total_ball - 1,
            }));
          }
        }
      } else if (this.props.time > prevProps.time || balls.length < should_be) {
        var inc = 0;
        while (balls.length < should_be) {
          let pos = randomPosition(
            this.state.size * this.state.width,
            this.state.width,
            this.state.height
          );
          let vX = random(-this.state.velocity, this.state.velocity);
          let vY = random(-this.state.velocity, this.state.velocity);
          //prevent the ball from not moving// temporary
          while (vX === 0 || vY === 0) {
            vX = random(-this.state.velocity, this.state.velocity);
            vY = random(-this.state.velocity, this.state.velocity);
          }
          let ball = new Ball(pos, vX, vY, this.state.size * this.state.width);
          balls.push(ball);
          inc += 1;
        }
        this.setState((prevState) => ({
          total_ball: prevState.total_ball + inc,
        }));
      }
    }

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, this.state.width, this.state.height);

    for (let i = 0; i < balls.length; i++) {
      balls[i].draw(ctx);
    }
  }

  //balls[i].draw(ctx);

  // ctx.beginPath();
  // ctx.fillStyle = "black"
  // ctx.arc(20,20,9,0, 2 * Math.PI);
  // ctx.fill();

  //will do something

  render() {
    return (
      <section id="ball_container">
        <canvas
          ref={this.canvasRef}
          width={this.state.width}
          height={this.state.height}
        />
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

export default connect(mapStateToProps)(BallAnimation);
