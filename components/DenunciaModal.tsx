import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import realtorIcon from "../public/realtor.svg";
import agencyIcon from "../public/agency.svg";
import clientIcon from "../public/profile.svg";
import locales from "locales";
import { useRouter } from "next/router";
import api from "@/services/api";
import { toast } from "react-toastify";

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: -32px;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  form {
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
    div {
      display: flex;
      align-items: center;

      gap: 2rem;
      width: 80%;
      p {
        font-weight: bold;
      }
    }
  }
  textarea {
    margin-top: 8px;
    min-height: 20rem;
    width: 100%;
    border: solid 0.1rem var(--border-color);
  }
  .redirect {
    position: absolute;
    top: 50%;
    font-weight: bold;
  }
  .close {
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

  input {
    border-radius: 10px;
    margin-top: 8px;
  }

  .botoes {
    margin-top: 8px;
    display: flex !important;
    justify-content: space-between;
    max-width: 100%;
  }
  .modal {
    padding: 10px;
    border-radius: 20px;
    border-color: var(--border-color);
    border-style: solid;
    background-color: var(--base) !important;
  }
  .text-center {
    text-align: center;
  }
  .aviso-msg {
    max-width: 100%;
    text-align: center;
    margin-top: 16px;
  }
`;

type DenunciaModalProps = {
  close: () => void;
  idProfile: string;
  nameUser: string;
};

const DenunciaMoldal = (props: DenunciaModalProps) => {
  const router = useRouter();

  const { locale } = router;
  const t = locales[locale as keyof typeof locales];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [enviado, setEnviado] = useState("");

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  function mudar() {
    if (enviado === "") {
      setEnviado(t.reportDialog.warning);
    } else {
      setEnviado("");
    }
  }
  async function handleSubmit() {
    //e.preventDefault()

    let data = {
      name,
      email,
      message,
    };

    const profileType = "perfil";

    await api
      .post(`/denuncia/`, {
        anuncio: title,
        descricao: message,
        name: props.nameUser,
        idAnuncio: props.idProfile,
        title: title,
        profile: "perfil",
      })
      .then(async (response) => {
        toast.success(t.toast.reportAdded);
        if (response.data) {
          setEnviado(t.reportDialog.warning);
          await timeout(3000);
          props.close();
        }
      })
      .catch((error) => {
        toast.success(t.toast.errorReportAdded);
      });
  }

  return (
    <Container>
      <div className="modal">
        <div className="form">
          <h1 className="text-center">{t.reportDialog.title}</h1>
          <input
            type="text"
            placeholder={t.reportDialog.advertisement}
            onChange={(value) => setTitle(value.target.value)}
          />
          <textarea
            placeholder={t.review.writeYourCommentHere}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="botoes">
            <button onClick={props.close}>{t.reportDialog.close}</button>

            <button onClick={handleSubmit}>{t.reportDialog.send}</button>
          </div>
          <h3 className="aviso-msg">{enviado}</h3>
        </div>
      </div>
    </Container>
  );
};

export default DenunciaMoldal;
