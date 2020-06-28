import React, { useState, useEffect } from 'react';
import { StyledBurger } from './burger.styles';

const Burger = ({hide, setHide}) => {
    const[windowWidth,setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [window.innerWidth])

    return (
        <StyledBurger windowWidth={windowWidth} onClick={() => setHide(!hide)} hide={hide}>
        <div />
        <div />
        <div />
        </StyledBurger>
    )
}

export default Burger
