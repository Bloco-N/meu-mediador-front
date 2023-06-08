import { AddCommentForm } from "@/types/AddCommentForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
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
    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      width: 80%;
      p{
        font-weight: bold;
      }
    }
  }
  textarea{
    min-height: 20rem;
  }
  .redirect{
    position: absolute;
    top: 50%;
    font-weight: bold;
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
`

type AddCommentModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCommentModal = ({open, setOpen}: AddCommentModalProps) => {

  const [marketExpertiseRating, setMarketExpertiseRating] = useState(0)
  const [responsivenessRating, setResponsivenessRating] = useState(0)
  const [negotiationSkillsRating, setNegotiationSkillsRating] = useState(0)
  const [profissionalismAndComunicationRating, setProfissionalismAndComunicationRating] = useState(0)

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const handleMarketRating = (rate: number) => {
    setMarketExpertiseRating(rate)
  }

  const handleResponsiveRating = (rate: number) => {
    setResponsivenessRating(rate)
  }

  const handleNegotiationRating = (rate: number) => {
    setNegotiationSkillsRating(rate)
  }

  const handleProfissionalismRating = (rate: number) => {
    setProfissionalismAndComunicationRating(rate)
  }

  const { register, handleSubmit } = useForm<AddCommentForm>()

  const [accType, setAccType] = useState('')

  const router = useRouter()

  const { id:realtorId } = router.query

  const onSubmit = async (data: AddCommentForm) => {

    const localId = localStorage.getItem('id')

    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        marketExpertiseRating,
        responsivenessRating,
        negotiationSkillsRating,
        profissionalismAndComunicationRating,
        clientId: Number(localId),
        realtorId: Number(realtorId)
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const text = await response.text()
    setLoadingOpen(false)
    if(text === 'created') router.reload()

  }

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')

    if(accountType){
      setAccType(accountType)
    }

  }, [open])

  return (
    (open) ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        {accType === 'client' ? (
          <>
            <h3>Criar Comentário</h3>
            <div>
              <p>Conhecimento de mercado: </p>
              <Rating
                onClick={handleMarketRating}
              />
            </div>
            <div>
              <p>Capacidade de resposta: </p>
              <Rating
                onClick={handleResponsiveRating}
              />
            </div>
            <div>
              <p>Negociação: </p>
              <Rating
                onClick={handleNegotiationRating}
              />
            </div>
            <div>
              <p>Profissionalismo e Comunicação: </p>
              <Rating
                onClick={handleProfissionalismRating}
              />
            </div>
            <textarea placeholder="Escreva seu comentário aqui" {...register('text', {required: true})}/>
            <p className="close" onClick={() => setOpen(false)}>X</p>
            <button type="submit"> Criar </button>
          </>

        ): (
          <>
            <p className="close" onClick={() => setOpen(false)}>X</p>
            <p className="redirect">Faça login como cliente</p>
          </>
        ) }
      </form>
    </Container>
    : <></>
  );
};

export default AddCommentModal