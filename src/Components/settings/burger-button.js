import React from 'react';
import { StyledBurger } from './burger.styles';

const Burger = ({hide, setHide}) => {
    return (
        <StyledBurger onClick={() => setHide(!hide)} hide={hide}>
        <div id='first-burger'/>
        <div id='second-burger'/>
        <div id='third-burger'/>
        </StyledBurger>
    )
}

export default Burger
