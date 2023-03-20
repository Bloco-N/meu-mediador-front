import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import profileIcon from '@/../public/profile.svg'
import agencyIcon from '@/../public/agency.svg'
import styled from 'styled-components';
import PictureModalContext from 'context/PictureModalContext';
import { PictureModalContextType } from '@/types/PictureModalContextType';
import editIcon from '../public/edit.svg'
import whatsappIcon from '../public/whatsapp.svg'
import mailIcon from '../public/mail.svg'
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import MainInfoProfileEditModalContext from 'context/MainInfoProfileEditModalContext';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';

const Container = styled.div`
  position: relative;
  min-height: 20rem;
  .main-info{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--base-70);
    padding: 3rem;
    border-radius: 1rem;
    height: 100%;
    gap: 2rem;
    .about{
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      flex-grow: 0;
    }
    .about-2{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .contact{
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 2rem;
      position: absolute;
      top: 10rem;
      right: 2rem;
    }
    .current-agency{
      background-color: var(--base);
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1rem;
      border-radius: 1rem;
      position: absolute;
      top: 2rem;
      right: 2rem;
      .agency{
        height: 3rem;
        width: 3rem;
      }
    }
    .wpp{
      height: 3rem;
      width: 3rem;
      cursor: pointer;
    }
    .profile{      
      height: 10rem;
      width: 10rem;
    }
    .profile-pointer{
      cursor: pointer;
    }
    h1{
      font-weight: normal;
    }
    h3{
      color: var(--star);
    }
    p{
      width: 60rem;
      max-height: 10rem;
      display: block; 
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--surface);
    }
  }
`

type MainInfoProps = {
  realtor: RealtorProfile
  isProfile: boolean
}

const MainInfo = ({ realtor , isProfile}: MainInfoProps) => {

  const { setData } = useContext(PictureModalContext) as PictureModalContextType

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: mainInfoSetOpen } = useContext(MainInfoProfileEditModalContext) as ModalOpenContextType

  const [sessionProfile, setSessionProfile] = useState(false)

  useEffect(() => {
    const localId = localStorage.getItem('id')
    if(Number(localId) === realtor?.id){
      setSessionProfile(true)
    } 

  }, [user.id, realtor?.id])

  return (

  <Container>
    <div className="main-info">
      <Image onClick={isProfile ? () => setData({open: true, realtor}) : () => {}} className= {isProfile ? "profile profile-pointer" : 'profile' } src={profileIcon} alt='profile icon'/>
      <div className="about">
        <h1>{realtor?.firstName} {realtor?.lastName} </h1>
        <h3>★★★★★</h3>
        <p>{realtor?.introduction}</p>
      </div>
      { isProfile && sessionProfile ? (
          <Image onClick={() => mainInfoSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
      ): ''}
      <div className="about-2">
        <p>Atua em: Lisboa</p>
        <p>Experiência: 2 Anos</p>
        <p>LInguas: Português, Inglês</p>
        <p>{realtor?.email}</p>
      </div>
      <div className="contact">
        {realtor?.whatsapp ? (
          <Link href={'https://wa.me/' + realtor.whatsapp.split(' ').join('')} target='_blank'>
            <Image className='wpp' src={whatsappIcon} alt='whatsapp icon'/>
          </Link>
        ) : '' }
        {realtor?.email ? (
          <Link href={'mailto: ' + realtor.email}>
            <Image className='wpp' src={mailIcon} alt='mail icon'/>
          </Link>
        ) : '' }
      </div>
      <div className="current-agency">
        Lorem Ipsun
        <Image className="agency" src={agencyIcon} alt='agency icon'/>
      </div>
    </div>
  </Container>

  );
};

export default MainInfo;