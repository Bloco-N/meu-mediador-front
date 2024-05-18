import { RealtorProfile } from "@/types/RealtorProfile";
import { UserContextType } from "@/types/UserContextType";
import MainInfo from "@components/MainInfo";
import UserContext from "../../../../context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { LastExp } from "@/types/LastExp";
import LoadingContext from "context/LoadingContext";
import ConvertToPDF from "@components/realtor-profile-page/ConvertToPDF";
import ServicesCard from "@components/realtor-profile-page/ServicesCard";
import AwardsCard from "@components/realtor-profile-page/AwardsCard";
import CoursesCard from "@components/realtor-profile-page/CoursesCard";
import CommentsCard from "@components/realtor-profile-page/CommentsCard";
import PropertiesCard from "@components/PropertiesCard";
import { ApiService } from "@/services/ApiService";
import PartnershipCard from "@components/realtor-profile-page/PartnershipCard";
import AboutCard from "@components/realtor-profile-page/AboutCard";
import locales from "locales";
import InfoFooter from "@components/InfoFooter";
import TrashButton from "@components/DeleteButton";
import ModalLogout from "../../../../components/ModalLogout";
import IconAlert from "../../../../public/icons-atencao.png";
import { signOut as singOutGoogle } from "next-auth/react";
import api from "@/services/api";
import { toast } from "react-toastify";
import { Modal, ModalReport } from "@components/index";
import * as C from './styles'


export default function Profile() {
  const [realtor, setRealtor] = useState<RealtorProfile>();

  const [lastExp, setLastExp] = useState<LastExp>();

  const [sessionProfile, setSessionProfile] = useState(false);
  // const [childSizeModal, setChildSize] = useState({ width: "80%", height: "100%", radius: 10 });

  const { user, setUser } = useContext(UserContext) as UserContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const [localId, setLocalId] = useState("");

  const [accType, setAccType] = useState("");

  const [showModalDenuncia, setShowModalDenuncia] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [childSize, setChildSize] = useState({ width: "auto", height: "auto" });
  const [childSizeReport, setChildSizeReport] = useState({
    width: "80%",
    height: "auto",
    radius: 10,
  });

  const router = useRouter();
  const { id } = router.query;
  const pdfPage = router.query.pdf ? true : false;
  const apiService = new ApiService();

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

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoadingOpen(true);
        console.log("Aqui");
        const data = await apiService.getRealtorInformation(id as string);
        console.log(data, "PEdrooooo");
        setRealtor(data);

        const responsePartnerships = await apiService.getRealtorPartnership(
          id as string
        );

        setLastExp({
          name: responsePartnerships[0]?.name,
          pic: responsePartnerships[0]?.pic,
          agencyId: responsePartnerships[0]?.agencyId,
        });
        setLoadingOpen(false);
        if (typeof window !== "undefined") {
          window.scrollTo(0, 0);
        }
      }
    };
    const localId = localStorage.getItem("id") as string;
    if (Number(id) === Number(localId) && accType === "realtor")
      setSessionProfile(true);

    fetchData();
  }, [id, user.id, accType, setLoadingOpen]);

  async function deleteClient() {
    await api
      .delete(`/realtor/${id}`)
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
    <C.Container sessionProfile={sessionProfile}>
      <MainInfo
        isRealtor={true}
        lastExp={lastExp as LastExp}
        userSigned={realtor as RealtorProfile}
        isProfile={true}
        pdfPage={pdfPage}
        onTrash={() => setModalOpen(true)}
        renderActions={accType == "realtor" && sessionProfile}
        PdfRender={<ConvertToPDF
          localId={localId}
          accType={accType}
          sessionProfile={sessionProfile}
        />}
      />
      <ServicesCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <AboutCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
        pdfPage={pdfPage}
      />
      <PropertiesCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
        pdfPage={pdfPage}
      />
      <a
        className="labelDialogReport"
        onClick={() => setShowModalDenuncia(true)}
        dangerouslySetInnerHTML={{ __html: t.reportDialog.label }}
      ></a>
      <Modal
        isOpen={showModalDenuncia}
        onClose={() => setShowModalDenuncia(false)}
        childSize={childSizeReport}
      >
        <ModalReport
          close={() => setShowModalDenuncia(false)}
          idProfile={localId}
          nameUser={user.id?.toString() ?? "anônimo"}
        />
      </Modal>
      <AwardsCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <CoursesCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <PartnershipCard
        localId={localId}
        accType={accType}
        sessionProfile={pdfPage ? false : sessionProfile}
      />
      <CommentsCard
        localId={localId}
        accType={accType}
        sessionProfile={sessionProfile}
        pdfPage={pdfPage}
        userSigned={realtor as RealtorProfile}
      />
      <InfoFooter />
      <ModalLogout
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        setChildSize={setChildSize}
        childSize={childSize}
      >
        <div className="divMain">
          <h1>{t.signOut.delete}</h1>
          <img className="icon" src={IconAlert.src} alt="" />

          <div className="divButtonConfirm">
            <button className="button" onClick={() => deleteClient()}>
              {t.signOut.yes}
            </button>
            <button
              className="button buttonNo"
              onClick={() => setModalOpen(false)}
            >
              {t.signOut.no}
            </button>
          </div>
        </div>
      </ModalLogout>
    </C.Container>
  );
}
