import { MainInfoClient, RenderConditional } from "@components/index";
import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ClientProfile } from "@/types/ClientProfile";
import Modal from "components/ModalLogout";
import locales from "locales";
import { signOut as singOutGoogle } from "next-auth/react";
import IconAlert from "../../../../public/icons-atencao.png";
import api from "@/services/api";
import { toast } from "react-toastify";
import * as C from './styles'


export default function Profile() {
  const [localId, setLocalId] = useState("");
  const [accType, setAccType] = useState("");
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
        await api
          .get(`/client/${id}`)
          .then((response) => {
            setClient(response.data);
          })
          .catch((error) => {
            router.push("/");
            return error;
          });
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
    await api
      .delete(`/client/${id}`)
      .then(async (response) => {
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
        toast.success(t.toast.removeAccount);
        router.push("/");
      })
      .catch((error) => {
        toast.error(t.toast.errorRemoveAccount);
        return error;
      });
  }

  return (
    <C.Container>
      <RenderConditional isTrue={!!client}>
        <MainInfoClient userSigned={client as ClientProfile} isProfile={true} setModalOpen={setModalOpen} />
      </RenderConditional>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        setChildSize={setChildSize}
        childSize={childSize}
      >
        <div className="divMain">
          <h1>{t.signOut.delete}</h1>
          <img className="icon-img" src={IconAlert.src} alt="" />

          <div className="divButtonConfirm">
            <button onClick={() => deleteClient()}>{t.signOut.yes}</button>
            <button className="buttonNo" onClick={() => setModalOpen(false)}>
              {t.signOut.no}
            </button>
          </div>
        </div>
      </Modal>
    </C.Container>
  );
}
