import { AgencyProfile } from "@/types/AgencyProfile";
import { MainInfoAgency } from "components/index";
import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import RealtorAgencyCard from "./components/RealtorAgencyCard";
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
import { toast } from "react-toastify";
import * as C from './styles'

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
          router.push("/");
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
      toast.success(t.toast.removeAccount)
      router.push("/");
    })
    .catch((error) => {
      toast.error(t.toast.errorRemoveAccount)
      return error
    })
   
  }

  return (
    <C.Container sessionProfile={sessionProfile}>     
      <MainInfoAgency userSigned={agency as AgencyProfile} isProfile={true} onTrash={() => setModalOpen(true)} />
      <ServicesAgencyCard localId={localId} accType={accType} />
      <AboutAgencyCard localId={localId} accType={accType} />
      <RealtorAgencyCard agencyId={Number(id)} accType={accType} isProfile={true}/>
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
            <button className="button" onClick={() => deleteClient()}>{t.signOut.yes}</button>
            <button className="button buttonNo" onClick={() => setModalOpen(false)}>
              {t.signOut.no}
            </button>
          </div>
        </div>
      </Modal>
    </C.Container>
  );
}
