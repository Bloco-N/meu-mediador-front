import { AddLanguageForm } from '@/types/AddLanguageForm';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as S from './styles'
import closeIcon from '../../public/close.svg'
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';
import api from '@/services/api';
import { toast } from 'react-toastify';



type AddLanguageModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddLanguageModal = ({setOpen}: AddLanguageModalProps) => {

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const { register, handleSubmit } = useForm<AddLanguageForm>()

  const [user, setUser] = useState<any>()

  const [language, setLanguage] = useState<Array<string>>([])

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

        await api.get(`/service/language/${localId}`)
        .then((response) => {
          setLanguage(response.data)
        })
        .catch((error) => {
          return error
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
          return error
        })

        await api.get(`/service/language/${localId}`)
        .then((response) => {
          setLanguage(response.data)
        })
        .catch((error) => {
          return error
        })
      }
    }
    fetchData()
  }

  const onSubmit = async (data: AddLanguageForm) => {
    const accType = localStorage.getItem('accountType')
    setLoadingOpen(true)

    await api.post(`/language/${accType}`, {...data})
    .then((response) => {
      setLoadingOpen(false)
      reload()
    })
    .catch((error) => {
      toast.error(t.toast.errorAddLanguage)
      setLoadingOpen(false)
    })
  }

  const handleDeleteLanguage = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target
    const accType = localStorage.getItem('accountType')

    await api.delete(`/language/${accType}/${id}`)
    .then((response) => {
      setLoadingOpen(false)
      reload()
    })
    .catch((error) => {
      setLoadingOpen(false)
      toast.error(t.toast.errorRemoveLanguage)
    })
  }

  return (
    <S.Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.mainInfoEditModal.addLanguage}</h3>
        <h4>{t.addLanguage.languagesYou}</h4>
        <div className="list">
          {user?.RealtorLanguages?.map((item: any )=> (
            <p key={item.id} >
              {item.Language.name}
              <Image onClick={e => handleDeleteLanguage(e)} id={String(item.id)} className="close-icon" src={closeIcon} alt="close icon"/>
            </p>
          ))}
          {user?.AgencyLanguages?.map((item: any ) => (
            <p key={item.id} >
              {item.Language.name}
              <Image onClick={e => handleDeleteLanguage(e)} id={String(item.id)} className="close-icon" src={closeIcon} alt="close icon"/>
            </p>
          ))}
        </div>
        {language?.length === 0 ? (
          <h4>{t.addCity.youHaveNoMore}</h4>
        ): (
          <>
        <select {...register('name', { required: true})}>
            {language?.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
        </select>
        <div className='divBtn'>
            <button className='button' type='submit'>{t.addCity.add}</button>
            <button className='button' onClick={() => {
              setOpen(false)
              toast.success(t.toast.addLanguage)
              }}>{t.addCity.save}</button>
        </div>
        </>
        )}
        <p className='close' onClick={() => setOpen(false)}>X</p>
      </form>
    </S.Container>
  );
};

export default AddLanguageModal;