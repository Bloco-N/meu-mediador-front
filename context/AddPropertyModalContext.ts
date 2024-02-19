
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { Dispatch, SetStateAction, createContext } from "react";

export interface ModalPropertyOpenContextType extends ModalOpenContextType{
    propertyToUpdate: any
    setPropertyToUpdate:  Dispatch<SetStateAction<any>>
}
const AddPropertyModalContext = createContext<ModalPropertyOpenContextType | null>(null)

export default AddPropertyModalContext