import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';

import { useContext, useEffect, useState } from "react"
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "./ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from '../public/profile.svg'
import { useRouter } from "next/router";
import DenunciaMoldal from "./DenunciaModal";
import instragramIcon  from '../public/instagram.svg';
import locales from "locales";

const InfoFooterDiv = styled.div`
width: 100%;
backdrop-filter: blur(10px);
margin-top: auto;
.div-ajuda{
  padding: 0px 10px;
  display: flex;
  justify-content: space-evenly;
}
.fonte{
  font-weight: bolder !important;
  
  vertical-align: middle;
  padding: 10px 0px;
}
.meio{
    text-align:center;
}
.final{
    text-align:center;
}
@media only screen and (max-width: 768px) {
    .div-ajuda{
        padding: 0px 10px;
        display: flex;
        flex-direction: column;
        text-align:center;

        .instagram-icone{
            order:2;
        }
        .contato{
            order:1;
        }
      }
      
    .fonte{
        font-weight: bolder !important;
        color: black;
        vertical-align: middle;
        padding: 10px 0px;
      }
  }
`
type InfoProps = {
    home?: boolean;  
  };


const InfoFooter = (props: InfoProps) => {
    //#E5E4E2
    const router = useRouter();

    const { locale } = router;
    const t = locales[locale as keyof typeof locales];
    return (
        <>
            <InfoFooterDiv>
                <div className="div-ajuda" style={{color: props.home ? "#E5E4E2" :"white"}}>
                <a className="fonte" target="_blank" rel="noopener noreferrer" href="/politica_privacidade.pdf">{t.infoFooter.privacy}</a>
                    <a className="fonte meio" target="_blank" rel="noopener noreferrer" href="termos.pdf">{t.infoFooter.conditions}</a>
                    
                    <Link className="instagram-icone" href="https://www.instagram.com/meoagent" target="_blank" style={{marginTop:"2px"}}>
                    <Image                    
                        priority
                        src={instragramIcon}
                        height={30}
                        width={30}
                        alt="Follow us on Instagram"
                    />
                    </Link>
                    <span className="fonte final contato">{t.infoFooter.contact} <a href={"mailto: contato@meoagent.com"}>contato@meoagent.com</a></span>
                </div>

            </InfoFooterDiv>
        </>
    );
};

export default InfoFooter;