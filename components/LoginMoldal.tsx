import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import realtorIcon from '../public/realtor.svg'
import agencyIcon from '../public/agency.svg'
import clientIcon from '../public/profile.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  gap: 1.5rem;
  animation: apear 2s forwards;
  z-index: 2;

  a{
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    transition: all .5s;
    :hover{
      background-color: var(--base);
    }
    img{
      height: 2rem;
      width: auto;
    }
  }

`

type LoginMoldalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const LoginMoldal = ({ open, setOpen }: LoginMoldalProps) => {

  return (
    open ? (
      <Container onMouseEnter={ () => setOpen(true)}>

        <Link href={'/sign-in/client'}>
          <p>
            Cliente
          </p>
          <Image src={clientIcon} alt='realtor icon'/>
        </Link>
        <Link href={'/sign-in/realtor'}>
          <p>
            Consultor
          </p>
          <Image src={realtorIcon} alt='realtor icon'/>
        </Link>
        <Link href={'/sign-in/agency'}>
          <p>
            Agência
          </p>
          <Image src={agencyIcon} alt='realtor icon'/>
        </Link>
        
      </Container>
    ) : <></>
  );
};

export default LoginMoldal;