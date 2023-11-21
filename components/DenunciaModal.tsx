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
position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  form{
    position: relative;
    height: 65rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-top: 4rem;
    background-color: gray;
    opacity: 1;
    @media (max-width: 600px) {
      width: 80%;
    }
    div{
      display: flex;
      align-items: center;
      
      gap: 2rem;
      width: 80%;
      p{
        font-weight: bold;
      }
    }
  }
  textarea{
    margin-top: 8px;
    min-height: 20rem;
    width: 100%
  }
  .redirect{
    position: absolute;
    top: 50%;
    font-weight: bold;
  }
  .close{
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

  input{
    border-radius: 10px;
    margin-top: 8px;
  }

  .botoes{
    margin-top: 8px;
    display: flex !important;
    justify-content: space-between;
  }
  .modal{
    padding: 10px;
    border-radius: 20px;
    border-color: var(--border-color);
    border-style: solid;
    background-color: var(--base) !important;
  }
`;

type DenunciaModalProps = {
  close: () => void;
};




const DenunciaMoldal = (props: DenunciaModalProps) => {
  const router = useRouter();

  const { locale } = router;
  const t = locales[locale as keyof typeof locales];
 




  return (
    <Container >
      <div className="modal">
      <div className="form">
       
          <h1>{t.reportDialog.title}</h1>
          <input type="text" placeholder={t.reportDialog.advertisement}/>
          <textarea placeholder={t.review.writeYourCommentHere}/>
        <div className="botoes">
          <button onClick={props.close}>{t.reportDialog.close}</button>
          <button onClick={props.close}>{t.reportDialog.send}</button>
        </div>
      </div>
      </div>
    </Container>
  ) ;
  
};

export default DenunciaMoldal;
