import { UserContextType } from "@/types/UserContextType";
import UserContext from "context/UserContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ButtonHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import closeIcon from "@/../public/close.svg";
import editIcon from "@/../public/edit.svg";
import {
  ModalOpenContextAddReply,
  ModalOpenContextType,
} from "@/types/ModalOpenContextType";
import { Comment } from "@/types/Comment";
import AddCommentModalContext from "context/AddCommentModalContext";
import LoadingContext from "context/LoadingContext";
import { ApiService } from "@/services/ApiService";
import locales from "locales";
import AddReplyModalContext from "context/AddReplyModalContext";
import { RealtorProfile } from "@/types/RealtorProfile";

const Container = styled.div`
  .comments {
    background: #fff;
    padding: 3rem;
    align-items: flex-start;
    gap: 2rem;
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      .comment {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;
        gap: 2rem;
        padding: 2rem;
        background-color: var(--base);
        border-radius: 3rem;
        div {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .edit {
          cursor: pointer;
        }
        .reply-title {
          font-weight: bold;
        }
        .close {
          position: absolute;
          top: 2rem;
          right: 2rem;
        }
        .title {
          display: flex;
          gap: 1rem;
          align-items: center;
          p {
            color: var(--star);
          }
        }
      }
    }

    .stars {
      display: flex;
      align-items: center;
      h3 {
        font-weight: bold;
        font-size: 20px;
      }
      p {
        margin-left: 8px;
        font-size: 30px;
        color: var(--star);
      }
      span {
        margin-left: 8px;
        font-weight: bold;
        font-size: 20px;
      }

      @media only screen and (max-width: 900px) {
        margin-top: 5px;
        h3 {
          font-size: 15px;
        }
        p {
          font-size: 20px;
        }
        span {
          font-size: 15px;
        }
      }
    }

    .button-view-more {
      width: 15%;
    }

    .stars-main {
      width: 28%;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 10px;
      @media only screen and (max-width: 900px) {
        flex-direction: column;
        width: 100%;
        align-items: start;
      }
    }
  }
`;

interface CommentsCardProps {
  localId: string;
  accType: string;
  sessionProfile: boolean;
  pdfPage: boolean;
  userSigned: RealtorProfile;
}

export default function CommentsCard({
  localId,
  accType,
  sessionProfile,
  pdfPage = false,
  userSigned,
}: CommentsCardProps) {
  const [comments, setComments] = useState<Comment[]>();

  const { user } = useContext(UserContext) as UserContextType;

  const { setOpen: addCommentSetOpen } = useContext(
    AddCommentModalContext
  ) as ModalOpenContextType;

  const { setOpen: addReplySetOpen } = useContext(
    AddReplyModalContext
  ) as ModalOpenContextAddReply;

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
        const commentData = await apiService.getRealtorComments(id as string);
        setLoadingOpen(false);

        let reverseComments = commentData.reverse();
        if (pdfPage) {
          reverseComments = reverseComments.filter(
            (comment: any, index: number) => {
              if (index < 5) {
                return comment;
              }
            }
          );
        }
        setComments(reverseComments);
      }
    };

    fetchData();
  }, [id, user.id, accType, setLoadingOpen]);

  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;

    const { id } = target;

    const token = localStorage.getItem("token");

    setLoadingOpen(true);
    const response = await apiService.deleteComment(token as string, id);
    setLoadingOpen(false);

    if (response === "deleted") router.reload();
  };

  const handleReply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (comments) {
      addReplySetOpen({
        open: true,
        commentId: Number(target.id),
        reply: comments.find((item) => item.id === Number(target.id))
          ?.reply as string,
      });
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (comments) {
      addReplySetOpen({
        open: true,
        commentId: Number(target.id),
        reply: comments.find((item) => item.id === Number(target.id))
          ?.reply as string,
      });
    }
  };

  const [visibleComments, setVisibleComments] = useState(5);

  const handleLoadMore = () => {
    setVisibleComments(visibleComments + 5);
  };

  return (
    <Container>
      <div className="card comments">
        <div className="stars-main">
          <h2>{t.comments.comments}</h2>
          <div className="stars">
            <h3>{Math.floor(userSigned?.rating)} </h3>
            <p>{"★".repeat(Math.floor(userSigned?.rating))}</p>
            <span>{`(${comments?.length})`}</span>
          </div>
        </div>

        {comments?.map((comment) => comment.clientId).includes(Number(localId))
          ? ""
          : !sessionProfile &&
            !pdfPage &&
            (pdfPage || (
              <button className="button" onClick={() => addCommentSetOpen(true)}>
                {t.comments.addComment}
              </button>
            ))}
        <div className="list">
          {!comments?.length ? t.comments.thisAgentHasNoReviews : ""}
          {comments?.slice(0, visibleComments).map((comment, index) => (
            <div key={comment.id} className="comment">
              {accType === "client" && Number(localId) === comment.clientId ? (
                <Image
                  onClick={(e) => handleDeleteComment(e)}
                  id={String(comment.id)}
                  className="close"
                  src={closeIcon}
                  alt="close icon"
                />
              ) : (
                ""
              )}
              <div className="title">
                <h4>{comment.clientName}</h4>
                <p>{"★".repeat(Math.floor(comment.rating))}</p>
              </div>
              <p>{comment.text}</p>
              {comment.reply && (
                <>
                  <p className="reply-title">Resposta:</p>
                  <div>
                    <p className="reply">{comment.reply}</p>
                    <Image
                      onClick={(e) => handleEdit(e)}
                      id={String(comment.id)}
                      className="edit"
                      src={editIcon}
                      height={20}
                      width={20}
                      alt="edit icon"
                    />
                  </div>
                </>
              )}
              {sessionProfile && !comment.reply && (
                <button id={String(comment.id)} onClick={(e) => handleReply(e)}>
                  {t.comments.reply}
                </button>
              )}
            </div>
          ))}
          {comments && comments.length > visibleComments && (
            <button className="button-view-more" onClick={handleLoadMore}>
              Ver Mais
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
