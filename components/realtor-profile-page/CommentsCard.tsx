import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import { Comment } from "@/types/Comment"
import AddCommentModalContext from "context/AddCommentModalContext"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales from "locales"


const Container = styled.div`
  .comments{
    padding: 3rem;
    align-items: flex-start;
    gap: 2rem;
    .list{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .comment{
        position: relative;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 2rem;
        padding: 2rem;
        background-color: var(--base);
        border-radius: 3rem;
        .close{
          position: absolute;
          top: 2rem;
          right: 2rem;
        }
        .title{
          display: flex;
          gap: 1rem;
          align-items: center;
          p{
            color: var(--star);
          }
        }
      }
    }
  }
`

interface CommentsCardProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
    pdfPage: boolean;
}

export default function CommentsCard({localId, accType, sessionProfile, pdfPage = false }:CommentsCardProps){
  
  const [comments, setComments] = useState<Comment []>()

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addCommentSetOpen } = useContext(AddCommentModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  const apiService = new ApiService()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)
        const commentData = await apiService.getRealtorComments(id as string)
        setLoadingOpen(false)

        let reverseComments = commentData.reverse()
        if(pdfPage){
          reverseComments = reverseComments.filter((comment: any, index: number) => {
            if(index<5){
              return comment
            }
          })
        }
        setComments(reverseComments)
      }
    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteComment = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')
    
    setLoadingOpen(true)
    const response = await apiService.deleteComment(token as string, id)
    setLoadingOpen(false)
    
    if(response === 'deleted') router.reload()

  }

  return (
    <Container >
      <div className="card comments">
        <h2>{t.comments.comments}</h2>
        {
          comments?.map(comment => comment.clientId).includes(Number(localId)) ? '': !sessionProfile && !pdfPage && (
            pdfPage || <button onClick={() => addCommentSetOpen(true)}>{t.comments.addComment}</button>
          )
        }
        <div className="list">
            {!comments?.length? t.comments.thisAgentHasNoReviews :""}
            {comments?.map(comment => (
              <div key={ comment.id } className="comment">
                {accType === 'client' && Number(localId) === comment.clientId ? (
                  <Image onClick={e => handleDeleteComment(e)} id={String(comment.id)} className="close" src={closeIcon} alt="close icon"/>
                ): ''}
                <div className="title">
                  <h4>
                    {comment.clientName}
                  </h4>
                  <p>{'★'.repeat(Math.floor(comment.rating))}</p>
                </div>
                <p>
                  {comment.text}
                </p>
              </div>
            ))}            
        </div>
      </div>
    </Container>
  ) 
}