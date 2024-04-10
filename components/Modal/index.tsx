import React, { ReactNode, forwardRef, useEffect, RefObject, HTMLAttributes } from "react";
import * as C from "./styles";

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  setChildSize?: React.Dispatch<React.SetStateAction<{ width: string; height: string }>>;
  childSize?: { width: string; height: string; radius:number; };
}

const Modal = forwardRef<HTMLDivElement, IModalProps>(
  (
    {
      children,
      isOpen,
      onClose,
      setChildSize,
      childSize = { width: "200px", height: "200px", radius: 0 },
      ...rest
    }: IModalProps,
    ref:any
  ) => {
    useEffect(() => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setChildSize?.({
            width: `${entry.contentRect.width}px`,
            height: `${entry.contentRect.height}px`,
          });
        }
      });

      if (ref && ref.current) {
        resizeObserver.observe(ref.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [ref, setChildSize]);

    return (
      <C.ModalWrapper onClick={onClose} isOpen={isOpen} ref={ref} {...rest}>
        <C.ModalContent isOpen={isOpen} childSize={childSize}>
          {children}
        </C.ModalContent>
      </C.ModalWrapper>
    );
  }
);

export default Modal;
