import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import { Img } from "@components/index";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import plusIcon from "@/../public/plus.svg";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { Property } from "@/types/Property";
import Link from "next/link";
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes";
import Rooms, { TRooms } from "@/types/Rooms";
import Preservations, { TPreservations } from "@/types/Preservations";
import { timeSince } from "@/utils/timeSince";
import LoadingContext from "context/LoadingContext";
import { ApiService } from "@/services/ApiService";
import locales from "locales";
import EnergyEfficience, { TEnergyEfficience } from "@/types/EnergyEfficience";

import editIcon from "../public/edit.svg";
import Modal from "./Modal";
import { ModalProperty } from ".";
import { useIsMobile } from "hooks";

const Container = styled.div`
  .properties {
    background: #fff;
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem;
    position: relative;
    .list {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 2rem;
      scroll-snap-type: x mandatory;
      padding: 1rem;
      overflow: auto;
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
    .pdf-list {
      flex-wrap: wrap;
    }
    .watermark {
      position: relative;
      margin-top: 3rem;
    }
    .watermark::after {
      content: "Meoagent";
      position: absolute;
      bottom: 40%;
      left: 35%;
      text-align: center;
      opacity: 0.5;
      font-size: 1.5em;
      color: white;
    }

    .same-line {
      display: inline-block;
    }
    .div_certificate {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .div_info_proprety{
      height: 20%
    }
  }
`;

interface PropertiesCardProps {
  localId: string;
  accType: string;
  sessionProfile: boolean;
  pdfPage?: boolean;
}

export default function PropertiesCard({
  localId,
  accType,
  sessionProfile,
  pdfPage = false,
}: PropertiesCardProps) {
 
  const isMobile =  useIsMobile()
  const [properties, setProperties] = useState<Property[]>();
  const [open, setOpen] = useState(false);

  const childSizeModal = {
    width: "95%",
    height: isMobile ? "98%" : "100%",
    radius: 10,
  }

  const [property, setPropertyToUpdate] = useState({});

  const { user } = useContext(UserContext) as UserContextType;

  // const {
  //   setOpen: addPropertySetOpen,
  //   setPropertyToUpdate: setPropertyToUpdate
  //  } = useContext(AddPropertyModalContext) as ModalPropertyOpenContextType

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const router = useRouter();
  const { id } = router.query;
  const apiService = new ApiService();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoadingOpen(true);
        const propertiesData = await apiService.getRealtorProperties(
          id as string
        );
        setLoadingOpen(false);

        setProperties(propertiesData);
      }
    };

    fetchData();
  }, [id, user.id, accType, setLoadingOpen]);

  const handleViewProperty = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;

    const { id } = target;

    const property: any = properties?.find(
      (property) => property.id === parseInt(id)
    );
    setPropertyToUpdate(property);
    setOpen(true);
  };

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
  return (
    <Container>
      <div className="card properties">
        <h2>{t.properties.properties}</h2>
        <div className={`list ${pdfPage && "pdf-list"}`}>
          {properties?.map((item) => (
            <div key={item.id} className="propertie">
              {sessionProfile && (
                <Img
                  onClick={(e) => handleViewProperty(e)}
                  id={String(item.id)}
                  className="close"
                  file={editIcon}
                  alt="edit icon"
                />
              )}
              <div className="watermark">
                
                <Img
                  url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${item?.profilePicture}`}
                  validateURL={!!item?.profilePicture}
                  className="property-img"
                  width={200}
                  height={100}
                  alt="profile picture"
                />
              </div>
              <h2>{item.price}</h2>
              <h3>{item.title}</h3>

              <div className="div_info_proprety">
                <p className="sub-text">
                  {
                    PropertyTypes[locale as keyof typeof PropertyTypes][
                      item.propertyType as keyof TPropertyTypes
                    ]
                  }{" "}
                  {Rooms[item.rooms as keyof TRooms]},{" "}
                  {t.addPropertiesModal.grossArea}: {item.grossArea},{" "}
                  {t.addPropertiesModal.usableArea}: {item.usefulArea},{" "}
                  {
                    Preservations[locale as keyof typeof PropertyTypes][
                      item.preservation as keyof TPreservations
                    ]
                  }
                  , {t.addPropertiesModal.eficiencia}:
                  {["H", "I", "J"].includes(item.energyefficience) ? (
                    <a>
                      {" "}
                      {
                        EnergyEfficience[
                          locale as keyof typeof EnergyEfficience
                        ][item.energyefficience as keyof TEnergyEfficience]
                      }
                    </a>
                  ) : (
                    <>
                      <a
                        className="gg-home-alt"
                        style={{
                          color:
                            EnergyColors[
                              item.energyefficience as keyof TEnergyEfficience
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
                            ][item.energyefficience as keyof TEnergyEfficience]
                          }
                        </span>
                      </a>
                    </>
                  )}
                  .
                </p>
              </div>

              <div className="div_certificate">
                <h3>Certificado:</h3>
                <p>{item.certificate}</p>
              </div>
              <div className="footer">
                <Link className="special-link" href={item.link} target="_blank">
                  {t.properties.verify}
                </Link>
                <p className="sub-text">
                  {timeSince(new Date(item.createdAt))}
                </p>
              </div>
            </div>
          ))}
          {sessionProfile ? (
            <Img
              onClick={() => {
                setPropertyToUpdate({});
                setOpen(true);
              }}
              className="plus"
              file={plusIcon}
              alt="edit icon"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        childSize={childSizeModal}
      >
        <ModalProperty propertyToUpdate={property} setOpen={setOpen} />
      </Modal>
    </Container>
  );
}
