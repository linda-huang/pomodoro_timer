import React from 'react';
import './sprite.scss';

export default function PlusAnimation({time}) {
    return ( 
        <div className='body'>
            <input id="toggle-plus" type="checkbox" />
            <label for="toggle-plus">+{time}</label>
        </div>
    )
}