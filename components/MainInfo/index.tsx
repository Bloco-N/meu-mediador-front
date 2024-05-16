import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
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
import MainInfoProfileEditModalContext from "context/MainInfoProfileEditModalContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import Link from "next/link";
import { useRouter } from "next/router";
import { LastExp } from "@/types/LastExp";
import locales from "locales";
import CoverPicAdjustModalContext, { CoverPicAdjustModalContextType } from "context/CoverPicAdjustModalContext";
import * as C from "./styles";
import IconTrash from '../../public/icons-trash.png';

import {
  Modal,
  MainInfoProfileEditModal,
  ModalCity,
  ModalLanguage,
  RenderConditional,
  PopupClose,
  SimplePopup
} from "@components/index";
import "tippy.js/dist/tippy.css";
import { getQueryParam } from "@/utils";

type MainInfoProps = {
  userSigned: any;
  isProfile: boolean;
  lastExp?: LastExp;
  isRealtor: boolean;
  pdfPage: boolean;
  onTrash?:() => void;
  renderActions?: boolean;
  PdfRender?:any;
};


const MainInfo = ({ userSigned,isProfile,lastExp,pdfPage,onTrash,renderActions,PdfRender }: MainInfoProps) => {
  const { setData } = useContext(PictureModalContext) as PictureModalContextType;
  const { setOpen: coverPicAdjustModalSetOpen,setSrcImg: setCoverPicSrcImage } = useContext(CoverPicAdjustModalContext) as CoverPicAdjustModalContextType;
  const router = useRouter();

  const [sessionProfile, setSessionProfile] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [typeAccountPage, setTypeAccountPage] = useState("realtors");

  const [openModalCity, setCityModalOpen] = useState(false);
  const [openModalLanguage, setLanguageModalOpen] = useState(false);
  const [openModalEditPictures, setOpenModalEditPictures] = useState(false);

  const [tooltip, setTooltip] = useState({ show: false, posX: 0, posY: 0 });

  const locale = router.locale;
  const t = locales[locale as keyof typeof locales];
  const userCitis = userSigned?.RealtorCities ? userSigned?.RealtorCities : userSigned?.AgencyCities;
  const userLanguage = userSigned?.RealtorLanguages ? userSigned?.RealtorLanguages : userSigned?.AgencyLanguages;
  const maxLength = 15;
  const truncatedName = lastExp?.name ? lastExp.name?.length > maxLength ? lastExp?.name.slice(0, maxLength) + "..." : lastExp?.name: "";
  const basePathStorage = `${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${typeAccountPage}/${userSigned?.id}`

  const childSizeModal = {
    width: "90rem",
    height: "100%",
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

    changeTypeAccount()

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

  function changeTypeAccount(){
    if(getQueryParam('idSearch') == '1' || window.location.href?.includes('realtor')){
      setTypeAccountPage("realtors")
    }else if(getQueryParam('idSearch') == '2' || window.location.href?.includes('agency')){
      setTypeAccountPage("agencies")
    }
  }

  return (
    <C.Container isProfile={isProfile}>
      <div className="main-info border">
        <RenderConditional isTrue={isProfile}>
          <div className="top">
            <>
              <Image
                height={1000}
                width={1000}
                src={!!userSigned?.coverPicture ? `${basePathStorage}/${userSigned?.coverPicture}` : greyImage}
                alt="cover image"
                className="cover-photo"
              />

              <RenderConditional isTrue={sessionProfile && !pdfPage}>
                  <>
                    <RenderConditional isTrue={!!renderActions}>
                      <RenderConditional isTrue={!pdfPage}>
                        <div className='pdf-back'>
                          <span>
                          {PdfRender}
                          </span>
                        </div>
                      </RenderConditional>
                      <div className='deletAccount-back'>
                        <span onClick={onTrash}>
                        <C.ResponsiveImage src={IconTrash.src} alt="Trash Icon" color='#b5b3b3' />
                        </span>
                      </div>
                    </RenderConditional>
                      <div className="label-back">
                        <label htmlFor="cover-pic" onClick={() => setOpenModalEditPictures(true)}>
                          <Image
                            className="edit-main"
                            src={editIcon}
                            alt="edit icon"
                          />
                        </label>
                      </div>
                      {/* <input onChange={(e) => alert(e)} id="cover-pic" type="file"/> */}
                    </>
              </RenderConditional>
            </>
          </div>
        </RenderConditional>

          <Image
            width={100}
            height={100}
            onClick={ isProfile ? () => setData({ open: true, userSigned }) : () => {}}
            className={isProfile ? "profile profile-pointer" : "profile"}
            src={!!userSigned?.profilePicture ? `${basePathStorage}/${userSigned?.profilePicture}` : profileIcon}
            alt="profile icon"
          />

        <RenderConditional isTrue={isProfile && sessionProfile && !pdfPage}>
          <Image
            onClick={() => setOpenModalEdit(true)}
            className="edit-main"
            src={editIcon}
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
              <h3>
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
          <RenderConditional
            isTrue={userSigned?.sold > 0 || userSigned?.bought > 0}
          >
            <div className="about-3">
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
            </div>
          </RenderConditional>

          <div className="icon-agency">
            <RenderConditional isTrue={userSigned?.RealtorCities}>
              <Link href={"/profile/agency/" + lastExp?.agencyId}>
                <div className="current-agency border" onClick={goAgency}>
                  {truncatedName}
                  <Image
                    width={10}
                    height={10}
                    className="agency"
                    src={!!lastExp?.pic ? `${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/agencies/${lastExp?.agencyId}/${lastExp?.pic}` : agencyIcon}
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
                <Image className="icon" src={mailIcon} alt="mail icon" />
              </Link>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.website}>
              <Link href={userSigned?.website} target="_blank">
                <Image className="icon" src={webIcon} alt="web icon" />
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
                <Image
                  className="icon"
                  src={whatsappIcon}
                  alt="whatsapp icon"
                />
              </Link>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.instagram}>
              <Link href={userSigned?.instagram} target="_blank">
                <Image
                  className="icon"
                  src={instagramIcon}
                  alt="instagram icon"
                />
              </Link>
            </RenderConditional>

            <RenderConditional isTrue={!!userSigned?.facebook}>
              <Link href={userSigned?.facebook} target="_blank">
                <Image
                  className="icon-facebook"
                  src={facebookIcon}
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
        childSize={{height:'100%',width:'100%',radius:10}}
      >
        <ModalChangePictures  setOpen={setLanguageModalOpen}/>
      </Modal>
    </C.Container>
  );
};

export default MainInfo;


interface ModalChangePicturesProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChangePictures: React.FC<ModalChangePicturesProps> = ({ setOpen }) => {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [progress1, setProgress1] = useState<number>(0);
  const [progress2, setProgress2] = useState<number>(0);

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile1(e.target.files[0]);
    }
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile2(e.target.files[0]);
    }
  };

  const handleUpload = (file: File | null, setProgress: React.Dispatch<React.SetStateAction<number>>) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // Mock upload progress
    const fakeUpload = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100;
        }
        const nextProgress = prevProgress + 10;
        setTimeout(fakeUpload, 200);
        return nextProgress;
      });
    };

    fakeUpload();

    // axios.post('/upload', formData, {
    //   onUploadProgress: (progressEvent) => {
    //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //     setProgress(progress);
    //   }
    // });
  };

  const handleUpload1 = () => handleUpload(selectedFile1, setProgress1);
  const handleUpload2 = () => handleUpload(selectedFile2, setProgress2);

  return (
    <C.Modal>
      <C.ModalContent>
        <C.HeaderChangePictures>
            <button onClick={() => setOpen(false)}>X</button>
        </C.HeaderChangePictures>

        <C.FileInputContainer>
          <label htmlFor="inputFile1">
            Alterar Foto de Perfil 
            <Image
              src={editIcon}
              alt="edit icon"
            />
          </label>
          <input id="inputFile1" type="file" onChange={handleFileChange1} />
          {selectedFile1 && (
            <div>
              <C.SelectedImage src={URL.createObjectURL(selectedFile1)} alt="Selected" />
              <button onClick={handleUpload1}>Upload1</button>
              <C.ProgressBar>
                <C.Progress width={progress1}>{progress1}%</C.Progress>
                
              </C.ProgressBar>
            </div>
          )}
        </C.FileInputContainer>

        <C.FileInputContainer>
          <label htmlFor="inputFile2">
            Alterar Foto de Capa
            <Image
              src={editIcon}
              alt="edit icon"
            />
          </label>
          <input id="inputFile2" type="file" onChange={handleFileChange2} />
          {selectedFile2 && (
            <div>
              <C.SelectedImage src={URL.createObjectURL(selectedFile2)} alt="Selected" />
              <button onClick={handleUpload2}>Upload</button>
              <C.ProgressBar>
                <C.Progress width={progress2}>{progress2}%</C.Progress>
                
              </C.ProgressBar>
            </div>
          )}
        </C.FileInputContainer>
      </C.ModalContent>
    </C.Modal>
  );
};
