import { RealtorProfile } from "@/types/RealtorProfile";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import profileIcon from "@/../public/profile.svg";
import agencyIcon from "@/../public/agency.svg";
import styled from "styled-components";
import PictureModalContext from "context/PictureModalContext";
import { PictureModalContextType } from "@/types/PictureModalContextType";
import editIcon from "../public/edit.svg";
import whatsappIcon from "../public/whatsapp.svg";
import mailIcon from "../public/mail.svg";
import webIcon from "../public/web.svg";
import instagramIcon from "../public/instagram.svg";
import facebookIcon from "../public/facebook.svg";
import greyImage from "../public/grey.png";
import UserContext from "context/UserContext";
import { UserContextType } from "@/types/UserContextType";
import MainInfoProfileEditModalContext from "context/MainInfoProfileEditModalContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import Link from "next/link";
import { ApiService } from "@/services/ApiService";
import { useRouter } from "next/router";
import { LastExp } from "@/types/LastExp";
import locales from "locales";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import CoverPicAdjustModalContext, {
  CoverPicAdjustModalContextType,
} from "context/CoverPicAdjustModalContext";

type ContainerProps = {
  isProfile: boolean;
};

import SimplePopup from "./Popup";
import PopupClose from "./PopupAviso";

const Container = styled.div<ContainerProps>`
  position: relative;
  height: 100%;

  min-height: ${(props) => (props.isProfile ? "40rem" : "20rem")};
  @media only screen and (max-width: 900px) {
    min-height: ${(props) => (props.isProfile ? "60rem" : "40rem")};
    height: 100%;
  }

  .main-info {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: var(--surface);
    padding: 3rem;
    height: 100%;
    gap: 1rem;
    border-radius: 30px;

    .top {
      position: absolute;
      width: 100%;
      height: 22rem;
      top: 0;
      left: 0;

      .label-back {
        background-color: var(--surface);
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        position: absolute;
        top: 1rem;
        right: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          position: unset;
        }
      }
    }

    .cover-photo {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 100%;
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      object-fit: cover;
    }

    .profile {
      height: ${(props) => (props.isProfile ? "20rem" : "10rem")};
      width: ${(props) => (props.isProfile ? "20rem" : "10rem")};
      border-radius: 50%;
      object-fit: cover;
      position: relative;

      @media only screen and (max-width: 900px) {
        margin-bottom: unset;
      }
    }

    @media only screen and (max-width: 900px) {
      flex-direction: column;
    }

    .sub-content {
      margin-top: ${(props) => (props.isProfile ? "20rem" : "unset")};
      margin-left: ${(props) => (props.isProfile ? "2rem" : "2rem")};
      display: flex;
      gap: 1rem;
      justify-content: ${(props) => (props.isProfile ? "" : "space-between")};
      width: 100%;

      @media only screen and (max-width: 900px) {
        flex-direction: column;
        gap: 2rem;
        margin-top: unset;
        margin-left: unset;
        width: 100%;
      }
    }

    .about {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: ${(props) => (props.isProfile ? "" : "center")};
      gap: 0.4rem;
      min-width: 25%;
      max-width: 300px;
      flex-wrap: wrap;
      color: var(--surface-2);
      text-align: center;

      h1 {
        font-size: 32px;
      }

      @media only screen and (max-width: 900px) {
        align-items: center;
        min-width: 100%;
        h1 {
          font-size: 28px;
        }
      }
    }

    .about-2 {
      position: relative;
      min-width: ${(props) => (props.isProfile ? "35rem" : "35rem")};
      max-width: 300px;

      @media only screen and (max-width: 900px) {
        align-items: center;
        text-align: center;
        min-width: 100%;
      }

      display: flex;
      color: var(--surface-2);
      flex-direction: column;
      justify-content: flex-end;
      gap: 0.5rem;

      p {
        overflow-wrap: break-word;
      }

      .bottom {
        display: flex;
        flex-direction: row;

        .bottom-1,
        .bottom-2 {
          width: 20rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      }

      li {
        text-align: left;
      }

      .link-city {
        text-decoration: underline;
      }
      b {
        font-size: 16px;
      }

      p {
        font-size: 16px;
      }

      .cities {
        width: 100%;
        display: flex;
        font-size: 14px;
        flex-wrap: wrap;

        span {
          margin-right: 5px;
          margin-left: 1px;
          font-size: 15px;
        }

        @media only screen and (max-width: 900px) {
          position: unset;
          bottom: 8rem;
          justify-content: center;

          b {
            font-size: 15px;
          }

          p {
            font-size: 15px;
          }
        }
      }
    }

    .contact {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2rem;
      position: absolute;
      bottom: 8rem;
      right: 2rem;

      @media only screen and (max-width: 900px) {
        position: unset;
        bottom: 8rem;
        right: 2rem;
      }

      @media only screen and (max-width: 1400px) {
        right: 14rem;
        bottom: 5rem;
      }

      .icon {
        height: 3rem;
        width: 3rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.5s;

        :hover {
          opacity: 1;
        }
      }

      .icon-facebook {
        height: 3.5rem;
        width: 3.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.5s;
        margin-top: 1em;

        :hover {
          opacity: 1;
        }
      }
    }

    .current-agency {
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 1rem;
      border-radius: 1rem;
      position: ${(props) => (props.isProfile ? "absolute" : "")};
      bottom: ${(props) => (props.isProfile ? "20rem" : "unset")};
      right: 2rem;
      width: 180px;

      @media only screen and (max-width: 900px) {
        position: unset;
        width: 180px;
        white-space: nowrap;
      }

      .agency {
        height: 3rem;
        width: 3rem;
      }
    }

    .profile-pointer {
      cursor: pointer;
    }

    h1 {
      font-weight: normal;
    }

    h3 {
      color: var(--star);
    }

    p {
      font-size: 16px;
    }

    @media (width < 768px) {
      p {
        font-size: 14px;
      }
    }

    background: #fff;
  }

  .about-3 {
    gap: 0.5rem;
    margin-top: 0.3em;
    width: fit-content;
    min-width: 240px;

    p {
      margin-bottom: 0.5rem;
      font-size: 16px;
    }

    @media only screen and (max-width: 900px) {
      align-items: center;
      text-align: center;
      min-width: 100%;
    }

    .popup {
      position: unset;
      z-index: 40;
    }

    @media only screen and (max-width: 900px) {
      p {
        font-size: 15px;
      }
    }
  }

  .icon-agency {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    a {
      display: flex;
      justify-content: center;
    }
  }
`;

type ToolTipContainerProps = {
  show: boolean;
  posX: number;
  posY: number;
};

const ToolTipContainer = styled.div<ToolTipContainerProps>`
  cursor: default;
  /* background-color: #d3d2d2; */
  /* padding: 10px; */
  /* position: fixed; */
  /* min-width: 150px; */
  /* top: ${(props) => `${props.posY}px`}; */
  /* left: ${(porps) => `${porps.posX}px`}; */
  /* @media (max-width: 654px) {
    left: ${(porps) => `${porps.posX - 150}px`};
  } */
  /* z-index: 15; */
  display: ${(porps) => (porps.show ? "flex" : "none")};
  flex-direction: column;
  /* gap: 3px; */
  /* border-radius: 5px; */
  /* list-style-type: none; */
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .cities-list {
    overflow-y: auto;
    max-height: 290px;
  } */
`;

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

  const [fullProfilePic, setFullProfilePic] = useState("");

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

  function printLanguage() {
    console.log()
    const cities = userLanguage?.map((city: any) => city.Language.name);
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
    console.log(lastExp?.agencyId);
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
    ? lastExp.name.length > maxLength
      ? lastExp.name.slice(0, maxLength) + "..."
      : lastExp.name
    : "";
  return (
    <Container isProfile={isProfile}>
      <div className="main-info border">
        {isProfile && (
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
        )}
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
        {isProfile && sessionProfile && !pdfPage ? (
          <Image
            onClick={() => mainInfoSetOpen(true)}
            className="edit-main"
            src={editIcon}
            alt="edit icon"
          />
        ) : (
          ""
        )}

        <div className="sub-content">
          <div className="about">
            {userSigned?.firstName && (
              <h1 className="name">
                {userSigned?.firstName} {userSigned?.lastName}{" "}
              </h1>
            )}

            {userSigned?.name && <h1>{userSigned.name}</h1>}
            {userSigned?.rating > 0 && (
              <h3>
                {"★".repeat(Math.floor(userSigned?.rating))} (
                {Math.floor(userSigned?.rating)})
              </h3>
            )}
          </div>
          <div className="about-2">
            {userCitis && (
              <>
                <div className="tt"></div>
                <div className="cities">
                  <b style={{ marginRight: "5px" }}>{t.mainInfo.workArea}</b>

                  <span>{printCities()}</span>
                  {userCitis.length > 3 ? (
                    <>
                      <span> e outras </span>
                      <SimplePopup
                        qtdeCitys={userCitis.length - 2}
                        cities={userCitis}
                      />
                      <span>cidades</span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
            <p>
              <b>{t.mainInfo.experience}</b>{" "}
              {userSigned?.expTime ? userSigned?.expTime : ""}{" "}
              {userSigned?.expTime ? "Anos" : "-"}
            </p>
            <p>
              <b>{t.mainInfo.languages}</b>
              {printLanguage()}
              {/* {userLanguage?.length > 0
                ? userLanguage?.map(
                    (language: any, index: any) =>
                      ` ${language.Language.name}${
                        index < userLanguage?.length - 1 ? "," : ""
                      } `
                  )
                : " -"} */}
            </p>
            <p>{userSigned?.email}</p>
            <p>{userSigned?.phone}</p>
          </div>
          <div className="about-3">
            <p>
              <b>{t.mainInfo.propertiesSold}</b> 0
            </p>
            <p>
              <b>{t.mainInfo.accompaniedBuyers}</b> 0
            </p>
            <div className="cities">
              <PopupClose />
            </div>
          </div>
          <div className="icon-agency">
            {userSigned?.RealtorCities && (
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
            )}
          </div>
        </div>

        {isProfile ? (
          <div className="contact">
            {userSigned?.email ? (
              <Link href={"mailto: " + userSigned.email} target="_blank">
                <Image className="icon" src={mailIcon} alt="mail icon" />
              </Link>
            ) : (
              ""
            )}
            {userSigned?.website ? (
              <Link href={userSigned.website} target="_blank">
                <Image className="icon" src={webIcon} alt="web icon" />
              </Link>
            ) : (
              ""
            )}
            {userSigned?.whatsapp ? (
              <Link
                href={
                  "https://wa.me/" +
                  userSigned.whatsapp.split(" ").join("") +
                  `${
                    userSigned.wppText
                      ? "?text=" + encodeURI(userSigned.wppText)
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
            ) : (
              ""
            )}
            {userSigned?.instagram ? (
              <Link href={userSigned.instagram} target="_blank">
                <Image
                  className="icon"
                  src={instagramIcon}
                  alt="instagram icon"
                />
              </Link>
            ) : (
              ""
            )}
            {userSigned?.facebook ? (
              <Link href={userSigned.facebook} target="_blank">
                <Image
                  className="icon-facebook"
                  src={facebookIcon}
                  alt="facebook icon"
                />
              </Link>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};

export default MainInfo;
