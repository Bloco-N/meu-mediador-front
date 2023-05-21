import { Dispatch, SetStateAction } from "react"

export type ModalOpenContextType = {
  open: boolean,
  setOpen:  Dispatch<SetStateAction<boolean>>
}