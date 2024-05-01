import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import * as S from './styles'
import InputMask from 'react-input-mask';
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { RealtorProfile } from '@/types/RealtorProfile';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MainEditForm} from '@/types/MainEditForm';
import AddCityModalContext from 'context/AddCityModalContext';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import AddLanguageModalContext from 'context/AddLanguageModalContext';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';
import api from '@/services/api';
import { toast } from 'react-toastify';


type MainInfoProfileEditModalProps = {
  open?: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}


const MainInfoProfileEditModal = ({setOpen}:MainInfoProfileEditModalProps) => {

  const { register, handleSubmit } = useForm<MainEditForm>()
  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: setCityModalOpen } = useContext(AddCityModalContext) as ModalOpenContextType
  const { setOpen: setLanguageModalOpen } = useContext(AddLanguageModalContext) as ModalOpenContextType
  const {setOpen: setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const [accType, setAccType] = useState('')
  const [userSigned, setUserSigned] = useState<RealtorProfile>()
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [wppMask, setWppMask] = useState('+55 99 9 9999 9999')
  const [phoneMask, setPhoneMask] = useState('+55 99 9 9999 9999')

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const handleAddCity = () => {
    setCityModalOpen(true)
    // setOpen(false)
  }

  const handleAddLanguage = () => {
    setLanguageModalOpen(true)
    // setOpen(false)
  }

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')
    if(accountType){
      setAccType(accountType)
    }
  }, [])
  
  useEffect(() => {
    const accountType = localStorage.getItem('accountType')
    const fetchData = async () => {

      const localId = localStorage.getItem('id')
      if(localId && accountType){      
        await api.get(`/${accountType}/${localId}`)
        .then((response) => {
          setUserSigned(response.data)
          setWhatsapp(response.data.whatsapp)
          setPhone(response.data.phone)
        })
        .catch((error) => {
        return error
        })       
      }

    }
    fetchData()
  }, [user.id, setLoadingOpen])

  const onSubmit = async (data: MainEditForm) => {
    if(data.website && !data.website.startsWith('https://')){
      data.website = 'https://' + data.website
    }
    if(accType === 'realtor'){
      setLoadingOpen(true)
      const { expTime, ...payload} = data
      await api.put('/realtor/',{
          ...payload,
          expTime: Number(expTime),
          whatsapp,
          phone
      })
        .then((response) => {
          toast.success(t.toast.dataSuccess)
          setLoadingOpen(false)
          router.reload()
        })
        .catch((error) => {
          toast.error(t.toast.dataError)
          setLoadingOpen(false)
        })
      
    }else if(accType === 'agency'){
      setLoadingOpen(true)      
      await api.put('/agency/', {
          address: data.address,
          email: data.email,
          facebook: data.facebook,
          instagram: data.instagram,
          name: data.name,
          phoneCountry: data.phoneCountry,
          website: data.website,
          wppCountry: data.wppCountry,
          wppText: data.wppText,
          whatsapp,
          phone
        })
        .then((response) => {
          toast.success(t.toast.dataSuccess)
          setLoadingOpen(false)
          router.reload()
        })
        .catch((error) => {
          toast.error(t.toast.dataError)
          setLoadingOpen(false)
        })
    }
  }

  const handlePhoneCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMask = e.target.value;
    setPhoneMask(selectedMask);
  };

  const handleWppCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMask = e.target.value;
    setWppMask(selectedMask);
  };
  return (
    <S.Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>Editar Perfil</h3>
        <div className="input-group">
          {accType === 'realtor' && (
            <>
              <input {...register('firstName', {required: true})} defaultValue={userSigned?.firstName} type="text" placeholder={t.mainInfoEditModal.name} />
              <input {...register('lastName',  {required: true})} defaultValue={userSigned?.lastName} type="text" placeholder={t.mainInfoEditModal.lastName} />
            </>
          )}
          {accType === 'agency' && (
            <input {...register('name', {required: true})} defaultValue={userSigned?.name} type="text" placeholder='Nome' />
          )}
        </div>
        <div className="input-group options">
            <select
              {...register('phoneCountry', { required: true })}
              value={userSigned?.phoneCountry || "+55 99 9 9999 9999"}
              onChange={handlePhoneCountryChange}
            >
              <option value="+55 99 9 9999 9999">Brasil</option>
              <option value="+351 999 999 999">Portugal</option>
              <option value="+34 999 999 999">Espanha</option>
            </select>
            <select
              {...register('wppCountry', { required: true })}
              value={userSigned?.wppCountry || "+55 99 9 9999 9999"}
              onChange={handleWppCountryChange}
            >
              <option value="+55 99 9 9999 9999">Brasil</option>
              <option value="+351 999 999 999">Portugal</option>
              <option value="+34 999 999 999">Espanha</option>
            </select>
          </div>
          <div className="input-group">
            <InputMask
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.mainInfoEditModal.phone}
              mask={phoneMask}
              maskChar="_"
            />
            <InputMask
              type='text'
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder='Whatsapp'
              mask={wppMask}
              maskChar="_"
            />
          </div>
        <div className="input-group">
          <input {...register('email', {required: true})} defaultValue={userSigned?.email} type="email" placeholder={t.mainInfoEditModal.email}/>
          <input {...register('instagram')} defaultValue={userSigned?.instagram ? userSigned?.instagram : ''} type="text" placeholder={t.mainInfoEditModal.instagramLink} />
        </div>
        <div className="input-group">
          <input {...register('facebook')} defaultValue={userSigned?.facebook ? userSigned?.facebook : ''} type="text" placeholder={t.mainInfoEditModal.facebookLink}/>
          <input {...register('website')} defaultValue={userSigned?.website ? userSigned?.website : ''} type="text" placeholder={t.mainInfoEditModal.personalWebsite} />
        </div>
        {accType === 'realtor' && (          
          <div className="input-group">
            <input {...register('expTime')} defaultValue={userSigned?.expTime ? userSigned?.expTime : 0} type="number" placeholder={t.mainInfoEditModal.whenYouStarted}/>
          </div>
        )}
        {accType === 'agency' && (          
          <div className="input-group">
            <input {...register('address')} defaultValue={userSigned?.address ? userSigned?.address : ""} type="text" placeholder={"Endereço"}/>
          </div>
        )}
        <textarea {...register('wppText')} defaultValue={ userSigned?.wppText ? userSigned.wppText : ''} placeholder={t.mainInfoEditModal.welcomeMessage}></textarea>
        <div className="input-group">
          <button className='button' onClick={handleAddCity}>{t.mainInfoEditModal.addWorkArea}</button>
          <button className='button' onClick={handleAddLanguage}>{t.mainInfoEditModal.addLanguage}</button>
        </div>
          <button className='button'>{t.mainInfoEditModal.save}</button>
        <p onClick={() => setOpen(false)}>X</p>
      </form>
    </S.Container>
  );
};

export default MainInfoProfileEditModal;