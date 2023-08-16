
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";

const AddReplyModalContext = createContext<ModalOpenContextType | null>(null)

export default AddReplyModalContext