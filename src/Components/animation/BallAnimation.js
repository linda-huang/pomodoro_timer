import React from "react";
//import css

// I decided to put everything inside the same component fk it

/////////////////random generation///////////////////////////////
// function to generate random int if min and max is int

const time_minute = 30;
const time_second = time_minute * 60;
const time_Milsecond = time_minute * 60 * 1000;
var time_left_ball_second = time_second;

const ball_rad = 12;

const ve = 0.45;
//const background_Col = "#f5e8ce";
const background_Col = "white";
const color_options = ["#F2C5AE", "#818D97", "#86A5B5", "#779DA6", "#8EB6BF"];
//["#F2C5AE", "#272840", "#464659", "#779DA6", "#8EB6BF"]

//ball expansion
const ball_fat = 18;
const rad_f_m = 40;

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
  console.log(width);
  var pos = {};
  //ball position always drawn at least one ball width
  // away from the edge of the canvas, to avoid drawing errors
  const x_coor = random(0 + radius, width - radius);
  console.log("x coor");
  console.log(x_coor);
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
  // this.color = "blue"
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

  //   var disX = Math.abs(this.x - mX);
  //   var disY = Math.abs(this.y - mY);

  //   if (in_window) {
  //     if (disX < rad_f_m && disY < rad_f_m && this.size <= ball_fat) {
  //       // console.log("makebig")
  //       // console.log(mX)
  //       this.size++;
  //     } else if (this.size > ball_rad) {
  //       this.size--;
  //     }

  // if (disX < this.size && disY < this.size) {
  //   this.velY = -this.velY;
  //   this.velX = -this.velX;
  // }
  //   }

  this.x += this.velX;
  this.y += this.velY;
};

function setup(numberOfBalls, width, height) {
  balls = [];
  while (balls.length < numberOfBalls) {
    let size = ball_rad;
    let pos = randomPosition(size, width, height);
    console.log("pos");
    console.log(pos);
    let vX = random(-ve, ve);
    let vY = random(-ve, ve);
    //prevent the ball from not moving// temporary
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
    // console.log("cons");
    this.state = { width: 0, height: 0, frame: 0, index: this.props.index };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // console.log("mount");
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    setup(20, window.innerWidth, window.innerHeight);
    console.log(balls);

    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateWindowDimensions() {
    //console.log("update window di")
    setup(20, window.innerWidth, window.innerHeight);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  //replace with function loop from prev
  updateAnimationState() {
    // console.log("update ani");
    this.setState((prevState) => ({ frame: prevState.frame + 1 }));
    for (let i = 0; i < 20; i++) {
      balls[i].update(this.state.width, this.state.height);
    }
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    // console.log("unmount");
    window.removeEventListener("resize", this.updateWindowDimensions);
    cancelAnimationFrame(this.rAF);
  }

  componentDidUpdate() {
    //console.log("did update");
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = this.state.width;
    canvas.height = this.state.height;
    //ctx.clearRect(0, 0, this.state.width, this.state.height);

    for (let i = 0; i < 20; i++) {
      balls[i].draw(ctx);
      // const ball = balls[i];

      //   ctx.beginPath();

      //   ctx.fillStyle = ball.color;
      //   // console.log(ball.color);
      //   // console.log(ball.x);

      //   ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
      //   // ctx.fill();

      //   ctx.fill();
    }

    //balls[i].draw(ctx);
  }
  // ctx.beginPath();
  // ctx.fillStyle = "black"
  // ctx.arc(20,20,9,0, 2 * Math.PI);
  // ctx.fill();

  //will do something

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

export default BallAnimation;
