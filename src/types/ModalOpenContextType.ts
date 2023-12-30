import { Dispatch, SetStateAction } from "react"

export type ModalOpenContextType = {
  open: boolean,
  setOpen:  Dispatch<SetStateAction<boolean>>
  propertyToUpdate:  any
  setPropertyToUpdate:  Dispatch<SetStateAction<any>>
}

export type ModalOpenContextAddReply = {
  state:{
    open: boolean,
    commentId: number,
    reply: string
  } 
  setOpen:  Dispatch<SetStateAction<{open:boolean, commentId:number, reply:string}>>,
}