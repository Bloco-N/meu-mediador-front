import { UserContextType } from '@/types/UserContextType';
import UserContext from 'context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

type ProfileMoldalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
} 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10rem;
  right: 5rem;
  text-align: center;
  z-index: 2;
  background-color: var(--surface);
  border: solid 0.1rem var(--border-color);
  a, p{
    padding: 2rem;
    width: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    font-size: 1.7rem;
    transition: all .5s;
    :hover{
      background-color: #cecece;
    }
  }
  .out{
    
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`

const ProfileMoldal = ({ open, setOpen }: ProfileMoldalProps) => {

  const router = useRouter()

  const { user, setUser } = useContext(UserContext) as UserContextType

  const [id, setId] = useState('')

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('pic')
    setUser({token:'', id:null, profilePicture: null})
    setOpen(false)
    router.reload()
  }

  useEffect(() => {
    const id = localStorage.getItem('id')
    if(user.id) setId(String(user.id))
    else if(id) setId(id)
  }, [user])

  return (

    open ?
    <Container className='card'>

      <Link onClick={() => setOpen(false)} href={'/profile/realtor/' + id}>Perfil</Link>
      <p onClick={signOut} className='out'>Sair</p>

    </Container>
    : <></>
  );
};

export default ProfileMoldal;