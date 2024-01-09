import { AgencyProfile } from "@/types/AgencyProfile";
import MainInfoClient from "components/MainInfoClient";
import { RealtorProfile } from "@/types/RealtorProfile";
import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { LastExp } from "@/types/LastExp";
import LoadingContext from "context/LoadingContext";
import { ClientProfile } from "@/types/ClientProfile";
import Modal from "components/ModalLogout";
import locales from "locales";
import { signOut as singOutGoogle } from "next-auth/react";
import IconAlert from "../../../../public/icons-atencao.png";
import TrashButton from "components/DeleteButton";
import api from "@/services/api";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
  .plus {
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
  }
  .divButton {
    display: flex;
    align-items: center;
    justify-content: end;
    max-height: 75px;
    height: 100%;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      max-height: 20%;
    }
  }
  .divButtonConfirm {
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: row;
    }
  }

  .icon {
    width: 10%;
    margin-top: 1em;
    max-width: 100%;
    max-height: 100%;

    @media (max-width: 768px) {
      width: 20%;
    }
  }

  .divMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(245, 197, 199);
    border: 50px solid rgb(245, 197, 199);
    box-sizing: border-box;
    border-radius: 20px;
    
    @media (max-width: 768px) {
      border: 20px solid rgb(245, 197, 199);
      min-width: 80%;
    }

    h1 {
      @media (max-width: 768px) {
        font-size: 15px;
      }
    }

    butto {
      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
  }

  .buttonNo {
    background-color: #c14341;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export default function Profile() {
  const [localId, setLocalId] = useState("");

  const [accType, setAccType] = useState("");

  //--------
  const [client, setClient] = useState<ClientProfile>();

  const [sessionProfile, setSessionProfile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [childSize, setChildSize] = useState({ width: "auto", height: "auto" });
  const { user, setUser } = useContext(UserContext) as UserContextType;

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await api.get(`/client/${id}`)
        .then((response) => {
          setClient(response.data);
        })
        .catch((error) => {
          router.push("/");
          return error
        })
      }
    };
    const localId = localStorage.getItem("id") as string;
    if (Number(id) === Number(localId)) setSessionProfile(true);

    fetchData();
  }, [id]);

  const { locale } = router;
  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const localStorageId = localStorage.getItem("id");
    const accountType = localStorage.getItem("accountType");

    if (localStorageId) {
      setLocalId(localStorageId);
    }
    if (accountType) {
      setAccType(accountType);
    }
  }, []);

  async function deleteClient() {
    await api.delete(`/client/${id}`)
    .then(async (response )=> {
      await singOutGoogle();
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("pic");
      localStorage.removeItem("accountType");
      setUser({
        token: "",
        id: null,
        profilePicture: null,
        coverPicture: null,
        accountType: null,
      });
      toast.success("Conta excluida com sucesso!")
      router.push("/");
    })
    .catch((error) => {
      toast.error("Erro ao excluir conta!")
      return error
    })

  }

  return (
    <Container>
      <div className="divButton">
        <TrashButton onClick={() => {setModalOpen(true)}}/>
      </div>
      {client ? (
        <MainInfoClient userSigned={client as ClientProfile} isProfile={true} />
      ) : (
        ""
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        setChildSize={setChildSize}
        childSize={childSize}
      >
        <div className="divMain">
          <h1>{t.signOut.delete}</h1>
          <img className="icon" src={IconAlert.src} alt="" />

          <div className="divButtonConfirm">
            <button onClick={() => deleteClient()}>{t.signOut.yes}</button>
            <button className="buttonNo" onClick={() => setModalOpen(false)}>
              {t.signOut.no}
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
