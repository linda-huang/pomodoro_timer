import React from "react";
import "./Button.css";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.size = props.size;
  }

  render() {
    const classes = `btn-${this.type} btn-${this.size} my-btn`;
    return (
      <button
        id={this.props.id}
        className={classes}
        onClick={() => this.props.onClick()}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
