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
import webIcon from '../public/web.svg'
import instagramIcon from '../public/instagram.svg'
import facebookIcon from '../public/facebook.svg'
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import MainInfoProfileEditModalContext from 'context/MainInfoProfileEditModalContext';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';

const Container = styled.div`
  position: relative;
  min-height: 20rem;
  @media only screen and (max-width: 900px){
    min-height: 50rem;
    height: 100%;

  }
  .main-info{
    display: flex;
    align-items: center;
    background-color: var(--surface);
    padding: 3rem;
    border-radius: 3rem;
    height: 100%;
    gap: 1rem;
    @media only screen and (max-width: 900px){
      flex-direction: column;
    }
    .sub-content{
      @media only screen and (max-width: 900px){
        flex-direction: column;
        gap: 2rem;
      }
      width: 60%;
      display: flex;
      justify-content: space-between;
      gap: 10rem;
    }
    .about{
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      min-width: 15rem;
      color: var(--surface-2);
      @media only screen and (max-width: 900px){
        align-items: center;
        min-width: 100%;
      }
    }
    .about-2{
      @media only screen and (max-width: 900px){
        align-items: center;
        text-align: center;
      }
      height: 100%;
      display: flex;
      color: var(--surface-2);
      flex-direction: column;
      justify-content: flex-end;
      gap: 0.5rem;
      p{
        gap: .5rem;
      }
    }
    .contact{
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2rem;
      position: absolute;
      top: 10rem;
      right: 2rem;
      @media only screen and (max-width: 900px){
        position: unset;
      }
      .icon{
        height: 3rem;
        width: 3rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all .5s;
        :hover{
          opacity: 1;
        }
      }
    }
    .current-agency{
      background-color: white;
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1rem;
      border-radius: 1rem;
      position: absolute;
      top: 2rem;
      right: 2rem;
      @media only screen and (max-width: 900px){
        position: unset;
      }
      .agency{
        height: 3rem;
        width: 3rem;
      }
    }
    .profile{      
      height: 10rem;
      width: 10rem;
      border-radius: 50%;
      object-fit: cover;
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
    <div className="main-info border">
      <Image width={100} height={100} onClick={isProfile ? () => setData({open: true, realtor}) : () => {}} className= {isProfile ? "profile profile-pointer" : 'profile' } src={ realtor?.profilePicture ? realtor.profilePicture : profileIcon} alt='profile icon'/>
      { isProfile && sessionProfile ? (
          <Image onClick={() => mainInfoSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
      ): ''}

      <div className="sub-content">
        <div className="about">
          <h1>{realtor?.firstName} {realtor?.lastName} </h1>
          <h3>★★★★★</h3>
        </div>
        <div className="about-2">
          <p>
            <b>
            Atua em:
            </b>
            Lisboa
          </p>
          <p>
          <b>
            Experiência:
            </b> {realtor?.expTime} Anos
          </p>
          <p>
          <b>
            Idiomas:
            </b> Português, Inglês</p>
          <p>{realtor?.email}</p>
          <p>{realtor?.phone}</p>
        </div>
      </div>

      {isProfile ?  (
        <div className="contact">
          {realtor?.email ? (
            <Link href={'mailto: ' + realtor.email} target='_blank'>
              <Image className='icon' src={mailIcon} alt='mail icon'/>
            </Link>
          ) : '' }
          {realtor?.website ? (
            <Link href={realtor.website} target='_blank'>
              <Image className='icon' src={webIcon} alt='web icon'/>
            </Link>
          ) : '' }
          {realtor?.whatsapp ? (
            <Link href={'https://wa.me/' + realtor.whatsapp.split(' ').join('')} target='_blank'>
              <Image className='icon' src={whatsappIcon} alt='whatsapp icon'/>
            </Link>
          ) : '' }
          {realtor?.instagram ? (
            <Link href={realtor.instagram} target='_blank'>
              <Image className='icon' src={instagramIcon} alt='instagram icon'/>
            </Link>
          ) : '' }
          {realtor?.facebook ? (
            <Link href={realtor.facebook} target='_blank'>
              <Image className='icon' src={facebookIcon} alt='facebook icon'/>
            </Link>
          ) : '' }
        </div>
      ): ''}
      
      <div className="current-agency">
        Lorem Ipsun
        <Image className="agency" src={agencyIcon} alt='agency icon'/>
      </div>
    </div>
  </Container>

  );
};

export default MainInfo;