import { AddCourseForm } from "@/types/AddCourseForm";
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
    height: 25rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    input{
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

type AddCourseModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCourseModal = ({open, setOpen}: AddCourseModalProps) => {

  const { register, handleSubmit } = useForm<AddCourseForm>()

  const router = useRouter()

  const onSubmit = async (data: AddCourseForm) => {

    const localId = localStorage.getItem('id')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/course', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        realtorId: Number(localId)
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const text = await response.text()
    if(text === 'created') router.reload()

  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>Criar Curso ou Especialização</h3>
        <input  {...register('name', {required: true})}  placeholder="Título do prêmio" type="text" />
        <p onClick={() => setOpen(false)}>X</p>
        <button type="submit"> Criar </button>
      </form>
    </Container>
    : <></>
  );
};

export default AddCourseModal
