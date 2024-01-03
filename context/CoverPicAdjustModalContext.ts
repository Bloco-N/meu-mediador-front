import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { Dispatch, SetStateAction, createContext } from "react";


export interface CoverPicAdjustModalContextType extends ModalOpenContextType{
    srcImg: string,
    setSrcImg: Dispatch<SetStateAction<string>>
}

const CoverPicAdjustModalContext = createContext<CoverPicAdjustModalContextType | null>(null)

export default CoverPicAdjustModalContext