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
  padding: 10px 20px;
  display: flex;
  justify-content: space-evenly;
}
.fonte{
  font-weight: bolder !important;
}
.meio{
    text-align:center;
}
.final{
    text-align:center;
}
`



const InfoFooter = () => {
    const router = useRouter();

    const { locale } = router;
    const t = locales[locale as keyof typeof locales];
    return (
        <>
            <InfoFooterDiv>
                <div className="div-ajuda" >
                    <a className="fonte" target="_blank" rel="noopener noreferrer" href="/politica_privacidade.pdf">{t.infoFooter.privacy}</a>
                    <a className="fonte meio" target="_blank" rel="noopener noreferrer" href="termos.pdf">{t.infoFooter.conditions}</a>
                    <a className="fonte final">{t.infoFooter.contact} <a href={"mailto: xxxxxx@meoagent.com"}>xxxxxx@meoagent.com</a></a>
                    <Link href="https://www.instagram.com/meoagent" target="_blank">
                    <Image
                        
                        priority
                        src={instragramIcon}
                        height={30}
                        width={30}
                        alt="Follow us on Instagram"
                    />
                    </Link>
                </div>

            </InfoFooterDiv>
        </>
    );
};

export default InfoFooter;