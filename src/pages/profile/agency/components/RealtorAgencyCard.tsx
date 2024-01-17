import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import closeIcon from "@/../public/close.svg";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { Comment } from "@/types/Comment";
import AddCommentModalContext from "context/AddCommentModalContext";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import api from "@/services/api";
import { toast } from "react-toastify";
import profileIcon from "../../../../../public/profile.svg";

type ContainerProps = {
  isProfile: boolean;
};

const Container = styled.div<ContainerProps>`
 
  .comments {
    background: #fff;
    padding: 3rem;
    align-items: flex-start;
    gap: 2rem;
    display: flex;
    .comment {
      position: relative;
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 2rem;
      padding: 2rem;
      background-color: var(--base);
      border-radius: 3rem;
      cursor: pointer;
      /* margin-bottom: 1em; */

      h4 {
        font-size: 16px;
      }

      @media only screen and (max-width: 900px) {
        width: 100%;
      }

      .divImage {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2em;

        h3 {
          font-size: 24px;
        }
      }
    }
    .profile {
      height: ${(porps) => (porps.isProfile ? "8rem" : "4rem")};
      width: ${(porps) => (porps.isProfile ? "8rem" : "4em")};
      border-radius: 50%;
      object-fit: cover;
      position: relative;
      @media only screen and (max-width: 900px) {
        margin-bottom: unset;
      }
    }
    .divCard {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      gap: 2em 4em;
      flex-wrap: wrap;
    }
  }
`;

interface CommentsCardProps {
  localId: string;
  accType: string;
  isProfile: boolean;
}

export default function RealtorAgencyCard({
  localId,
  accType,
  isProfile,
}: CommentsCardProps) {
  const [realtor, setRealtor] = useState([]);

  const [sessionProfile, setSessionProfile] = useState(false);

  const { user } = useContext(UserContext) as UserContextType;

  const { setOpen: addCommentSetOpen } = useContext(
    AddCommentModalContext
  ) as ModalOpenContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const router = useRouter();
  const { id } = router.query;

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoadingOpen(true);

        await api
          .get(`/partnership/agency/${localId}`)
          .then((response) => {
            setRealtor(response.data[0].list);
            setLoadingOpen(false);
          })
          .catch((error) => {
            setLoadingOpen(true);
            return error;
          });
      }
    };
    const localId = localStorage.getItem("id") as string;
    if (Number(id) === Number(localId) && accType === "agency")
      setSessionProfile(true);

    fetchData();
  }, [id, user.id, accType, setLoadingOpen]);

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;

    const { id } = target;

    const token = localStorage.getItem("token");

    setLoadingOpen(true);

    await api
      .delete(`/comment/${id}`)
      .then((response) => {
        toast.success(t.toast.removeComment);
        setLoadingOpen(false);
        if (response.data === "deleted") router.reload();
      })
      .catch((error) => {
        toast.error(t.toast.errorRemoveComment);
        return error;
      });
  };

  return (
    <Container isProfile={isProfile}>
      <div className="card comments">
        <h2>Corretores associados</h2>
        <div className="divCard">
          {realtor?.map((item: any) => {
            return (
              <div key={item.idRealtor}onClick={() => router.push(`/profile/realtor/${item.idRealtor}`)} className="comment">
                <div className="divImage">
                  <Image
                    width={100}
                    height={100}
                    className={
                      isProfile ? "profile profile-pointer" : "profile"
                    }
                    src={item?.pic ? item?.pic : profileIcon}
                    alt="profile icon"
                  />
                  <h3> {item.nameRealtor} </h3>
                </div>

                <h4>{item.workTime[locale as keyof typeof item.workTime]}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
