import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import realtorIcon from "../public/realtor.svg";
import agencyIcon from "../public/agency.svg";
import clientIcon from "../public/profile.svg";
import locales from "locales";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1.5rem;
  animation: apear 2s forwards;
  z-index: 9999;
  
  a {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 2px;
    transition: all 0.5s;
    :hover {
      
    }

    h2{
      font-size: 16px;
      width: 70px;
      @media only screen and (max-width: 768px) {
        font-size: 13px;
        width: 50px;
      }

    }

    img {
      height: 2rem;
      width: auto;
    }
  }
`;

type LoginMoldalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LoginMoldal = ({ open, setOpen }: LoginMoldalProps) => {
  const router = useRouter();

  const { locale } = router;

  const handleClick = () => {
    setOpen(false);
  };

  const t = locales[locale as keyof typeof locales];

  return open ? (
    <Container onMouseEnter={() => setOpen(true)}>
      <Link href={"/sign-in/client"}>
        <h2 onClick={handleClick}>{t.loginModal.client}</h2>
        <Image src={clientIcon} alt="realtor icon" />
      </Link>
      <Link href={"/sign-in/realtor"}>
        <h2 onClick={handleClick}>{t.loginModal.realtor}</h2>
        <Image src={realtorIcon} alt="realtor icon" />
      </Link>
      <Link href={"/sign-in/agency"}>
        <h2 onClick={handleClick}>{t.loginModal.agency}</h2>
        <Image src={agencyIcon} alt="realtor icon" />
      </Link>
    </Container>
  ) : (
    <></>
  );
};

export default LoginMoldal;
