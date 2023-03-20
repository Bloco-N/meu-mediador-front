import { AddPropertyForm } from '@/types/AddPropertyForm';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

type AddPropertyModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Container = styled.div`
  position: absolute;
  z-index: 3;
  background-color: var(--base-70);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  form{
    height: 80%;
    width: 40%;
    background-color: var(--surface-2);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
    button{
      background-color: var(--base);
    }
    textarea{
      resize: none;
      padding: 2rem;
      font-size: 2rem;
      background-color: var(--surface);
      border-radius: 1rem;
      width: 80%;
      ::placeholder{
        color: var(--base);
        opacity: 0.5;
      }
    }
  }
  input{
    width: 70%;
  }
  h3{
      margin-bottom: 2rem;
      color: var(--base);
    }
  p{
    cursor: pointer;
    position: absolute;
    top: 5rem;
    right: 5rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    border-radius: 1rem;
    font-weight: bold;
  }
`

const AddPropertyModal = ({open, setOpen}: AddPropertyModalProps) => {

  const { register, handleSubmit } = useForm<AddPropertyForm>()

  const router = useRouter()

  const onSubmit = async (data:AddPropertyForm) => {

    const localId = localStorage.getItem('id')
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property', {
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
        <h3>Adicionar Imóvel</h3>
        <input {...register('title', {required: true})} type="text" placeholder='Título' />
        <input {...register('link', {required: true})} type="text" placeholder='Link' />
        <textarea {...register('description', {required: true})} placeholder='Fale sobre o imóvel aqui' name="description" id="" cols={30} rows={10}></textarea>
        <button type='submit'>Adicionar Imóvel</button>
      </form>
      <p onClick={() => setOpen(false)}>X</p>
    </Container>
    : <></>
  );
};

export default AddPropertyModal;