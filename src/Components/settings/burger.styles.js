import styled from 'styled-components';

export const StyledBurger = styled.button`
  position: absolute;
  top: 5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: rgb(52, 52, 52);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

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