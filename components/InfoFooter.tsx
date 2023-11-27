import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "./ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from '../public/profile.svg'
import { useRouter } from "next/router";
import DenunciaMoldal from "./DenunciaModal";



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

    return (
        <>
            <InfoFooterDiv>
                <div className="div-ajuda" >
                    <a className="fonte" target="_blank" rel="noopener noreferrer" href="/politica_privacidade.pdf">Política de Privacidade</a>
                    <a className="fonte meio" target="_blank" rel="noopener noreferrer" href="termos.pdf">Termos e Condições</a>
                    <a className="fonte final">Contacto: <a href={"mailto: xxxxxx@meoagent.com"}>xxxxxx@meoagent.com</a></a>
                </div>

            </InfoFooterDiv>
        </>
    );
};

export default InfoFooter;