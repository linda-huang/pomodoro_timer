import React, { useState, useEffect } from 'react';
import { StyledBurger } from './burger.styles';

const Burger = ({hide, setHide}) => {
    return (
        <StyledBurger onClick={() => setHide(!hide)} hide={hide}>
        <div />
        <div />
        <div />
        </StyledBurger>
    )
}

export default Burger
