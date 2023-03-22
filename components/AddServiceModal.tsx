import { AddServiceForm } from '@/types/AddServiceForm';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  z-index: 3;
  background-color: var(--base-70);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form{
    position: relative;
    height: 25rem;
    width: 40%;
    background-color: var(--surface-2);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    input{
      width: 70%;
    }
    button{
      background-color: var(--base);
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
    background-color: var(--base);
    border-radius: 1rem;
    font-weight: bold;
  }
  h3{
    margin-bottom: 2rem;
    color: var(--base);
  }
`

type AddServiceModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddServiceModal = ({open, setOpen}: AddServiceModalProps) => {

  const { register, handleSubmit } = useForm<AddServiceForm>()

  const router = useRouter()

  const onSubmit = async (data: AddServiceForm) => {

    const localId = localStorage.getItem('id')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        realtorId: Number(localId)
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const text = await response.text()
    router.reload()

  }

  return (
    open ?
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>Criar Serviço</h3>
        <input {...register('title', { required: true})} type="text" placeholder='venda de imóveis' />
        <p onClick={() => setOpen(false)}>X</p>
        <button type='submit'>Criar</button>
      </form>
    </Container>
    : <></>
  );
};

export default AddServiceModal;