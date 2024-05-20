import React, { useContext, useEffect, useRef, useState } from "react";
import profileIcon from "@/../../public/profile.svg";
import agencyIcon from "@/../../public/agency.svg";
import PictureModalContext from "context/PictureModalContext";
import { PictureModalContextType } from "@/types/PictureModalContextType";
import editIcon from "../../public/edit.svg";
import whatsappIcon from "../../public/whatsapp.svg";
import mailIcon from "../../public/mail.svg";
import webIcon from "../../public/web.svg";
import instagramIcon from "../../public/instagram.svg";
import facebookIcon from "../../public/facebook.svg";
import greyImage from "../../public/grey.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { LastExp } from "@/types/LastExp";
import locales from "locales";
import CoverPicAdjustModalContext, {
  CoverPicAdjustModalContextType,
} from "context/CoverPicAdjustModalContext";
import * as C from "./styles";
import IconTrash from "../../public/icons-trash.png";

import { X } from "lucide-react";

import {
  Modal,
  MainInfoProfileEditModal,
  ModalCity,
  ModalLanguage,
  RenderConditional,
  PopupClose,
  SimplePopup,
  Img,
  CropImage,
} from "@components/index";
import "tippy.js/dist/tippy.css";
import { getQueryParam } from "@/utils";
import axios from "axios";
import api from "@/services/api";
import { useIsMobile } from "hooks";

type MainInfoProps = {
  userSigned: any;
  isProfile: boolean;
  lastExp?: LastExp;
  isRealtor: boolean;
  pdfPage: boolean;
  onTrash?: () => void;
  renderActions?: boolean;
  PdfRender?: any;
};

const MainInfo = ({
  userSigned,
  isProfile,
  lastExp,
  pdfPage,
  onTrash,
  renderActions,
  PdfRender,
}: MainInfoProps) => {
  const { setData } = useContext(
    PictureModalContext
  ) as PictureModalContextType;
  const {
    setOpen: coverPicAdjustModalSetOpen,
    setSrcImg: setCoverPicSrcImage,
  } = useContext(CoverPicAdjustModalContext) as CoverPicAdjustModalContextType;
  const router = useRouter();

  const [sessionProfile, setSessionProfile] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [typeAccountPage, setTypeAccountPage] = useState("realtors");

  const [openModalCity, setCityModalOpen] = useState(false);
  const [openModalLanguage, setLanguageModalOpen] = useState(false);
  const [openModalEditPictures, setOpenModalEditPictures] = useState(false);

  const isMobile = useIsMobile()

  const [tooltip, setTooltip] = useState({ show: false, posX: 0, posY: 0 });

  const locale = router.locale;
  const t = locales[locale as keyof typeof locales];
  const userCitis = userSigned?.RealtorCities
    ? userSigned?.RealtorCities
    : userSigned?.AgencyCities;
  const userLanguage = userSigned?.RealtorLanguages
    ? userSigned?.RealtorLanguages
    : userSigned?.AgencyLanguages;
  const maxLength = 15;
  const truncatedName = lastExp?.name
    ? lastExp.name?.length > maxLength
      ? lastExp?.name.slice(0, maxLength) + "..."
      : lastExp?.name
    : "";
  const basePathStorage = `${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${typeAccountPage}/${userSigned?.id}`;

  const childSizeModal = {
    width: "90rem",
    height:isMobile? "98%": "100%",
    radius: 10,
  };

  const childSizeModalCity = {
    width: "100%",
    height: "100%",
    radius: 10,
  };

  useEffect(() => {
    const accounType = localStorage.getItem("accountType");
    const localId = localStorage.getItem("id");

    changeTypeAccount();

    if (Number(localId) === userSigned?.id && accounType === "realtor") {
      setSessionProfile(true);
    }

    const handleScroll = () => {
      setTooltip({ ...tooltip, show: false });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userSigned?.id]);

  const handleChangeCover = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    if (FileReader && file) {
      const fr = new FileReader();

      const onload = async () => {
        const img = document.getElementById("cover-pic") as HTMLImageElement;

        img.src = fr.result as string;

        setCoverPicSrcImage(img.src);
        coverPicAdjustModalSetOpen(true);
      };

      fr.onload = onload;

      fr.readAsDataURL(file);
    }
  };

  function printCities() {
    const cities = userCitis?.map((city: any) => city.City.name);
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        return cities?.length > 0 ? ` ${cities[0]}` : "-";
      } else {
        if (cities?.length > 3) return ` ${cities[0]}, ${cities[1]}`;
        if (cities?.length === 3)
          return ` ${cities[0]}, ${cities[1]} e ${cities[2]}`;
        if (cities?.length === 2) return ` ${cities[0]} e ${cities[1]}`;
        if (cities?.length === 1) return ` ${cities[0]}`;
        return "-";
      }
    }
  }

  function printLanguage() {
    const cities = userLanguage?.map((city: any) => city.Language.name);
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        return cities?.length > 0 ? ` ${cities[0]}` : "-";
      } else {
        if (cities?.length > 3) return ` ${cities[0]}, ${cities[1]}`;
        if (cities?.length === 3)
          return ` ${cities[0]}, ${cities[1]} e ${cities[2]}`;
        if (cities?.length === 2) return ` ${cities[0]} e ${cities[1]}`;
        if (cities?.length === 1) return ` ${cities[0]}`;
        return "-";
      }
    }
  }

  function goAgency() {}

  function changeTypeAccount() {
    if (
      getQueryParam("idSearch") == "1" ||
      window.location.href?.includes("realtor")
    ) {
      setTypeAccountPage("realtors");
    } else if (
      getQueryParam("idSearch") == "2" ||
      window.location.href?.includes("agency")
    ) {
      setTypeAccountPage("agencies");
    }
  }
  console.log(userSigned?.instagram, "userSigned?.instagram")
  return (
    <C.Container isProfile={isProfile}>
      <div className="main-info border">
        <RenderConditional isTrue={isProfile}>
          <div className="top">
            <>
              <Img
                height={1000}
                width={1000}
                url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${userSigned?.coverPicture}`}
                validateURL={!!userSigned?.coverPicture}
                file={greyImage}
                alt="cover image"
                className="cover-photo"
              />

              <RenderConditional isTrue={sessionProfile && !pdfPage}>
                <>
                  <RenderConditional isTrue={!!renderActions}>
                    <RenderConditional isTrue={!pdfPage}>
                      <div className="pdf-back">
                        <span>{PdfRender}</span>
                      </div>
                    </RenderConditional>
                    <div className="deletAccount-back">
                      <span onClick={onTrash}>
                        <C.ResponsiveImage
                          src={IconTrash.src}
                          alt="Trash Icon"
                          color="#b5b3b3"
                        />
                      </span>
                    </div>
                  </RenderConditional>
                  <div className="label-back">
                    <label
                      htmlFor="cover-pic"
                      onClick={() => setOpenModalEditPictures(true)}
                    >
                      <Img
                        className="edit-main"
                        file={editIcon}
                        alt="edit icon"
                      />
                    </label>
                  </div>
                </>
              </RenderConditional>
            </>
          </div>
        </RenderConditional>

        <Img
          width={100}
          height={100}
          url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${userSigned?.profilePicture}`}
          file={profileIcon}
          validateURL={!!userSigned?.profilePicture}
          onClick={
            isProfile ? () => setData({ open: true, userSigned }) : () => {}
          }
          className={isProfile ? "profile profile-pointer" : "profile"}
          alt="profile icon"
        />

        <RenderConditional isTrue={isProfile && sessionProfile && !pdfPage}>
          <Img
            onClick={() => setOpenModalEdit(true)}
            className="edit-main"
            file={editIcon}
            alt="edit icon"
          />
        </RenderConditional>

        <div className="sub-content">
          <div className="about">
            <RenderConditional isTrue={!!userSigned?.firstName}>
              <h1 className="name">
                {userSigned?.firstName} {userSigned?.lastName}{" "}
              </h1>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.name}>
              <h1>{userSigned?.name}</h1>
            </RenderConditional>
            <RenderConditional isTrue={userSigned?.rating > 0}>
              <h3 className="stars">
                {"★".repeat(Math.floor(userSigned?.rating))} (
                {Math.floor(userSigned?.rating)})
              </h3>
            </RenderConditional>
          </div>
          <div className="about-2">
            <>
              <div className="tt"></div>
              <div className="cities">
                <b style={{ marginRight: "5px" }}>{t.mainInfo.workArea}</b>

                <span>{printCities()}</span>
                <RenderConditional isTrue={userCitis?.length > 3}>
                  <>
                    <span>{t.mainInfo.cityPopup.joinText}</span>
                    <SimplePopup
                      textPopupList={t.mainInfo.cityPopup.textPopupList}
                      qtdeCitys={userCitis?.length - 2}
                      cities={userCitis}
                    />
                    <span> </span>
                    <span>{t.mainInfo.cityPopup.restText}</span>
                  </>
                </RenderConditional>
              </div>
            </>
            <p>
              <b>{t.mainInfo.experience}</b>{" "}
              {userSigned?.expTime ? userSigned?.expTime : ""}{" "}
              {userSigned?.expTime ? "Anos" : "-"}
            </p>
            <p>
              <b>{t.mainInfo.languages}</b>
              {printLanguage()}
              <RenderConditional isTrue={userLanguage?.length > 3}>
                <>
                  <span>{t.mainInfo.languagePopup.joinText}</span>
                  <span> </span>
                  <SimplePopup
                    textPopupList={t.mainInfo.languagePopup.textPopupList}
                    qtdeCitys={userLanguage?.length - 2}
                    cities={userLanguage}
                  />
                  <span> </span>
                  <span>{t.mainInfo.languagePopup.restText}</span>
                </>
              </RenderConditional>
            </p>
            <p>{userSigned?.email}</p>
            <p>{userSigned?.phone}</p>
          </div>

          <div className="about-3">
            <RenderConditional
              isTrue={userSigned?.sold > 0 || userSigned?.bought > 0}
            >
              <RenderConditional isTrue={userSigned?.sold > 0}>
                <p>
                  <b>{t.mainInfo.propertiesSold}</b> {userSigned?.sold}
                </p>
              </RenderConditional>
              <RenderConditional isTrue={userSigned?.accompaniedBuyers > 0}>
                <p>
                  <b>{t.mainInfo.accompaniedBuyers}</b> {userSigned?.bought}
                </p>
              </RenderConditional>
              <div className="cities">
                <PopupClose />
              </div>
            </RenderConditional>
          </div>

          <div className="icon-agency">
            <RenderConditional isTrue={userSigned?.RealtorCities}>
              <Link href={"/profile/agency/" + lastExp?.agencyId}>
                <div className="current-agency border" onClick={goAgency}>
                  {truncatedName}
                  <Img
                    width={10}
                    height={10}
                    className="agency"
                    url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${lastExp?.pic}`}
                    validateURL={!!lastExp?.pic}
                    file={agencyIcon}
                    alt="agency icon"
                  />
                </div>
              </Link>
            </RenderConditional>
          </div>
        </div>

        <RenderConditional isTrue={isProfile}>
          <div className="contact">
            <RenderConditional isTrue={!!userSigned?.email}>
              <Link href={"mailto: " + userSigned?.email} target="_blank">
                <Img className="icon" file={mailIcon} alt="mail icon" />
              </Link>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.website}>
              <Link href={userSigned?.website} target="_blank">
                <Img className="icon" file={webIcon} alt="web icon" />
              </Link>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.whatsapp}>
              <Link
                href={
                  "https://wa.me/" +
                  userSigned?.whatsapp?.split(" ").join("") +
                  `${
                    userSigned?.wppText
                      ? "?text=" + encodeURI(userSigned?.wppText)
                      : ""
                  }`
                }
                target="_blank"
              >
                <Img className="icon" file={whatsappIcon} alt="whatsapp icon" />
              </Link>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.instagram}>
              <Link href={userSigned?.instagram} target="_blank">
                <Img
                  className="icon"
                  file={instagramIcon}
                  alt="instagram icon"
                />
              </Link>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.facebook}>
              <Link href={userSigned?.facebook} target="_blank">
                <Img
                  className="icon-facebook"
                  file={facebookIcon}
                  alt="facebook icon"
                />
              </Link>
            </RenderConditional>
          </div>
        </RenderConditional>
      </div>
      <Modal
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        childSize={childSizeModal}
      >
        <MainInfoProfileEditModal
          setOpen={setOpenModalEdit}
          setOpenCity={setCityModalOpen}
          setOpenLanguage={setLanguageModalOpen}
        />
      </Modal>

      <Modal
        isOpen={openModalCity}
        onClose={() => setCityModalOpen(false)}
        childSize={childSizeModalCity}
      >
        <ModalCity setOpen={setCityModalOpen} />
      </Modal>

      <Modal
        isOpen={openModalLanguage}
        onClose={() => setLanguageModalOpen(false)}
        childSize={childSizeModalCity}
      >
        <ModalLanguage setOpen={setLanguageModalOpen} />
      </Modal>

      <Modal
        isOpen={openModalEditPictures}
        onClose={() => setOpenModalEditPictures(false)}
        childSize={{ height: "100%", width: "100%", radius: 10 }}
      >
        <ModalChangePictures
          profile={userSigned}
          open={openModalEditPictures}
          setOpen={setOpenModalEditPictures}
        />
      </Modal>
    </C.Container>
  );
};

export default MainInfo;

interface ModalChangePicturesProps {
  profile: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChangePictures: React.FC<ModalChangePicturesProps> = ({
  profile,
  open,
  setOpen,
}) => {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);

  const [progress1, setProgress1] = useState<number>(0);
  const [progress2, setProgress2] = useState<number>(0);

  const profileImageRef = useRef<HTMLImageElement>(null);
  const coverImageRef = useRef<HTMLImageElement>(null);

  const cropImageRef1 = useRef<any>(null);
  const cropImageRef2 = useRef<any>(null);

  useEffect(() => {
    handlePreviewImagesDefault();
  }, [profile, open]);

  const handlePreviewImagesDefault = () => {
    if (profile?.profilePicture) {
      if (profileImageRef.current) {
        profileImageRef.current.src = `${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${profile.profilePicture}`;
      }
    }
    if (profile?.coverPicture) {
      if (coverImageRef.current) {
        coverImageRef.current.src = `${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${profile.coverPicture}`;
      }
    }
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile1(e.target.files[0]);
      cropImageRef1.current?.open();
    }
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile2(e.target.files[0]);
      cropImageRef2.current?.open();
    }
  };

  const handleUpload = async (
    file: File | null,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    nameFile: string
  ) => {
    if (!file) return;
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file, `${nameFile}.png`);
    formData.set(
      "profilePicture",
      `${nameFile}${file.type?.replace("image/", ".")}`
    );

    const fakeUpload = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100;
        }
        const nextProgress = prevProgress + 10;
        setTimeout(fakeUpload, 2000);
        return nextProgress;
      });
    };

    fakeUpload();
    await api
      .put("realtor/picture", formData)
      .then(() => {
        setProgress(100);
      })
      .catch(() => setProgress(0));
  };

  const handleUpload1 = () =>
    handleUpload(selectedFile1, setProgress1, `R${profile?.id}-profilePicture`);
  const handleUpload2 = () =>
    handleUpload(selectedFile2, setProgress2, `R${profile?.id}-coverPicture`);

  const handleClose = () => {
    setSelectedFile1(null);
    setSelectedFile2(null);
    setProgress1(0);
    setProgress2(0);
    setOpen(false);
  };

  return (
    <C.Modal>
      <C.ModalContent>
        <C.HeaderChangePictures>
          <button onClick={handleClose}>
            <X />
          </button>
        </C.HeaderChangePictures>

        <C.PreviewCardProfile>
          <C.PreviewCardProfileTop>
            {selectedFile1 && (
              <>
                <C.PreviewProfileImage
                  src={URL.createObjectURL(selectedFile1)}
                  alt="Selected"
                />
              </>
            )}
            {!selectedFile1 && (
              <C.PreviewProfileImage ref={profileImageRef} alt="Selected" />
            )}

            {selectedFile2 && (
              <>
                <C.PreviewProfileCoverImage
                  src={URL.createObjectURL(selectedFile2)}
                  alt="Selected"
                />
              </>
            )}

            {!selectedFile2 && (
              <C.PreviewProfileCoverImage ref={coverImageRef} alt="Selected" />
            )}
          </C.PreviewCardProfileTop>

          <C.PreviewCardProfileBottom>
            <C.FileInputContainer>
              <label htmlFor="inputFile1">
                <span />
                <p>Alterar Foto de Perfil</p>
                <Img width={40} file={editIcon} alt="edit icon" />
              </label>
              <input id="inputFile1" type="file" onChange={handleFileChange1} />
              {selectedFile1 && (
                <>
                  <C.ProgressBar>
                    <C.Progress width={progress1}>
                      <p>{progress1}%</p>
                    </C.Progress>
                  </C.ProgressBar>
                  <C.ButtonUpload onClick={handleUpload1}>
                    Salvar
                  </C.ButtonUpload>
                </>
              )}
            </C.FileInputContainer>

            <C.FileInputContainer>
              <label htmlFor="inputFile2">
                <span />
                <p>Alterar Foto de capa</p>
                <Img width={40} file={editIcon} alt="edit icon" />
              </label>
              <input id="inputFile2" type="file" onChange={handleFileChange2} />
              {selectedFile2 && (
                <>
                  <C.ProgressBar>
                    <C.Progress width={progress2}>
                      <p>{progress2}%</p>
                    </C.Progress>
                  </C.ProgressBar>
                  <C.ButtonUpload onClick={handleUpload2}>
                    Salvar
                  </C.ButtonUpload>
                </>
              )}
            </C.FileInputContainer>
          </C.PreviewCardProfileBottom>
        </C.PreviewCardProfile>

        <CropImage
          ref={cropImageRef1}
          src={selectedFile1}
          onCrop={setSelectedFile1}
        />
        <CropImage
          ref={cropImageRef2}
          src={selectedFile2}
          onCrop={setSelectedFile2}
        />
      </C.ModalContent>
    </C.Modal>
  );
};
