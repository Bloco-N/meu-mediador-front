import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import profileIcon from "@/../public/profile.svg";
import styled from "styled-components";
import PictureModalContext from "context/PictureModalContext";
import { PictureModalContextType } from "@/types/PictureModalContextType";
import editIcon from "../public/edit.svg";
import mailIcon from "../public/mail.svg";
import greyImage from "../public/grey.png";
import UserContext from "context/UserContext";
import { UserContextType } from "@/types/UserContextType";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import Link from "next/link";
import { ApiService } from "@/services/ApiService";
import { useRouter } from "next/router";
import { ClientProfile } from "@/types/ClientProfile";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import api from "@/services/api";
import { toast } from "react-toastify";
import { error } from "console";

type ContainerProps = {
  isProfile: boolean;
};

const Container = styled.div<ContainerProps>`
  position: relative;

  min-height: ${(props) => (props.isProfile ? "40rem" : "20rem")};
  @media only screen and (max-width: 900px) {
    min-height: ${(porps) => (porps.isProfile ? "60rem" : "40rem")};
    height: auto;
  }
  .main-info {
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
      height: ${(porps) => (porps.isProfile ? "20rem" : "10rem")};
      width: ${(porps) => (porps.isProfile ? "20rem" : "10rem")};
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
      @media only screen and (max-width: 900px) {
        flex-direction: column;
        gap: 2rem;
        margin-top: unset;
        margin-left: unset; 
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        @media only screen and (max-width: 900px) {
          justify-content: center;
          align-items: center;
        }
        li {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        p {
          width: auto;
        }
        input {
          height: 18px;
          font-size: 18px;
          width: 250px;
          padding: 0;
          border-radius: 5px;
          padding-left: 10px;
        }
        button {
          width: 100px;
          height: 25px;
          padding: 5px;
          margin-top: 10px;
        }
      }

      @media (width < 768px) {
        label,
        p,
        h3 {
          font-size: 16px;
        }

        .form {
          li {
            width: 100%;
            height: 25px;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            &:has(p) {
              justify-content: start;
            }
            input {
              height: 100%;
              padding: 0.5rem 10px;
              width: 200px;
            }
          }
        }
      }
    }

    .contact {
      .icon {
        height: 2rem;
        width: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.5s;
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
};

const MainInfoClient = ({ userSigned, isProfile }: MainInfoClientProps) => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

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

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;
  const [sessionProfile, setSessionProfile] = useState(false);

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const localId = localStorage.getItem("id");
    const accounType = localStorage.getItem("accountType");
    if (Number(localId) === userSigned?.id && accounType === "client") {
      setSessionProfile(true);
    }
  }, [user.id, userSigned?.id]);

  const handleChangeCover = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    if (FileReader && file) {
      const fr = new FileReader();
      const token = localStorage.getItem("token");
      const accountType = localStorage.getItem("accountType");

      const onload = async () => {
        const img = document.getElementById("cover-pic") as HTMLImageElement;
        const apiService = new ApiService();

        img.src = fr.result as string;

        const text = await apiService.updateCoverPicture(
          accountType as string,
          fr,
          token as string
        );

        if (text === "updated") {
          setUser({
            id: user.id,
            token: user.token,
            coverPicture: fr.result as string,
            profilePicture: user.profilePicture,
            accountType: user.accountType,
          });
          router.reload();
        }
      };

      fr.onload = onload;

      fr.readAsDataURL(file);
    }
  };

  async function sendInfo(e: any) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoadingOpen(true);
    var nifValidado: boolean | null = true;
    setNifInvalido(false);
    console.log("nif valido " + validateNIF(nif_passport));
    if (choiceNif) {
      nifValidado = validateNIF(nif_passport);
      if (nifValidado != null) {
        setNifInvalido(!nifValidado);
      }
      setEditing(!editing);
    }

    if (nifValidado || nifValidado == null) {
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
          //router.reload()
        })
        .catch((error) => {
          toast.error(t.toast.dataError);
          setLoadingOpen(false);
        });
    } else {
      setLoadingOpen(false);
    }
  }

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
    <Container isProfile={isProfile}>
      <div className="main-info border">
        <Image
          // width={80}
          // height={80}
          className={isProfile ? "profile profile-pointer" : "profile"}
          src={profileIcon}
          alt="profile icon"
        />
        <div className="sub-content">
          <form className="form">
            <li>
              <label>
                <h3>{t.signIn.email}:</h3>{" "}
              </label>
              <h3>{userSigned?.email}</h3>
              <div className="contact">
                {userSigned?.email ? (
                  <Link href={"mailto: " + userSigned.email} target="_blank">
                    <Image className="icon" src={mailIcon} alt="mail icon" />
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </li>
            <li>
              <label>{t.mainInfoEditModal.name}: </label>
              {editing ? (
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setFirstName(e.target.value);
                  }}
                />
              ) : (
                <p>{firstName}</p>
              )}
            </li>
            <li>
              <label>{t.mainInfoEditModal.lastName}: </label>
              {editing ? (
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setLastName(e.target.value);
                  }}
                />
              ) : (
                <p>{lastName}</p>
              )}
            </li>
            <li>
              <label>{t.mainInfoEditModal.phone}: </label>
              {editing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    if (/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setPhone(e.target.value);
                  }}
                />
              ) : (
                <p>{phone}</p>
              )}
            </li>
            <li>
              <label>{t.clientProfile.adress}: </label>
              {editing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              ) : (
                <p>{address}</p>
              )}
            </li>
            <li>
              <label>{t.clientProfile.city}: </label>
              {editing ? (
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setCity(e.target.value);
                  }}
                />
              ) : (
                <p>{city}</p>
              )}
            </li>
            <li>
              <label>{t.clientProfile.country}: </label>
              {editing ? (
                <input
                  type="text"
                  value={country}
                  onChange={(e) => {
                    if (!/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setCountry(e.target.value);
                  }}
                />
              ) : (
                <p>{country}</p>
              )}
            </li>
            <li>
              <label>{t.clientProfile.zipCode}: </label>
              {editing ? (
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => {
                    if (/^\d+$/i.test(e.target.value) || e.target.value === "")
                      setZipCode(e.target.value);
                  }}
                />
              ) : (
                <p>{zipCode}</p>
              )}
            </li>

            <li>
              {editing ? (
                <>
                  <div
                    style={{
                      alignItems: "flex-start",
                      verticalAlign: "middle",
                    }}
                  >
                    <label>
                      {t.clientProfile.nif}
                      <input
                        style={{
                          width: "auto",
                          verticalAlign: "sub",
                          marginLeft: "0.4rem",
                        }}
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
                        style={{
                          width: "auto",
                          verticalAlign: "sub",
                          marginLeft: "0.4rem",
                        }}
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
                    <label style={{ color: "red" }}>Nif Inválido</label>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <label>
                    {choiceNif ? t.clientProfile.nif : t.clientProfile.passport}
                    :{" "}
                  </label>
                  <p>{nif_passport}</p>
                </>
              )}
            </li>

            {editing ? (
              <button className="button" onClick={(e) => sendInfo(e)}>
                {t.mainInfoEditModal.save}
              </button>
            ) : (
              <button className="button" onClick={(e) => startEditing(e)}>
                {t.aboutEditModal.edit}
              </button>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};

export default MainInfoClient;
