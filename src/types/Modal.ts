import { HTMLAttributes, ReactNode } from "react";

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    setChildSize?: React.Dispatch<React.SetStateAction<{ width: string; height: string }>>;
    childSize?: { width: string; height: string; radius:number; };
  }