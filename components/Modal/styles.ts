import styled, { keyframes } from "styled-components";

interface IModalContentProps {
  isOpen: boolean;
  childSize?: { width: string; height: string; radius: number };
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ModalWrapper = styled.div<IModalContentProps>`
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
`;

export const ModalContent = styled.div<IModalContentProps>`
  z-index: 10;
  /* background-color: #ffffff; */
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${(props) => (props.isOpen ? "0" : "-100px")});
  width: ${(props) => props.childSize?.width || "200px"};
  height: ${(props) => props.childSize?.height || "200px"};
  border-radius: ${(props) => props.childSize?.radius || "0"}px;
  animation: ${(props) =>
    props.isOpen ? fadeIn : fadeOut} 0.3s forwards;
`;

