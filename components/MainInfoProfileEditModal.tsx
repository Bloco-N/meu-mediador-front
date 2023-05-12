import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { RealtorProfile } from '@/types/RealtorProfile';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MainEditForm } from '@/types/MainEditForm';

type MainInfoProfileEditModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  form{
    position: relative;
    height: 80%;
    width: 50%;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
    input{
      min-width: 30rem;
    }
    h3{
      margin-bottom: 2rem;
    }
    .input-group{
      display: flex;
      gap: 2rem;
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
    color: white;
    border-radius: 1rem;
    font-weight: bold;
  }
`

const MainInfoProfileEditModal = ({open, setOpen}: MainInfoProfileEditModalProps) => {

  const { register, handleSubmit } = useForm<MainEditForm>()
  const { user } = useContext(UserContext) as UserContextType

  
  const [realtor, setRealtor] = useState<RealtorProfile>()
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

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
        setWhatsapp(json.whatsapp)
        setPhone(json.phone)
      }


    }
    fetchData()
  }, [user.id])

  const onSubmit = async (data: MainEditForm) => {
    const token = localStorage.getItem('token')
    const { expTime, ...payload} = data
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/', {
      method:'PUT',
      body: JSON.stringify({
        ...payload,
        expTime: Number(expTime),
        whatsapp,
        phone
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
        <h3>Editar Perfil</h3>
        <div className="input-group">
          <input {...register('firstName', {required: true})} defaultValue={realtor?.firstName} type="text" placeholder='Nome' />
          <input {...register('lastName',  {required: true})} defaultValue={realtor?.lastName} type="text" placeholder='Sobrenome' />
        </div>
        <div className="input-group">
          <InputMask type='text' onChange={e => setPhone(e.target.value)} defaultValue={realtor?.phone ? realtor?.phone : ''} placeholder='telefone' mask="99 99 9 9999 9999" maskChar="_" />
          <InputMask type='text' onChange={e => setWhatsapp(e.target.value)} defaultValue={realtor?.whatsapp ? realtor?.whatsapp : ''} placeholder='whatsapp' mask="99 99 9 9999 9999" maskChar="_" />
        </div>
        <div className="input-group">
          <input {...register('email', {required: true})} defaultValue={realtor?.email} type="email" placeholder='mail@mail.com'/>
          <input {...register('instagram')} defaultValue={realtor?.instagram ? realtor?.instagram : ''} type="text" placeholder='link instagram' />
        </div>
        <div className="input-group">
          <input {...register('facebook')} defaultValue={realtor?.facebook ? realtor?.facebook : ''} type="text" placeholder='link facebook'/>
          <input {...register('website')} defaultValue={realtor?.website ? realtor?.website : ''} type="text" placeholder='link site pessoal' />
        </div>
        <div className="input-group">
          <input {...register('expTime')} defaultValue={realtor?.expTime ? realtor?.expTime : 0} type="number" placeholder='tempo de atuação'/>

        </div>
          <button>Salvar</button>
        <p onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default MainInfoProfileEditModal;