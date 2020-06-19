
import React from "react";
import "./Toggle.css";

const Toggle = ({ isChecked, handleToggle, size }) => {
  return (
    // <div id= {this.props.id} className={containerClass}>
    //     <h1>toggle</h1>
    //     <input
    //     type="checkbox" className="toggle-checkbox" id={this.props.id}
    //     defaultChecked={this.state.checked}
    //     onChange = {(e)=>this.onChange(e)}/>
    //     {this.props.id? (<label className={`tg-label tg-${this.size}`} htmlFor={this.props.id}>
    //         <span className={`tg-sp tg-${this.size} `}/>
    //     </label>
    //     ) : null}

    // </div>
    <div className={`toggle tg-${size}`}>
      {/* <h1>toggle</h1> */}
      <label className={`switch tg-lab-${size}`}>
        <input
          type="checkbox"
          className="toggle-checkbox"
          defaultChecked={isChecked}
          onChange={handleToggle}
        />
        <span className={`slider tg-${size}`}></span>
      </label>
    </div>
  );
};


export default Toggle;