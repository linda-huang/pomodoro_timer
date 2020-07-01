import React from 'react';
import { StyledBurger } from './burger.styles';

const Burger = ({hide, setHide}) => {
    //console.log(hide)
    return (
        <StyledBurger onClick={() => setHide(!hide)} hide={hide}>
        <div />
        <div />
        <div />
        </StyledBurger>
    )
}

export default Burger
