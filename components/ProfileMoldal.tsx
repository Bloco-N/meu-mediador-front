import { UserContextType } from '@/types/UserContextType';
import UserContext from 'context/UserContext';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext } from 'react';
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
  p{
    padding: 2rem;
    width: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    :hover{
      background-color: var(--surface);
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

  const { setUser } = useContext(UserContext) as UserContextType

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setUser({token:'', id:null})
    setOpen(false)
    router.reload()
  }

  return (

    open ?
    <Container className='card'>

      <p>Perfil</p>
      <p onClick={signOut} className='out'>Sair</p>

    </Container>
    : <></>
  );
};

export default ProfileMoldal;