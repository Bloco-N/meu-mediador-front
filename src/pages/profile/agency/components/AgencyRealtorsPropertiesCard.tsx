import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import { Img } from '@components/index';
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import plusIcon from "@/../public/plus.svg";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import AddPropertyModalContext from "context/AddPropertyModalContext";
import Link from "next/link";
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes";
import Rooms, { TRooms } from "@/types/Rooms";
import Preservations, { TPreservations } from "@/types/Preservations";
import { timeSince } from "@/utils/timeSince";
import LoadingContext from "context/LoadingContext";
import housePaceholder from "../../../../../public/placeholder.jpg";
import locales from "locales";
import EnergyEfficience, { TEnergyEfficience } from "@/types/EnergyEfficience";

const EnergyColors = {
  AP: "#01833b",
  A: "#3ea03d",
  B: "#76ac34",
  Bm: "#aac32a",
  C: "#c7cf1a",
  D: "#eadb02",
  E: "#eabb09",
  F: "#d81920",
  G: "#a22529",
};

const Container = styled.div`
  .properties {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem;
    position: relative;
    text-align: left;
    .list {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 2rem;
      scroll-snap-type: x mandatory;
      padding: 1rem;
      overflow: auto;
      .properties-column {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .plus {
        cursor: pointer;
        height: 3rem;
        width: 3rem;
        position: absolute;
        top: 3rem;
        right: 3rem;
      }
       .propertie {
        text-align: left;
        @media only screen and (max-width: 510px) {
          width: 240px;
        }
        flex-shrink: 0;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--base);
        padding: 1.5rem;
        border-radius: 3rem;
        width: 40rem;
        position: relative;
        .footer {
          display: flex;
          justify-content: space-between;
          a {
            width: 50%;
          }
          .sub-text {
            font-style: italic;
          }
        }
        h2 {
          color: var(--surface-2);
        }
        h3 {
          color: var(--surface-2);
        }
        .property-img {
          object-fit: cover;
          opacity: 1;
          border-radius: 3rem;
          width: 100%;
          height: 500px;
          max-height: 25rem;
        }
        .close {
          position: absolute;
          right: 1rem;
        }
        .special-link {
          width: 12rem;
        }
      }
    }
  }
`;

export default function AgencyRealtorsPropertiesCard({ agency }: any) {
  const [properties, setProperties] = useState<any>();

  const [sessionProfile, setSessionProfile] = useState(false);

  const { user } = useContext(UserContext) as UserContextType;

  const { setOpen: addPropertySetOpen } = useContext(
    AddPropertyModalContext
  ) as ModalOpenContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const router = useRouter();
  const { id } = router.query;

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const allProperties = agency.Partnerships.map((part: any) => part.Realtor);
    const agencyRealtors = allProperties.map((item: any) => {
      return {
        name: item.firstName,
        lastName: item.lastName,
        id: item.id,
        properties: item.Properties,
      };
    });
    const agencyRealtorsProperties: any = [];
    for (let i = 0; i < agencyRealtors.length; i++) {
      for (let j = 0; j < agencyRealtors[i].properties.length; j++) {
        agencyRealtorsProperties.push({
          ...agencyRealtors[i].properties[j],
          realtorLastName: agencyRealtors[i].lastName,
          realtorId: agencyRealtors[i].id,
          realtorName: agencyRealtors[i].name,
        });
      }
    }
    const agencyRealtorsPropertiesInPairs: any = [];
    for (let i = 0; i < agencyRealtorsProperties.length; i = i + 2) {
      agencyRealtorsPropertiesInPairs.push([
        agencyRealtorsProperties[i],
        agencyRealtorsProperties[i + 1],
      ]);
    }

    setProperties(agencyRealtorsPropertiesInPairs);
  }, []);

  return (
    <Container>
      <div className="card properties">
        <h2>{t.properties.properties} </h2>
        <div className="list">
          {properties?.map((item: any) => (
            <div key={item[0].id} className="properties-column">
              <div className="propertie">
                <div className="realtor-name">
                  <span>Consultor(a): </span>
                  <a
                    className="special-link"
                    onClick={() =>
                      router.push(`/profile/realtor/${item[0].realtorId}`)
                    }
                  >
                    {`${item[0].realtorName} ${item[0].realtorLastName}`}
                  </a>
                </div>
                <div className="image-container">
                  <Img
                    className="property-img"
                    file={housePaceholder}
                    url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${item[0].profilePicture}`}
                    validateURL={!!item[0].profilePicture}
                    width={200}
                    height={100}
                    alt="profile picture"
                  />
                </div>

                <h2>{item[0].price}</h2>
                <h3>{item[0].title}</h3>
                <p className="sub-text">
                  {
                    PropertyTypes[locale as keyof typeof PropertyTypes][
                      item[0].propertyType as keyof TPropertyTypes
                    ]
                  }{" "}
                  {Rooms[item[0].rooms as keyof TRooms]} {item[0].grossArea} de
                  Área Bruta e {item[0].usefulArea} de Área Útil,{" "}
                  {
                    Preservations[locale as keyof typeof Preservations][
                      item[0].preservation as keyof TPreservations
                    ]
                  }
                  .
                </p>
                <p>
                  {t.addPropertiesModal.eficiencia}:
                  {["H", "I", "J"].includes(item.energyefficience) ? (
                    <a>
                      {" "}
                      {
                        EnergyEfficience[
                          locale as keyof typeof EnergyEfficience
                        ][item[0].energyefficience as keyof TEnergyEfficience]
                      }
                    </a>
                  ) : (
                    <>
                      <a
                        className="gg-home-alt"
                        style={{
                          color:
                            EnergyColors[
                              item[0]
                                .energyefficience as keyof TEnergyEfficience
                            ],
                          display: "inline-flex",
                          height: "10px",
                          marginBottom: "10px",
                          marginLeft: "2px",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            marginTop: "-2px",
                            zIndex: "1",
                            position: "relative",
                            marginLeft: "auto",
                            marginRight: "auto",
                            fontSize: "10px",
                          }}
                        >
                          {
                            EnergyEfficience[
                              locale as keyof typeof EnergyEfficience
                            ][
                              item[0]
                                .energyefficience as keyof TEnergyEfficience
                            ]
                          }
                        </span>
                      </a>
                      {/* <IconEnergy
                  cor = {EnergyColors[item.energyefficience as keyof TEnergyEfficience]}
                  cor_fonte="#000"
                  tamanho_casa="18px"
                  texto={EnergyEfficience[locale as keyof typeof EnergyEfficience][item.energyefficience as keyof TEnergyEfficience]}
                  /> */}
                    </>
                  )}
                </p>
                <div className="footer">
                  <Link
                    className="special-link"
                    href={item[0].link}
                    target="_blank"
                  >
                    Conferir Imóvel
                  </Link>
                  <p className="sub-text">
                    {timeSince(new Date(item[0].createdAt))}
                  </p>
                </div>
              </div>
              {item[1] && (
                <div className="propertie">
                  <div>
                    <span>Consultor(a): </span>
                    <a
                      className="special-link"
                      onClick={() =>
                        router.push(`/profile/realtor/${item[1].realtorId}`)
                      }
                    >
                      {`${item[1].realtorName} ${item[1].realtorLastName}`}
                    </a>
                  </div>
                  <Img
                    className="property-img"
                    url={`https://storage-production-7c83.up.railway.app/${item[0].profilePicture}`} 
                    validateURL={!!item[1].profilePicture}
                    file={housePaceholder}
                    width={200}
                    height={100}
                    alt="profile picture"
                  />
                  <h2>{item[1].price}</h2>
                  <h3>{item[1].title}</h3>
                  <p className="sub-text">
                    {
                      PropertyTypes[locale as keyof typeof PropertyTypes][
                        item[1].propertyType as keyof TPropertyTypes
                      ]
                    }{" "}
                    {Rooms[item[1].rooms as keyof TRooms]} {item[1].grossArea}{" "}
                    de Área Bruta e {item[1].usefulArea} de Área Útil,{" "}
                    {
                      Preservations[locale as keyof typeof Preservations][
                        item[1].preservation as keyof TPreservations
                      ]
                    }
                    .
                  </p>
                  <div className="footer">
                    <Link
                      className="special-link"
                      href={item[1].link}
                      target="_blank"
                    >
                      {t.properties.verify}
                    </Link>
                    <p className="sub-text">
                      {timeSince(new Date(item[1].createdAt))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {sessionProfile ? (
            <Img
              onClick={() => addPropertySetOpen(true)}
              className="plus"
              file={plusIcon}
              alt="edit icon"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </Container>
  );
}
