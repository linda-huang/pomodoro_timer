import styled from 'styled-components';

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 25vw;
  text-align: left;
  padding: 2rem;
//   background: rgba(10, 186, 181, 0.3);
background: rgba(245, 245, 245, 0.9);
  position: absolute;
  top: 0;
  right: 0;
  transform: ${({ hide }) => hide ? 'translateX(+100%)' : 'translateX(0)'};
  transition: transform 0.3s ease-in-out;
  
  div {
    width: 0.9 rem;
    height: 2px;
    background: rgb(52, 52, 52, 0.7);
    border-radius: 2px;
    // transition: all 0.3s linear;
    position: relative;
    // transform-origin: 1px;
  }
  `

export default StyledMenu