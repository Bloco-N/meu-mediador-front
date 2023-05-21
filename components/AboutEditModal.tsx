import { AddCourseForm } from "@/types/AddCourseForm";
import { EditAboutForm } from "@/types/EditAboutForm";
import { RealtorProfile } from "@/types/RealtorProfile";
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
    height: 70%;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-top: 5rem;
    textarea{
      height: 70%;
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

type AboutEditModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AboutEditModal = ({open, setOpen}: AboutEditModalProps) => {

  const { register, handleSubmit } = useForm<EditAboutForm>()

  const [realtor, setRealtor] = useState<RealtorProfile>()

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {

      const localId = localStorage.getItem('id')
      if(localId !== undefined){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + localId, {
          method: 'GET'
        })
        const json = await response.json()
        setRealtor(json)
      }
    }
    fetchData()
  }, [])

  const onSubmit = async (data: EditAboutForm) => {
    const token = localStorage.getItem('token')
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/', {
      method:'PUT',
      body: JSON.stringify({
        introduction: data.introduction
      }),
      headers:{
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    const text = await response.text()
    router.reload()
  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <textarea {...register('introduction')} defaultValue={realtor?.introduction ? realtor.introduction : ''} placeholder="Coloque sua introdução aqui"/>
        <p onClick={() => setOpen(false)}>X</p>
        <button type="submit"> Atualizar </button>
      </form>
    </Container>
    : <></>
  );
};

export default AboutEditModal
