import api from "@/services/api";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form{
    background-color: #bababac7;
  backdrop-filter: blur(0.3rem);
  -webkit-backdrop-filter: blur(0.3rem);

    position: relative;
    height: 65rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-top: 4rem;
    @media (max-width: 600px) {
      width: 80%;
    }
    .close{
      cursor: pointer;
      position: absolute;
      top: 3rem;
      right: 3rem;
      height: 3rem;
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--surface-2);
      color: var(--surface);
      border-radius: 1rem;
      font-weight: bold;
    }
    textarea{
      margin-top: 5rem;
      min-height: 40rem;
    }
  }
`

type AddReplyModalProps = {
  state:{
    open: boolean,
    commentId: number,
    reply: string
  }
  setOpen: Dispatch<SetStateAction<{open: boolean, commentId:number, reply:string}>>,
}

export default function AddReplyModal({state, setOpen}:AddReplyModalProps){

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const { register, handleSubmit } = useForm<{reply:string}>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data:{reply:string}) => {
    setLoadingOpen(true)

    await api.put(`/comment/realtor/${state.commentId}`, {...data})
    .then((response) => {
      setLoadingOpen(false)
      if(response.data === 'updated') router.reload()
    })
    .catch((error) => {
      setLoadingOpen(false)
      toast.error(t.toast.errorUpdateComment)
      return error
    })

   
  }

  return (

    state.open ?
    <Container className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>

        <h3>{t.review.addReply}</h3>
        <textarea defaultValue={state.reply ? state.reply : ''} placeholder={t.review.writeYourReplyHere} {...register('reply', {required: true})}/>
        <p className="close" onClick={() => setOpen({open: false, commentId: 0, reply:''})}>X</p>
        <button className="button" type="submit"> {t.addCity.add} </button>
      </form>
    </Container>

    : <></>
  )
}
