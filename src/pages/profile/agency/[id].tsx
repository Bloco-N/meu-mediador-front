import { AgencyProfile } from "@/types/AgencyProfile";
import MainInfoAgency from "components/MainInfoAgency";
import { RealtorProfile } from "@/types/RealtorProfile";
import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { LastExp } from "@/types/LastExp";
import LoadingContext from "context/LoadingContext";
import AwardsAgencyCard from "./components/AwardsAgencyCard";
import PropertiesAgencyCard from "./components/PropertiesAgencyCard";
import ServicesAgencyCard from "./components/ServicesAgencyCard";
import AboutAgencyCard from "./components/AboutAgencyCard";
import CommentsAgencyCard from "./components/CommentsAgencyCard";
import AgencyRealtorsPropertiesCard from "./components/AgencyRealtorsPropertiesCard";
import Modal from "components/ModalLogout";
import { signOut as singOutGoogle } from "next-auth/react";
import IconAlert from "../../../../public/icons-atencao.png";
import TrashButton from "components/DeleteButton";
import locales from "locales";
import api from "@/services/api";
import { error } from "console";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;
  .plus {
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
  }
  @media (max-width: 768px) {
    p {
      font-size: 22rem;
    }
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
  const { user, setUser } = useContext(UserContext) as UserContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const [localId, setLocalId] = useState("");

  const [accType, setAccType] = useState("");

  //--------
  const [agency, setAgency] = useState<AgencyProfile>();

  const [sessionProfile, setSessionProfile] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
       await api.get(`/agency/${id}`)
        .then((response) => {
          setAgency(response.data);
        })
        .catch((error) => {
          return error
        })
      }
    };
    const localId = localStorage.getItem("id") as string;
    if (Number(id) === Number(localId)) setSessionProfile(true);

    fetchData();
  }, [id]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [childSize, setChildSize] = useState({ width: "auto", height: "auto" });
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
    await api.delete(`/agency/${id}`)
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
      <MainInfoAgency userSigned={agency as AgencyProfile} isProfile={true} />
      <ServicesAgencyCard localId={localId} accType={accType} />
      <AboutAgencyCard localId={localId} accType={accType} />
      {agency && <AgencyRealtorsPropertiesCard agency={agency} />}
      {/* <PropertiesAgencyCard localId={localId} accType={accType}/> */}
      {/* <AwardsAgencyCard localId={localId} accType={accType}/> */}
      <CommentsAgencyCard localId={localId} accType={accType} />
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
