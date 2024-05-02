import { RealtorProfile } from "@/types/RealtorProfile";
import { UserContextType } from "@/types/UserContextType";
import MainInfo from "@components/MainInfo";
import UserContext from "../../../../context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
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

interface Realtor {
  sessionProfile: boolean;
}

const Container = styled.div<Realtor>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  padding: 0px 32px 32px 32px;
  margin-top: ${(props) => (props.sessionProfile ? "-60px" : "60px")};
  gap: 2rem;
  @media only screen and (max-width: 768px) {
    padding: 0 32px;
    margin-top: 20px
  }
  .plus {
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
  }
  .hide-profile {
    background-color: #d3d2d2;
    width: 65%;
    height: 140px;
    max-width: calc(100% - 270px);
    position: fixed;
    z-index: 5;
    top: 0;
    right: 0;
  }
  .labelDialogReport {
    text-align: center;
  }
  .divButton {
    display: flex;
    position: relative;
    right: 120px;
    top: 90px;
    align-items: center;
    max-height: 75px;
    height: 100%;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
      max-height: 20%;
      position: static;
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
      width: 18%;
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
      width: 100%;
    }

    h1 {
      @media (max-width: 768px) {
        font-size: 12px;
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
    <Container sessionProfile={sessionProfile}>
      {accType == "realtor" && sessionProfile ? (
        <div className="divButton">
          {!pdfPage && (
            <ConvertToPDF
              localId={localId}
              accType={accType}
              sessionProfile={sessionProfile}
            />
          )}
          <TrashButton
            onClick={() => {
              setModalOpen(true);
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <MainInfo
        isRealtor={true}
        lastExp={lastExp as LastExp}
        userSigned={realtor as RealtorProfile}
        isProfile={true}
        pdfPage={pdfPage}
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
            <button onClick={() => deleteClient()}>{t.signOut.yes}</button>
            <button className="buttonNo" onClick={() => setModalOpen(false)}>
              {t.signOut.no}
            </button>
          </div>
        </div>
      </ModalLogout>
    </Container>
  );
}
