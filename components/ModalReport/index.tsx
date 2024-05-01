import React, { useState } from "react";
import locales from "locales";
import { useRouter } from "next/router";
import api from "@/services/api";
import { toast } from "react-toastify";
import * as S from './styles'


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
    <S.Container>
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
            <button className="button" onClick={props.close}>{t.reportDialog.close}</button>

            <button className="button" onClick={handleSubmit}>{t.reportDialog.send}</button>
          </div>
          <h3 className="aviso-msg">{enviado}</h3>
        </div>
      </div>
    </S.Container>
  );
};

export default DenunciaMoldal;
