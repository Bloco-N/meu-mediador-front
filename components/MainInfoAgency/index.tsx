import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import profileIcon from '../../public/profile.svg'
import agencyIcon from '../../public/agency.svg'
import PictureModalContext from 'context/PictureModalContext';
import { PictureModalContextType } from '@/types/PictureModalContextType';
import editIcon from '../../public/edit.svg'
import whatsappIcon from '../../public/whatsapp.svg'
import mailIcon from '../../public/mail.svg'
import webIcon from '../../public/web.svg'
import instagramIcon from '../../public/instagram.svg'
import facebookIcon from '../../public/facebook.svg'
import greyImage from '../../public/grey.png'
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';
import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { AgencyProfile } from '@/types/AgencyProfile';
import MainInfoAgencyEditModalContext from 'context/MainInfoAgencyEditModal';
import locales from 'locales';
import SimplePopup from '../Popup';
import IconTrash from '../../public/icons-trash.png';
import * as C from './styles'


type MainInfoAgencyProps = {
  userSigned: AgencyProfile
  isProfile: boolean
  onTrash:() => void
}

const MainInfoAgency = ({ userSigned , isProfile, onTrash}: MainInfoAgencyProps) => {

  const { setData } = useContext(PictureModalContext) as PictureModalContextType

  const { user, setUser } = useContext(UserContext) as UserContextType

  const { setOpen: mainInfoSetOpen } = useContext(MainInfoAgencyEditModalContext) as ModalOpenContextType

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const localId = localStorage.getItem('id')
    const accounType = localStorage.getItem('accountType')
    if(Number(localId) === userSigned?.id && accounType === 'agency'){
      setSessionProfile(true)
    } 

  }, [user.id, userSigned?.id])

  const handleChangeCover = (e:React.ChangeEvent) => {


    const target = e.target as HTMLInputElement

    const files = target.files as FileList

    const file = files[0]

    if(FileReader && file){
      const fr = new FileReader()
      const token = localStorage.getItem('token')
      const accountType = localStorage.getItem('accountType')

      const onload = async () => {
        const img = document.getElementById('cover-pic') as HTMLImageElement
        const apiService = new ApiService()

        img.src = fr.result as string

        const text = await apiService.updateCoverPicture(accountType as string, fr, token as string)
        
        if(text === 'updated'){

          setUser({id: user.id, token: user.token, coverPicture: fr.result as string, profilePicture: user.profilePicture, accountType: user.accountType})
          router.reload()
        }
      }

      fr.onload = onload

      fr.readAsDataURL(file)
    }

  }

  function printCities() {
    const cities = userSigned?.AgencyCities?.map((city) => city.City.name);
    if (typeof window !== 'undefined'){
      if (window.innerWidth < 768) {
        return cities?.length > 0 ? ` ${cities[0]}` : "Ainda não adicionou cidades";
      } else {
        if (cities?.length > 3) return ` ${cities[0]}, ${cities[1]}`;
        if (cities?.length === 3)
          return ` ${cities[0]}, ${cities[1]} e ${cities[2]}`;
        if (cities?.length === 2) return ` ${cities[0]} e ${cities[1]}`;
        if (cities?.length === 1) return ` ${cities[0]}`;
        return "Ainda não adicionou cidades";
      }
    }
  }

  function printLanguage() {
    const cities = userSigned?.AgencyLanguages?.map((city) => city.Language?.name);
    if (typeof window !== 'undefined'){
      if (window.innerWidth < 768) {
        return cities?.length > 0 ? ` ${cities[0]}` : "Ainda não adicionou cidades";
      } else {
        if (cities?.length > 3) return ` ${cities[0]}, ${cities[1]}`;
        if (cities?.length === 3)
          return ` ${cities[0]}, ${cities[1]} e ${cities[2]}`;
        if (cities?.length === 2) return ` ${cities[0]} e ${cities[1]}`;
        if (cities?.length === 1) return ` ${cities[0]}`;
        return "Ainda não adicionou cidades";
      }
    }
  }

  return (

  <C.Container isProfile={isProfile}>
    <div className="main-info border">
      <div className='top'>
        {isProfile && (
          <>
            <Image height={1000} width={1000} src={userSigned?.coverPicture ? userSigned.coverPicture : greyImage} alt='cover image' className='cover-photo'/>

            {sessionProfile && (
              <>
                <div className='deletAccount-back'>
                  <span onClick={onTrash}>
                  <C.ResponsiveImage src={IconTrash.src} alt="Trash Icon" color='#b5b3b3' />
                  </span>
                </div>
                <div className='label-back'>
                  <label htmlFor="cover-pic">
                    <Image className='edit-main' src={editIcon} alt='edit icon'/>
                  </label>
                </div>
                <input onChange={e => handleChangeCover(e)} id="cover-pic" type="file" />
              </>
            )}
          </>
        )}
      </div>
      <Image width={100} height={100} onClick={isProfile ? () => setData({open: true, userSigned}) : () => {}} className= {isProfile ? "profile profile-pointer" : 'profile' } src={ userSigned?.profilePicture ? userSigned.profilePicture : profileIcon} alt='profile icon'/>
      { isProfile && sessionProfile ? (
          <Image onClick={() => mainInfoSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
      ): ''}

      <div className="sub-content">
        <div className="about">
          <h1>{userSigned?.name}</h1>
        </div>
        <div className="about-2">
        {userSigned?.AgencyCities && (
          <p>
             <div className="cities">
                  <b style={{marginRight: "5px"}}>{t.mainInfo.workArea}</b>
                  
                  <span>{printCities()}</span>
                  {userSigned.AgencyCities.length > 3 ? (
                      <>
                      <span> e outras </span>
                      <SimplePopup qtdeCitys={userSigned.AgencyCities.length - 2} cities={userSigned.AgencyCities}/>
                      <span>cidades</span>
                      </>
                  ) : (
                    ""
                  )}
                </div>
            </p>
        )}
        <p>
            <b>
            {t.mainInfo.languages}
            </b>
            <span>{printLanguage()}</span>
            {userSigned?.AgencyLanguages?.length > 3 ? (
                      <>
                      <span> e outras </span>
                      <SimplePopup qtdeCitys={userSigned?.AgencyLanguages?.length - 2} cities={userSigned?.AgencyLanguages}/>
                      <span>cidades</span>
                      </>
                  ) : (
                    ""
                  )}
            {/* {userSigned?.AgencyLanguages?.map((language, index) => (
              ` ${language.Language.name} ${index < userSigned.AgencyLanguages.length -1 ? ',': ''} `
              ))} */}
          </p>
          <p><b>{"Email: "}</b>{userSigned?.email}</p>
          <p><b>{"Telefone: "}</b>{userSigned?.phone}</p>
          <p><b>{"Endereço: "}</b>{userSigned?.address}</p>
        </div>
      </div>

      {isProfile ?  (
        <div className="contact">
          {userSigned?.email ? (
            <Link href={'mailto: ' + userSigned.email} target='_blank'>
              <Image className='icon' src={mailIcon} alt='mail icon'/>
            </Link>
          ) : '' }
          {userSigned?.website ? (
            <Link href={userSigned.website} target='_blank'>
              <Image className='icon' src={webIcon} alt='web icon'/>
            </Link>
          ) : '' }
          {userSigned?.whatsapp ? (
            <Link href={'https://wa.me/' + userSigned.whatsapp.split(' ').join('') + `${userSigned.wppText ? '?text=' + encodeURI(userSigned.wppText) :''}` } target='_blank'>
              <Image className='icon' src={whatsappIcon} alt='whatsapp icon'/>
            </Link>
          ) : '' }
          {userSigned?.instagram ? (
            <Link href={userSigned.instagram} target='_blank'>
              <Image className='icon' src={instagramIcon} alt='instagram icon'/>
            </Link>
          ) : '' }
          {userSigned?.facebook ? (
            <Link href={userSigned.facebook} target='_blank'>
              <Image className='icon' src={facebookIcon} alt='facebook icon'/>
            </Link>
          ) : '' }
        </div>
      ): ''}
      
    </div>
  </C.Container>

  );
};

export default MainInfoAgency;