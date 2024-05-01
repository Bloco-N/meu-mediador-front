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
import UserContext from "context/UserContext";
import { UserContextType } from "@/types/UserContextType";
import MainInfoProfileEditModalContext from "context/MainInfoProfileEditModalContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import Link from "next/link";
import { useRouter } from "next/router";
import { LastExp } from "@/types/LastExp";
import locales from "locales";
import "tippy.js/dist/tippy.css";
import CoverPicAdjustModalContext, { CoverPicAdjustModalContextType } from "context/CoverPicAdjustModalContext";
import * as C from './styles'
import SimplePopup from "../Popup";
import PopupClose from "../PopupAviso";
import RenderConditional from "../RenderConditional";
import {Modal , MainInfoProfileEditModal} from "../../components";
import {IModalProps} from '../../src/types/Modal'

type MainInfoProps = {
  userSigned: any;
  isProfile: boolean;
  lastExp?: LastExp;
  isRealtor: boolean;
  pdfPage: boolean;
};

const MainInfo = ({
  userSigned,
  isProfile,
  lastExp,
  isRealtor,
  pdfPage,
}: MainInfoProps) => {
  const { setData } = useContext(
    PictureModalContext
  ) as PictureModalContextType;

  const { user, setUser } = useContext(UserContext) as UserContextType;

  const { setOpen: mainInfoSetOpen } = useContext(
    MainInfoProfileEditModalContext
  ) as ModalOpenContextType;

  const {
    setOpen: coverPicAdjustModalSetOpen,
    setSrcImg: setCoverPicSrcImage,
    srcImg: coverPicSrcImage,
  } = useContext(CoverPicAdjustModalContext) as CoverPicAdjustModalContextType;


  const [sessionProfile, setSessionProfile] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [fullProfilePic, setFullProfilePic] = useState("");
  const [childSizeModal, setChildSize] = useState({ width: "90rem", height: "100%", radius: 10 });

  const router = useRouter();

  const [tooltip, setTooltip] = useState({ show: false, posX: 0, posY: 0 });

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  const userCitis = userSigned?.RealtorCities
    ? userSigned?.RealtorCities
    : userSigned?.AgencyCities;
  const userLanguage = userSigned?.RealtorLanguages
    ? userSigned?.RealtorLanguages
    : userSigned?.AgencyLanguages;
  useEffect(() => {
    const localId = localStorage.getItem("id");
    const accounType = localStorage.getItem("accountType");
    if (Number(localId) === userSigned?.id && accounType === "realtor") {
      setSessionProfile(true);
    }
  }, [user.id, userSigned?.id]);

  const handleChangeCover = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    if (FileReader && file) {
      const fr = new FileReader();

      const onload = async () => {
        const img = document.getElementById("cover-pic") as HTMLImageElement;

        img.src = fr.result as string;

        setFullProfilePic(img.src);
        setCoverPicSrcImage(img.src);
        coverPicAdjustModalSetOpen(true);
      };

      fr.onload = onload;

      fr.readAsDataURL(file);
    }
  };

  function printCities() {
    const cities = userCitis?.map((city: any) => city.City.name);
    if (typeof window !== 'undefined'){
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
    if (typeof window !== 'undefined'){
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


  function tooltipShow(e: React.MouseEvent<HTMLButtonElement>) {
    setTooltip({ show: true, posX: e.clientX, posY: e.clientY });
  }

  function tooltipStill() {
    setTooltip({ ...tooltip, show: true });
  }

  function tooltipHide() {
    setTooltip({ ...tooltip, show: false });
  }

  function goAgency() {
  }

  useEffect(() => {
    const handleScroll = () => {
      // Oculta o ToolTipContainer quando a página é rolada
      setTooltip({ ...tooltip, show: false });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const maxLength = 15;
  const truncatedName = lastExp?.name
    ? lastExp.name?.length > maxLength
      ? lastExp?.name.slice(0, maxLength) + "..."
      : lastExp?.name
    : "";
    
  return (
    <C.Container isProfile={isProfile}>
      <div className="main-info border">
        <RenderConditional isTrue={isProfile}>
            <div className="top">
                <>
                  <Image
                    height={1000}
                    width={1000}
                    src={
                      userSigned?.coverPicture ? userSigned.coverPicture : greyImage
                    }
                    alt="cover image"
                    className="cover-photo"
                  />
                  {sessionProfile && !pdfPage && (
                    <>
                      <div className="label-back">
                        <label htmlFor="cover-pic">
                          <Image
                            className="edit-main"
                            src={editIcon}
                            alt="edit icon"
                          />
                        </label>
                      </div>
                      <input
                        onChange={(e) => handleChangeCover(e)}
                        id="cover-pic"
                        type="file"
                      />
                    </>
                  )}
                </>
              </div>
        </RenderConditional>
        <Image
          width={100}
          height={100}
          onClick={
            isProfile ? () => setData({ open: true, userSigned }) : () => {}
          }
          className={isProfile ? "profile profile-pointer" : "profile"}
          src={
            userSigned?.profilePicture ? userSigned.profilePicture : profileIcon
          }
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
            {userSigned?.firstName && (
              <h1 className="name">
                {userSigned?.firstName} {userSigned?.lastName}{" "}
              </h1>
            )}

            {userSigned?.name && <h1>{userSigned.name}</h1>}
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
                      <SimplePopup
                        textPopupList={t.mainInfo.languagePopup.textPopupList}
                        qtdeCitys={userLanguage?.length - 2}
                        cities={userLanguage}
                      />
                      <span>{t.mainInfo.languagePopup.restText}</span>
                    </>
                </RenderConditional>
            </p>
            <p>{userSigned?.email}</p>
            <p>{userSigned?.phone}</p>
          </div>
          <RenderConditional isTrue={userSigned?.sold > 0 || userSigned?.bought > 0}>
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
                      src={lastExp?.pic ? lastExp.pic : agencyIcon}
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
      <Modal isOpen={openModalEdit} onClose={() => setOpenModalEdit(false)} childSize={childSizeModal}>
      <MainInfoProfileEditModal setOpen={setOpenModalEdit}/>
      </Modal>
    </C.Container>
  );
};

export default MainInfo;
