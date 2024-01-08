import { AddCityForm } from '@/types/AddCityForm';
import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import closeIcon from '../public/close.svg'
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';
import api from '@/services/api';
import { toast } from 'react-toastify';

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
    min-height: 50rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    select{
      width: 50%;
    }
    @media (max-width: 600px) {
      width: 80%;
    }
  }
  .close-icon{
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
  .close{
    cursor: pointer;
    position: absolute;
    top: 1em;
    right: 1em;
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
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
    gap: 1rem;
    p{
      background-color: var(--surface);
      color: var(--surface-2);
      padding: 1rem;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  h3{
    margin-top: 1em;
    margin-bottom: 2rem;
  }
  h4{
    font-size: 2rem;
    font-style: italic;
    color: var(--surface-2);
  }
  .divButton{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 1em;
    gap:100px;

    @media (max-width: 600px) {
      width: 80%;
      gap:50px
    }
  }
`

type AddCityModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCityModal = ({open, setOpen}: AddCityModalProps) => {

  const { register, handleSubmit } = useForm<AddCityForm>()

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const [user, setUser] = useState<any>()

  const [cities, setCities] = useState<Array<string>>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const fetchData = async () => {
      const localId = localStorage.getItem('id')
      const accType = localStorage.getItem('accountType')
      if(localId){

        await api.get(`/${accType}/${localId}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          // toast.error("Error ao carregar dados do usuário!")
        })

        await api.get(`/city/${accType}/${localId}`)
        .then((response) => {
          setCities(response.data)
        })
        .catch((error) => {
          // toast.error("Error ao carregar dados das cidades!")
        })
      }

    }

    fetchData()
  }, [open])

  function reload() {
    const fetchData = async () => {
      const localId = localStorage.getItem('id')
      const accType = localStorage.getItem('accountType')
      if(localId){
        await api.get(`/${accType}/${localId}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          // toast.error("Error ao carregar dados do usuário!")
        })

        await api.get(`/city/${accType}/${localId}`)
        .then((response) => {
          setCities(response.data)
        })
        .catch((error) => {
          // toast.error("Error ao carregar dados das cidades!")
        })
      }
    }
    fetchData()
  }

  const onSubmit = async (data: AddCityForm) => {
    
    const accType = localStorage.getItem('accountType')
    setLoadingOpen(true)
    await api.post(`/city/${accType}`, {
      ...data
    })
    .then((response) => {
      setLoadingOpen(false)
      reload()
    })
    .catch((error) => {
      toast.error("Error ao adicionar cidade!")
      setLoadingOpen(false)
    })
  }

  const handleDeleteCity = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    const { id } = target
    const accType = localStorage.getItem('accountType')

    await api.delete(`/city/${accType}/${id}`)
    .then((response) => {
      toast.success("Cidade removida com sucesso!")
      reload()
    })
    .catch((error) => {
      toast.error("Erro ao remover a cidade!")
    })
  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addCity.addCity}</h3>
        <h4>{t.addCity.placeWhere}</h4>
        <div className="list">
          {user?.RealtorCities?.map((item:any) => (
            <p key={item.id} >
              {item.City.name}
              <Image onClick={e => handleDeleteCity(e)} id={String(item.id)} className="close-icon" src={closeIcon} alt="close icon"/>
            </p>
          ))}
          {user?.AgencyCities?.map((item:any) => (
            <p key={item.id} >
              {item.City.name}
              <Image onClick={e => handleDeleteCity(e)} id={String(item.id)} className="close-icon" src={closeIcon} alt="close icon"/>
            </p>
          ))}
        </div>
        {cities?.length === 0 ? (
          <h4>{t.addCity.youHaveNoMore}</h4>
        ): (
          <>
            <select {...register('name', { required: true})}>
              {cities?.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            <div className='divButton'>
              <button type='submit'>{t.addCity.add}</button>
              <button onClick={() => {
                setOpen(false) 
                toast.success("Cidades adicionado com sucesso!")}}>
                  {t.addCity.save}
                </button>
            </div>
          </>
        )}
        <p className='close' onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default AddCityModal;