import React, { useContext, useEffect, useState } from "react";
import profileIcon from "@/../public/profile.svg";
import styled from "styled-components";
import mailIcon from "../../public/mail.svg";
import { Img } from '@components/index';
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import Link from "next/link";
import { ApiService } from "@/services/ApiService";
import { useRouter } from "next/router";
import { ClientProfile } from "@/types/ClientProfile";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import api from "@/services/api";
import { toast } from "react-toastify";
import TrashButton from "../DeleteButton";
import { RenderConditional } from "..";
import IconTrash from "../../public/icons-trash.png";

type ContainerProps = {
  isProfile: boolean;
  locale: string;
  editing: boolean;
};

const Container = styled.div<ContainerProps>`
  position: relative;
  min-height: ${(props) => (props.isProfile ? "40rem" : "20rem")};

  @media only screen and (max-width: 900px) {
    min-height: ${(props) => (props.isProfile ? "60rem" : "40rem")};
    height: auto;
  }

  .divButton {
    @media only screen and (max-width: 768px) {
      position: absolute;
      top: -2% !important;
    }
  }

  .main-info {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--surface);
    padding: 3rem;
    border-radius: 3rem;
    height: auto;
    gap: 2rem;

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
        height: 15rem;
        width: 15rem;
      }
    }

    @media only screen and (max-width: 900px) {
      flex-direction: column;
    }

    .sub-content {
      width: 100%;

      .responsive_image{
        width: 100%;
      }

      .deletAccount-back {
        background-color: #c14341;
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        position: absolute;
        top: 2rem;
        right: 7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          position: unset;
          margin-top: 3px;
        }
        @media only screen and (max-width: 768px) {
          right: 2rem;
        }
      }

      @media only screen and (max-width: 900px) {
        flex-direction: column;
        gap: 2rem;
        margin-top: unset;
        margin-left: unset;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;

        @media only screen and (max-width: 900px) {
          justify-content: center;
          align-items: center;
        }

        li {
          display: flex;
          gap: 10px;
          align-items: center;
          width: 20%;

          .div-radio {
            white-space: nowrap;
            display: flex;
          }
        }

        .li-nfi {
          label {
            display: flex;
            gap: 10px;
            align-items: center;
          }
        }

        label {
          display: flex;
          white-space: nowrap;
        }

        p {
          width: auto;
        }

        input {
          height: 18px;
          font-size: 18px;
          width: 100%;
          padding: 0;
          border-radius: 5px;
          padding-left: 10px;
          background-color:#EFF4F0 ;
          border: 1px solid #B5B3B3;
        }

        button {
          width: 100px;
          height: 25px;
          padding: 5px;
          margin-top: 10px;
        }

        .li-mail {
          width: 100%;
          .title {
            width: 280px;
          }
        }
        .contact {
          width: 100%;
        }
      }

      @media only screen and (max-width: 768px) {
        label,
        p,
        h3 {
          font-size: 18px;
        }

        .form {
          label {
            white-space: ${(props) => (props.editing ? "normal" : "nowrap")};
            width: ${(props) => (props.editing ? "200px" : "auto")};
          }
          li {
            width: 100%;
            height: 30px;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: ${(props) => (props.editing ? "8%" : "0")};
            &:has(p) {
              justify-content: start;
            }

            input {
              height: 40px;
              width: 180px;
            }
          }

          .li-nfi {
            display: flex;
            width: 100%;
            flex-direction: ${(props) => (props.editing ? "column" : "row")};
            /* height: 120px; */
            height: ${(props) => (props.editing ? "90px" : "40px")};
            align-items: ${(props) => (props.editing ? "center" : "start")};
            justify-content: ${(props) => (props.editing ? "center" : "start")};

            div {
              width: 100%;
              display: flex;
              justify-content: space-around;
            }
            input {
              height: 15px !important;
              width: 15px !important;
            }

            .input-nfi{
              height: 40px !important;
              width: 180px !important;
              
            }
          }

          .li-mail {
            flex-direction: column;
            align-items: start;
            margin-bottom: 15%;

            label {
              display: flex;
              align-items: center;
              flex-direction: row;
              flex-wrap: nowrap;
              white-space: nowrap;
            }
            .title {
              width: 100px;
            }
          }
        }
      }
    }

    .contact {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        height: 2rem;
        width: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.5s;
        margin-left: 2em;

        :hover {
          opacity: 1;
        }
      }
    }
  }
`;

type MainInfoClientProps = {
  userSigned: ClientProfile;
  isProfile: boolean;
  setModalOpen: any;
  onTrash: () => void
};

const MainInfoClient = ({
  userSigned,
  isProfile,
  setModalOpen,
  onTrash
}: MainInfoClientProps) => {

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(userSigned?.firstName);
  const [lastName, setLastName] = useState(userSigned?.lastName);
  const [phone, setPhone] = useState(userSigned?.phone);
  const [address, setAddress] = useState(userSigned?.address);
  const [city, setCity] = useState(userSigned?.city);
  const [country, setCountry] = useState(userSigned?.country);
  const [zipCode, setZipCode] = useState(userSigned?.zipCode);
  const [nif_passport, setNifPassport] = useState(userSigned?.nif_passport);
  const [choiceNif, setChoiceNif] = useState(userSigned?.choiceNif);
  const [nifInvalido, setNifInvalido] = useState(false);
  const [sessionProfile, setSessionProfile] = useState(false);
  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType;

  const router = useRouter();
  const locale = router.locale;
  const t = locales[locale as keyof typeof locales];

  async function sendInfo(e: any) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoadingOpen(true);
    var nifValidado: boolean | null = true;
    setNifInvalido(false);
    if (choiceNif) {
      nifValidado = validateNIF(nif_passport);
      if (nifValidado != null) {
        setNifInvalido(!nifValidado);
        setLoadingOpen(false);
        return;
      }
      setEditing(!editing);
    }
    if (nifValidado) {
      await api
        .put("/client", {
          firstName,
          lastName,
          phone,
          address,
          city,
          country,
          zipCode,
          nif_passport,
          choiceNif: choiceNif,
        })
        .then((response) => {
          toast.success(t.toast.dataSuccess);
          setLoadingOpen(false);
          setEditing(false);
        })
        .catch((error) => {
          toast.error(t.toast.dataError);
          setLoadingOpen(false);
        });
    } else {
      setLoadingOpen(false);
      setEditing(false);
    }
  }

  useEffect(() => {
    const accounType = localStorage.getItem("accountType");
    const localId = localStorage.getItem("id");

    if (Number(localId) === userSigned?.id && accounType === "client") {
      setSessionProfile(true);
    }
  }, [userSigned?.id]);


  function startEditing(e: any) {
    e.preventDefault();
    setEditing(!editing);
  }

  function validateNIF(value: any) {
    if (value) {
      const nif = typeof value === "string" ? value : value?.toString();
      const validationSets = {
        one: ["1", "2", "3", "5", "6", "8"],
        two: [
          "45",
          "70",
          "71",
          "72",
          "74",
          "75",
          "77",
          "79",
          "90",
          "91",
          "98",
          "99",
        ],
      };
      if (nif?.length !== 9) return false;
      if (
        !validationSets.one.includes(nif.substr(0, 1)) &&
        !validationSets.two.includes(nif.substr(0, 2))
      )
        return false;
      const total =
        nif[0] * 9 +
        nif[1] * 8 +
        nif[2] * 7 +
        nif[3] * 6 +
        nif[4] * 5 +
        nif[5] * 4 +
        nif[6] * 3 +
        nif[7] * 2;
      const modulo11 = Number(total) % 11;
      const checkDigit = modulo11 < 2 ? 0 : 11 - modulo11;
      return checkDigit === Number(nif[8]);
    }

    return null;
  }

  return (
    <Container isProfile={isProfile} editing={editing} locale={String(locale)}>
      <div className="main-info border">
        <Img
          className={isProfile ? "profile profile-pointer" : "profile"}
          file={profileIcon}
          alt="profile icon"
        />
        <div className="sub-content">
          <form className="form">
            <li className="li-mail">
              <label>
                <h3 className="title">{t.signIn.email}:</h3>
              </label>
              <div className="contact">
                <h3>{userSigned?.email}</h3>

                <RenderConditional isTrue={sessionProfile}>
                <>
                    <div className="deletAccount-back">
                      <span onClick={onTrash}>
                        <img className="responsive_image"
                          src={IconTrash.src}
                          alt="Trash Icon"
                          color="#b5b3b3"
                        />
                      </span>
                    </div>
                </>
              </RenderConditional>

                <RenderConditional isTrue={!!userSigned?.email}>
                  <Link href={"mailto: " + userSigned.email} target="_blank">
                      <Img className="icon" file={mailIcon} alt="mail icon" />
                  </Link>
                </RenderConditional>
              </div>
            </li>
            <li>
              <label>{t.mainInfoEditModal.name}: </label>
              <RenderConditional isTrue={!!editing}>
              <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setFirstName(e.target.value);
                  }}
                />
              </RenderConditional>

              <RenderConditional isTrue={!editing}>
                  <p>{firstName}</p>
              </RenderConditional>

            </li>
            <li>
              <label>{t.mainInfoEditModal.lastName}: </label>
              <RenderConditional isTrue={!!editing}>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setLastName(e.target.value);
                  }}
                />
                </RenderConditional>
              <RenderConditional isTrue={!editing}>
                <p>{lastName}</p>
              </RenderConditional>
            </li>
            <li>
              <label>{t.mainInfoEditModal.phone}: </label>
              <RenderConditional isTrue={!!editing}>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    if (/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setPhone(e.target.value);
                  }}
                />
                </RenderConditional>
                <RenderConditional isTrue={!editing}>
                  <p>{phone}</p>
                </RenderConditional>
            </li>
            <li>
              <label>{t.clientProfile.adress}: </label>
              <RenderConditional isTrue={!!editing}>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </RenderConditional>
              <RenderConditional isTrue={!editing}>
                <p>{address}</p>
              </RenderConditional>
            </li>
            <li>
              <label>{t.clientProfile.city}: </label>
              <RenderConditional isTrue={!!editing}>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setCity(e.target.value);
                  }}
                />
              </RenderConditional>
              <RenderConditional isTrue={!editing}>
                <p>{city}</p>
              </RenderConditional>
            </li>
            <li>
              <label>{t.clientProfile.country}: </label>
              <RenderConditional isTrue={!!editing}>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setCountry(e.target.value);
                  }}
                />
              </RenderConditional>
              <RenderConditional isTrue={!editing}>
                <p>{country}</p>
              </RenderConditional>
            </li>
            <li>
              <label>{t.clientProfile.zipCode}: </label>
              <RenderConditional isTrue={!!editing}>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => {
                    if (/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setZipCode(e.target.value);
                  }}
                />
              </RenderConditional>
              <RenderConditional isTrue={!editing}>
                <p>{zipCode}</p>
              </RenderConditional>
            </li>

            <li className="li-nfi">
            <RenderConditional isTrue={!!editing}>
              <>
                  <div
                    className="div-radio"
                    style={{
                      alignItems: "flex-start",
                      verticalAlign: "middle",
                    }}
                  >
                    <label>
                      {t.clientProfile.nif}
                      <input
                        type="radio"
                        value="true"
                        checked={choiceNif}
                        onChange={(e) =>
                          setChoiceNif(e.target.value === "true")
                        }
                      />
                    </label>
                    <label style={{ marginLeft: "0.8rem" }}>
                      {t.clientProfile.passport}
                      <input
                        type="radio"
                        value="false"
                        checked={!choiceNif}
                        onChange={(e) =>
                          setChoiceNif(e.target.value === "true")
                        }
                      />
                    </label>
                  </div>
                  <input
                    className="input-nfi"
                    maxLength={choiceNif ? 9 : 28}
                    type={choiceNif ? "tel" : "text"}
                    value={nif_passport}
                    onChange={(e) => {
                      if (
                        /^\d+$/i.test(e.target.value) ||
                        e.target.value === ""
                      )
                        setNifPassport(e.target.value);
                    }}
                  />
                  {choiceNif && nifInvalido ? (
                    <label style={{ color: "red", whiteSpace: "nowrap" }}>
                      Nif Inválido
                    </label>
                  ) : (
                    <></>
                  )}
                </>
                </RenderConditional>
                <RenderConditional isTrue={!editing}>
                <>
                  <label>
                    {choiceNif ? t.clientProfile.nif : t.clientProfile.passport}
                    :{" "}
                  </label>
                  <p>{nif_passport}</p>
                </>
              </RenderConditional>
            </li>

            <RenderConditional isTrue={!!editing}>
              <button className="button" onClick={(e) => sendInfo(e)}>
                {t.mainInfoEditModal.save}
              </button>
            </RenderConditional>
            <RenderConditional isTrue={!editing}>
              <button className="button" onClick={(e) => startEditing(e)}>
                {t.aboutEditModal.edit}
              </button>
            </RenderConditional>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default MainInfoClient;
