import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
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
  open: boolean,
  setOpen: Dispatch<SetStateAction<{open: boolean, commentId:number}>>,
  commentId: number
}

export default function AddReplyModal({open, setOpen, commentId}:AddReplyModalProps){

  const { register, handleSubmit } = useForm<{reply:string}>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  return (

    open ?
    <Container className="modal">
      <form action="">

        <h3>{t.review.addReply}</h3>
        <textarea placeholder={t.review.writeYourReplyHere} {...register('reply', {required: true})}/>
        <p className="close" onClick={() => setOpen({open: false, commentId: 0})}>X</p>
        <button type="submit"> {t.addCity.add} </button>
      </form>
    </Container>

    : <></>
  )
}
