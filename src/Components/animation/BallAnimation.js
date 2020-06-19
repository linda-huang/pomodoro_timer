import React from "react";
import { connect } from "react-redux";
import { WORK, BREAK } from "../timer/timerDucks";

//import css

// I decided to put everything inside the same component fk it

/////////////////random generation///////////////////////////////
// function to generate random int if min and max is int

// const time_minute = 30;
// const time_second = time_minute * 60;
// const time_Milsecond = time_minute * 60 * 1000;
// var time_left_ball_second = time_second;

const ball_rad_work = 8;
const ball_rad_break= 16;

const ve_work = 0.45;
const ve_break= 1;

//const background_Col = "#f5e8ce";
// const background_Col = "white";
const color_options = ["#F2C5AE", "#818D97", "#86A5B5", "#779DA6", "#8EB6BF"];


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
 // console.log(width);
  var pos = {};
  const x_coor = random(0 + radius, width - radius);
  //console.log("x coor");
  //console.log(x_coor);
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



  this.x += this.velX;
  this.y += this.velY;
};

function setup(numberOfBalls, width, height,size,ve) {
  balls = [];
  while (balls.length < numberOfBalls) {
    
    let pos = randomPosition(size, width, height);
    //console.log("pos");
    //console.log(pos);
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
    
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.canvasRef = React.createRef();
    let tolsec;
    let b_size;
    let b_vel;
    if (this.props.countdown_state === WORK){
      tolsec = this.props.work_hour * 3600 + this.props.work_min * 60 + this.props.work_sec
      b_size = ball_rad_work;
      b_vel = ve_work;

    }
    else if (this.props.countdown_state === BREAK){
           tolsec =
             this.props.break_hour * 3600 +
             this.props.break_min * 60 +
             this.props.break_sec;
           b_size = ball_rad_break;
           b_vel = ve_break;
    }
    console.log(` totoal time in second${tolsec}`);
    let ball_num = Math.ceil(tolsec/2);
     ball_num = ball_num>1800? 1800: ball_num;
    
    
    console.log(` totoal number of ball at creation in second${ball_num}`);
    this.state = { 
      width: 0, height: 0, 
      frame: 0, total_ball: ball_num ,size: b_size, velocity: b_vel};
    
  }

  componentDidMount() {
    // console.log("mount");
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    console.log("at component did mount");
    console.log(this.state.total_ball)
    setup(this.state.total_ball, window.innerWidth, window.innerHeight, this.state.size, this.state.velocity);
    //console.log(balls);
    console.log("num balls");
    console.log(balls.length);
    

    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateWindowDimensions() {
    //console.log("update window di")
    setup(this.state.total_ball, window.innerWidth, window.innerHeight, this.state.size, this.state.velocity);
    const canvas = this.canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  //replace with function loop from prev
  updateAnimationState() {
    // console.log("update ani");
    this.setState((prevState) => ({ frame: prevState.frame + 1 }));
    for (let i = 0; i < balls.length; i++) {
      balls[i].update(this.state.width, this.state.height);
    }
    this.rAF = requestAnimationFrame(this.updateAnimationState);
   
  }

  componentWillUnmount() {
    // console.log("unmount");
    window.removeEventListener("resize", this.updateWindowDimensions);
    cancelAnimationFrame(this.rAF);
  }

  componentDidUpdate(prevProps) {
    //console.log("did update");
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
   
   
    ctx.clearRect(0, 0, this.state.width, this.state.height);

    for (let i = 0; i < balls.length; i++) {
      balls[i].draw(ctx);
      
    }
    const current_time = this.props.sec+this.props.hr*3600 +this.props.min*60

    const prev_time = prevProps.sec+prevProps.hr*3600 +prevProps.min*60;
    //if time is less than and also devisable by two 
    const total_ball = this.state.total_ball;
    let should_be = Math.ceil(current_time/2);
    should_be = should_be>1800? 1800: should_be;
    //console.log("should be");
    //console.log(should_be);


    if (current_time < prev_time && (current_time%2)===0&& current_time<=3600)
              
      {
        balls.pop();
        this.setState((prevState)=>({total_ball:prevState.total_ball-1}));
      }
    else if (should_be> total_ball){
      console.log("in should be")
      console.log(should_be);
      console.log("current time")
      console.log(current_time);
      console.log("hr");
      console.log(this.props.hr);
       console.log(this.props.min);
        console.log(this.props.sec);


      var inc = 0;
      while (balls.length < should_be){
        
        let pos = randomPosition(this.state.size, this.state.width, this.state.height);
        let vX = random(-this.state.velocity, this.state.velocity);
        let vY = random(-this.state.velocity, this.state.velocity);
        //prevent the ball from not moving// temporary
        while (vX === 0 || vY === 0) {
          vX = random(-this.state.velocity, this.state.velocity);
          vY = random(-this.state.velocity, this.state.velocity);
        }
        let ball = new Ball(pos, vX, vY, this.state.size);
        balls.push(ball);
        inc +=1;
        
      }
      this.setState((prevState)=>({total_ball:prevState.total_ball+inc}));
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
      <canvas
        ref={this.canvasRef}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }

}


const mapStateToProps = (state) => ({
  break_hour: state.breakLength.break_hour,
  break_min: state.breakLength.break_min,
  break_sec: state.breakLength.break_sec,
  work_hour: state.workLength.work_hour,
  work_min: state.workLength.work_min,
  work_sec: state.workLength.work_sec,
  countdown_state: state.countdown.countdown_state,
});

export default connect(mapStateToProps) (BallAnimation);
