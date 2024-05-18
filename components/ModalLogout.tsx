import { useEffect, forwardRef, ForwardedRef } from "react";
import styled from "styled-components";

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  setChildSize: React.Dispatch<React.SetStateAction<{ width: string; height: string }>>;
  childSize: { width: string; height: string };
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? "flex" : "none")};
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  z-index: 99999;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  width: 1000px;

  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
  }
`;

const Modal = forwardRef((props: IModalProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, isOpen, onClose, setChildSize, childSize, ...rest } = props;

  
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setChildSize({
          width: `${entry.contentRect.width}px`,
          height: `${entry.contentRect.height}px`,
        });
      }
    });
    
    if (ref && 'current' in ref && ref.current) {
      resizeObserver.observe(ref.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, setChildSize]);
  
  Modal.displayName = 'Modal';
  return (
    <Overlay onClick={onClose} isOpen={isOpen} {...rest}>
      <ModalContainer ref={ref as React.MutableRefObject<HTMLDivElement>} style={{ width: "auto", height:"auto" }} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>
  );
});

export default Modal;
