import { UserContextType } from '@/types/UserContextType';
import UserContext from 'context/UserContext';
import locales from 'locales';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {signOut as singOutGoogle} from 'next-auth/react'
import { usePathname } from 'next/navigation';

type ProfileMoldalProps = {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  notModal?:boolean;
} 

const Container = styled.div`
  @media only screen and (max-width: 1000px){
    top: 12rem;
    right: 6rem;
  }
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10rem;
  right: 1rem;
  text-align: center;
  z-index: 2;
  background-color: var(--surface);
  border: solid 0.1rem var(--border-color);
  a, p{
    padding: 2rem;
    width: 100%;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    font-size: 1.7rem;
    transition: all .5s;
    background-color: var(--surface);
    :hover{
      background-color: #cecece;
    }
  }
  .out{
    
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
  @media (max-width: 768px) {
    position: absolute;
    right: 8px;
  }
`

const ContainerNotModal = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: 2;
  background-color: var(--surface);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  justify-content: center;
  align-items: center;
  
  a, p{
    padding: 2rem;
    width: 100%;
    
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    font-size: 1.7rem;
    transition: all .5s;
    background-color: var(--surface);
    :hover{
      background-color: #cecece;
    }
  }
  .out{
    
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
`

const Line = styled.span`
    width: 80%;
    text-align: center;
    background-color: #3f3f3f;
    padding: .03em;
    height: 100%;
`

const ProfileMoldal = ({ open, setOpen  = () => {},notModal= false }: ProfileMoldalProps) => {
  const pathname = usePathname();

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const { user, setUser } = useContext(UserContext) as UserContextType

  const [accType, setAccType] = useState('')

  const [id, setId] = useState('')

  const signOut = async () => {
    await singOutGoogle()
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('pic')
    localStorage.removeItem('accountType')
    setUser({token:'', id:null, profilePicture: null, coverPicture: null, accountType: null})
    setOpen(false)
    router.reload()
  }

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')

    if(accountType){
      setAccType(accountType)
    }
  },[])

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')

    if(accountType){
      setAccType(accountType)
    }
  }, [pathname]);

  useEffect(() => {
    const id = localStorage.getItem('id')
    if(user.id) setId(String(user.id))
    else if(id) setId(id)
  }, [user])

  if(notModal){
    return (
      <ContainerNotModal>
      <Link onClick={() => setOpen(false)} href={`/profile/` + accType + '/' + id}>{t.profileModal.profile}</Link>
      <Line/>
      <p onClick={signOut} className='out'>{t.profileModal.signOut}</p>
    </ContainerNotModal>
    )
  }
  return (

    open ?
    <Container className='card modalProfile'>
      <Link onClick={() => setOpen(false)} href={`/profile/` + accType + '/' + id}>{t.profileModal.profile}</Link>
      <p onClick={signOut} className='out'>{t.profileModal.signOut}</p>
    </Container>
    : <></>
  );
};

export default ProfileMoldal;