import styled from 'styled-components';

export const StyledBurger = styled.button`
  height: 35%;
  width: 35%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000001;

  &:focus {
    outline: none;
  }

  div {
    width: 100%;
    height: 0.25em;
    background: rgb(52, 52, 52);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    z-index: 1000002;

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