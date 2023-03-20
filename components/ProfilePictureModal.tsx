import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import profileIcon from '../public/profile.svg'
import { PictureModalData } from '@/types/PictureModalData';
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';

type PictureProfileModalProps = {
  data: PictureModalData
  setData: Dispatch<SetStateAction<PictureModalData>>,
}

const Container = styled.div`
  position: absolute;
  z-index: 3;
  background-color: var(--base-70);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  .profile-pic{
    height: 50%;
    width: 50%;
  }
  p{
    cursor: pointer;
    position: absolute;
    top: 5rem;
    right: 5rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    border-radius: 1rem;
    font-weight: bold;
  }
`

const ProfilePictureModal = ({data, setData}:PictureProfileModalProps) => {

  const { user } = useContext(UserContext) as UserContextType

  const [sessionProfile, setSessionProfile] = useState(false)

  useEffect(() => {
    const localId = localStorage.getItem('id')
    if(Number(localId) === data.realtor?.id) setSessionProfile(true)
    else setSessionProfile(false)

  }, [user.id, data.realtor?.id])

  return (
    data.open ? 
    <Container>
      <Image className='profile-pic' src={data.realtor?.profilePicture ? data.realtor.profilePicture : profileIcon} alt='profile picture'/>
      <p onClick={() => setData({
        open:false,
        realtor: data.realtor
      })}>X</p>

      {sessionProfile && (
        <button>Editar</button>
      )}
    </Container>
    : <></>
  );
};

export default ProfilePictureModal;