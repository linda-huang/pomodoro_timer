import styled from 'styled-components';

export const StyledBurger = styled.button`
  position: absolute;
  top: 2vw;
  right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 6vmin;
  height: 6vmin;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000001;

  &:focus {
    outline: none;
  }

  // #first-burger {
  //   width: 100%;
  //   height: 0.5vmin;
  //   margin-top: 3px;
  //   background: rgb(52, 52, 52);
  //   border-radius: 10px;
  //   transition: all 0.3s linear;
  //   position: relative;
  //   transform-origin: 1px;

  // }

  // #second-burger{
  //   width: 100%;
  //   height: 0.5vmin;
  //   margin-top: 3px;
  //   background: rgb(52, 52, 52);
  //   border-radius: 10px;
  //   transition: all 0.3s linear;
  //   position: relative;
  //   transform-origin: 1px;

  // }

  // #third-burger{
  //   width: 100%;
  //   height: 0.5vmin; 
  //   margin-top: 3px;
  //   background: rgb(52, 52, 52);
  //   border-radius: 10px;
  //   transition: all 0.3s linear;
  //   position: relative;
  //   transform-origin: 1px;

  // }

  div {
    flex: 1;
    width: 100%;
    height: 0.5vmin;
    background: rgb(52, 52, 52);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    margin-bottom: 1.5vmin;

    :first-child {
      transform: ${({ hide }) => hide ? 'rotate(0)' : 'rotate(45deg)'};
    }

    :nth-child(2) {
      opacity: ${({ hide }) => hide ? '1' : '0'};
      transform: ${({ hide }) => hide ? 'translateX(0)' : 'translateX(20px)'};
    }

    :nth-child(3) {
      transform: ${({ hide }) => hide ? 'rotate(0)' : 'rotate(-45deg)' };
    }
  }
`;