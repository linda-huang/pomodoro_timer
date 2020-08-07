import styled from "styled-components";

export const StyledBurger = styled.button`
  position: absolute;
  top: 2vw;
  right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
    height: 0.1vmin;
    background: #828b93;
    border-color: #828b93;
    border-radius: 10vmin;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

    border: 0.9vmin solid rgba(0, 0, 0, 0);

    //padding-bottom: 1vmin;

    margin-bottom: 19vmin;

    :first-child {
      transform: ${({ hide }) => (hide ? "rotate(0)" : "rotate(45deg)")};
    }

    :nth-child(2) {
      opacity: ${({ hide }) => (hide ? "1" : "0")};
      transform: ${({ hide }) => (hide ? "translateX(0)" : "translateX(20px)")};
    }

    :nth-child(3) {
      transform: ${({ hide }) => (hide ? "rotate(0)" : "rotate(-45deg)")};
    }
  }
`;
