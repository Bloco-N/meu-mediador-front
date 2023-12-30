import { AddPropertyForm } from '@/types/AddPropertyForm';
import Preservations from '@/types/Preservations';
import PropertyTypes from '@/types/PropertyTypes';
import Rooms from '@/types/Rooms';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import placeholderImg from '../public/placeholder.jpg'
import CurrencyInput from './CurrencyInput';
import AreaInput from './AreaInput';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';
import EnergyEfficience from '@/types/EnergyEfficience';
import AddPropertyModalContext from 'context/AddPropertyModalContext';
import { ApiService } from '@/services/ApiService';

type AddPropertyModalProps = {
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
    height: auto;
    width: 75%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 4rem;
    gap: 1rem;
    @media (max-width: 1200px) {
      width: 75%;
    }
    @media (max-width: 500px) {
      width: 90%;
    }
    .all-infos{
      display: flex;
      gap: 2rem;
      @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
      }
      .infos{
        display: flex;
        gap: 2rem;
        .inputs{
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 50%;
        }
        .selections{
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 50%;
          select{
            width: 100%;
          }
        }
      }
      .image-place{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 1200px) {
          max-height: 25rem;
          max-width: 40rem;
          margin-left: calc(50% - 20rem);
        }
        @media (max-width: 500px) {
          max-height: 20rem;
          max-width: 30rem;
          margin-left: calc(50% - 15rem);
        }
        img{
          opacity: 0.7;
          border-radius: 1rem;
          max-height: 25rem;
          max-width: 40rem;
          object-fit: cover;
          @media (max-width: 500px) {
            max-height: 20rem;
            max-width: 30rem;
            
          }
        }
        label{
          position: absolute;
          top: 5rem;
          right: 0.5rem;
          @media (max-width: 1200px) {
            top: 1rem;
          }
        }
      }
    }
    label{
      background-color: var(--base);
      padding: 1rem;
      border-radius: 1rem;
      cursor: pointer;
    }
    .buttons{
      display: flex;
      width: auto;
      gap: 2rem;
      .buttondelete{
        background-color: #c24343;
      }
    }
  }
  input{
    width: 100%;
  }
  .input-titulo{
    width: 1050px;
    @media (max-width: 1500px) {
      
      width:100%;
    }
  }
  h3{
      margin-bottom: 2rem;
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
  input::placeholder {
    text-align: center; 
 
`

const AddPropertyModal = ({ open, setOpen }: AddPropertyModalProps) => {
  const apiService = new ApiService()

  const {
    setOpen: setLoadingOpen,
  } = useContext(LoadingContext) as ModalOpenContextType

  const {
    propertyToUpdate: propertyToUpdate,
    setPropertyToUpdate: setPropertyToUpdate,
  } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const { register, handleSubmit, setValue } = useForm<AddPropertyForm>()

  const [price, setPrice] = useState("")
  const [grossArea, setGrossArea] = useState("")
  const [usefulArea, setUsefulArea] = useState("")

  const [pic, setPic] = useState('')

  useEffect(() => {
    setValue('title', propertyToUpdate && propertyToUpdate.title || "")
    setValue('link', propertyToUpdate && propertyToUpdate.link || "")
    setValue('propertyType', propertyToUpdate && propertyToUpdate.propertyType || "HOME")
    setValue('rooms', propertyToUpdate && propertyToUpdate.rooms || "T1")
    setValue('preservation', propertyToUpdate && propertyToUpdate.preservation || "NEW_BUILDING")
    setValue('energyefficience', propertyToUpdate && propertyToUpdate.energyefficience || "K")
    setPic(propertyToUpdate && propertyToUpdate.profilePicture || "")
    setGrossArea(propertyToUpdate && propertyToUpdate.grossArea || "")
    setUsefulArea(propertyToUpdate && propertyToUpdate.usefulArea || "")
    setPrice(propertyToUpdate && propertyToUpdate.price || "")
  }, [propertyToUpdate, open])

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data: AddPropertyForm) => {

    const localId = localStorage.getItem('id')
    const accountType = localStorage.getItem('accountType')
    const realtorBody = {
      propertyData: {
        ...data,
        price,
        grossArea,
        usefulArea,
        profilePicture: pic,
      },
      realtorId: Number(localId)
    }
    const agencyBody = {
      propertyData: {
        ...data,
        price,
        grossArea,
        usefulArea,
        profilePicture: pic,
      },
      agencyId: Number(localId)
    }
    setLoadingOpen(true)
    let response;
    if (!(propertyToUpdate && propertyToUpdate.id)) {
      response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/' + accountType, {
        method: 'POST',
        body: JSON.stringify(accountType === "agency" ? agencyBody : realtorBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${propertyToUpdate.id}/${accountType}`, {
        method: 'PUT',
        body: JSON.stringify(accountType === "agency" ? agencyBody : realtorBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    setLoadingOpen(false)
    const text = await response.text()
    if (text === 'created' || text === 'updated') router.reload()

  }

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement

    const files = target.files as FileList

    const file = files[0]

    if (FileReader && file) {
      const fr = new FileReader()
      const token = localStorage.getItem('token')

      const onload = async () => {
        const img = document.getElementById('property-img') as HTMLImageElement

        img.src = fr.result as string

        setPic(fr.result as string)

      }

      fr.onload = onload

      fr.readAsDataURL(file)
    }
  }

  return (
    open ?
      <Container className='modal'>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <h3>{propertyToUpdate && propertyToUpdate.id ? t.addPropertiesModal.updatePropertie : t.addPropertiesModal.uploadPropertie}</h3>
          <div className="input-titulo">
            <input {...register('title', { required: true })} type="text" placeholder={t.addPropertiesModal.title} />
          </div>
          <div className="all-infos">

            <div className="infos">

              <div className="inputs">
                <input {...register('link', { required: true })} type="text" placeholder={t.addPropertiesModal.link} />
                <CurrencyInput value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} placeholder="0.00 €" />
                <AreaInput value={grossArea} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrossArea(e.target.value)} placeholder={t.addPropertiesModal.grossArea} />

                <select placeholder='Selecione' {...register('energyefficience', { required: true })} name="energyefficience" id="energyefficience">
                  {Object.entries(EnergyEfficience[locale as keyof typeof EnergyEfficience]).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="selections">
                <select {...register('propertyType')} name="propertyType" id="propertyType">
                  {Object.entries(PropertyTypes[locale as keyof typeof PropertyTypes]).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
                <select {...register('rooms')} name="rooms" id="rooms">
                  {Object.entries(Rooms).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
                <select {...register('preservation', { required: true })} name="preservation" id="preservation">
                  {Object.entries(Preservations[locale as keyof typeof Preservations]).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>

                <AreaInput value={usefulArea} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsefulArea(e.target.value)} placeholder={t.addPropertiesModal.usableArea} />
              </div>
            </div>
            <div className="image-place">
              <Image id="property-img" height={400} width={400} className='property-img' src={pic ? pic : placeholderImg} alt='property image'>
              </Image>
              <label htmlFor="property-pic">
                {t.addPropertiesModal.edit}
              </label>
              <input onChange={e => handleChange(e)} id="property-pic" type="file" />
            </div>
          </div>
          <p onClick={() => {
            setOpen(false)
            setPropertyToUpdate(undefined)
          }}>X</p>
          <div className='buttons'>
            <button type='submit'>{propertyToUpdate && propertyToUpdate.id ? t.addPropertiesModal.updatePropertie : t.addPropertiesModal.uploadPropertie}</button>
            {propertyToUpdate && propertyToUpdate.id &&
              <button className="buttondelete" type='button' onClick={async () => {
                const token = localStorage.getItem('token')
                setLoadingOpen(true)
                const response = await apiService.deleteRealtorProperty(token as string, propertyToUpdate.id, 'realtor')
                setLoadingOpen(false)
                if (response === 'deleted') router.reload()
              }}>{t.addPropertiesModal.deleteProperty}</button>
            }
          </div>
        </form>
      </Container>
      : <></>
  );
};

export default AddPropertyModal;