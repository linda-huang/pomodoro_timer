import React, { useState, useEffect, useRef } from 'react';
import './numberinput.css';

export default function NumberInput ({handleRepeatChange}){
    const[value, setValue] = useState(0);


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