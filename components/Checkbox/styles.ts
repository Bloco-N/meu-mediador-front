import styled, { keyframes } from "styled-components";

export const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

export const Label = styled.label<{ disabled: boolean }>`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 0.6em 1em;
  font-size: 14px;
`;

export const rotate = keyframes`
  from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(42deg);
  }
`;

export const Indicator = styled.div`
  width: 1.2em;
  height: 1.2em;
  background: #e6e6e6;
  position: absolute;
  top: 2px;
  left: -1.6em;
  border: 1px solid #757575;
  border-radius: 0.2em;
  transition: background 0.3s ease;

  ${Input}:not(:disabled):checked + & {
    background: #4caf50;
  }

  ${Label}:hover & {
    background: #ccc;
    font-size: 16px;
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    left: 0.30em;
    width: 25%;
    height: 60%;
    border: solid #FFF;
    border-width: 0 0.2em 0.2em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
