import { AddAwardForm } from "@/types/AddAwardForm";
import { AddPartnershipForm } from "@/types/AddPartnershipForm";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
    height: 50rem;
    width: 40%;
    padding-top: 4rem;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    h3{
      margin-bottom: 4rem;
    }
    div{
      display: flex;
      gap: 2rem;
      width: 60%;
      justify-content: center;
    }
    input[type='text']{
      width: 60%;
    }
  }
  p{
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

type AddServiceModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddPartnershipModal = ({open, setOpen}: AddServiceModalProps) => {

  const [workHere, setWorkHere] = useState(false)

  const { register, handleSubmit } = useForm<AddPartnershipForm>()

  const router = useRouter()

  const onSubmit = async (data: AddPartnershipForm) => {

    const localId = localStorage.getItem('id')

    // const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/award/realtor', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: data.title,
    //     realtorId: Number(localId)
    //   }),
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // })

    // const text = await response.text()
    // if(text === 'created') router.reload()

  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>Adicionar Experiência</h3>
        <input {...register( 'position', {required: true})} placeholder="Cargo" type="text" />
        <input {...register( 'agency', {required: true})} placeholder="Agência" type="text" />
        <div>          
          <input type="date" />
          <input disabled={workHere} type="date" />
        </div>
        <div>
          <label htmlFor="active">Trabalha aqui atualmente</label>
          <input onChange={() => setWorkHere(!workHere)} id="active" type="checkbox" />
        </div>
        <p onClick={() => setOpen(false)}>X</p>
        <button type="submit"> Criar </button>
      </form>
    </Container>
    : <></>
  );
};

export default AddPartnershipModal