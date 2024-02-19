import { Dispatch, SetStateAction } from "react";

export type ModalOpenContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  callback?: () => void; // Adicione um campo opcional para o callback
};

export type ModalOpenContextAddReply = {
  state: {
    open: boolean;
    commentId: number;
    reply: string;
  };
  setOpen: Dispatch<SetStateAction<{ open: boolean; commentId: number; reply: string }>>;
  callback?: () => void; // Adicione um campo opcional para o callback
};
