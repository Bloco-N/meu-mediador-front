import { AddCityForm } from '@/types/AddCityForm';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import closeIcon from '../../public/close.svg'
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';
import api from '@/services/api';
import { toast } from 'react-toastify';
import * as S from './styles'



type AddCityModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCityModal = ({setOpen}: AddCityModalProps) => {

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
          return error
        })

        await api.get(`/city/${accType}/${localId}`)
        .then((response) => {
          setCities(response.data)
        })
        .catch((error) => {
          return error       
         })
      }

    }

    fetchData()
  }, [])

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
          return error
        })

        await api.get(`/city/${accType}/${localId}`)
        .then((response) => {
          setCities(response.data)
        })
        .catch((error) => {
          return error
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
      toast.error(t.toast.errorCity)
      setLoadingOpen(false)
    })
  }

  const handleDeleteCity = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    const { id } = target
    const accType = localStorage.getItem('accountType')

    await api.delete(`/city/${accType}/${id}`)
    .then((response) => {
      toast.success(t.toast.removeCity)
      reload()
    })
    .catch((error) => {
      toast.error(t.toast.errorRemoveCity)
    })
  }

  return (
    <S.Container className='modal'>
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
            <div className='divBtn'>
              <button className='button' type='submit'>{t.addCity.add}</button>
              <button className='button' onClick={() => {
                setOpen(false) 
                toast.success(t.toast.addCity)}}>
                  {t.addCity.save}
                </button>
            </div>
          </>
        )}
        <p className='close' onClick={() => setOpen(false)}>X</p>
      </form>
    </S.Container>
  );
};

export default AddCityModal;