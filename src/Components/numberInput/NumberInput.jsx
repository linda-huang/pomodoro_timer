import React, { useState, useEffect, useRef } from 'react';
import './numberinput.css';
import { connect } from "react-redux";


function NumberInput ({handleRepeatChange, num_repeats}){
    const[value, setValue] = useState(num_repeats);


    const changeInput = (event) => {
        setValue(event.target.value);
        handleRepeatChange(event.target.value);
      };

    
    const increaseNum = () => {
        handleRepeatChange(value+1);
        setValue(value+1);
        
    }

    const decreaseNum = () => {
        handleRepeatChange(value-1);
        setValue(value-1);
    }

    /*useEffect(()=>{
        if(hide){
            setValue(num_repeats);
        }
    },[hide])*/

    
    return(
        <div className="input-wrapper">
             <input className="quantity" id="id_form-0-quantity" min="0" name="form-0-quantity" value={value} type="number" onChange = {changeInput}/>
             <div className = "arrows-wrapper">
                <button className="plus-btn" onClick = {increaseNum}>+</button>
                <button className="minus-btn" onClick = {decreaseNum}>-</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    num_repeats: state.settings.num_repeats,
});

export default connect(mapStateToProps)(NumberInput)