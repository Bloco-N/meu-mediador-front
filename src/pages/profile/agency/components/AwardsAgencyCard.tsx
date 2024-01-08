import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import plusIcon from '@/../public/plus.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddAwardModalContext from "context/AddAwardModalContext"
import { Award } from "@/types/Award"
import LoadingContext from "context/LoadingContext"
import api from "@/services/api"
import { toast } from "react-toastify"

const Container = styled.div`
  .awards{
    position: relative;
    align-items: flex-start;
    padding: 3rem;
    gap: 2rem;
    .edit-icons{
      display: flex;
      gap: 2rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
      .plus{
        position: unset;
      }
    }
    ul{
      all: unset;
      padding-left:3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      li{
        color: var(--surface-2);
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`
interface AwardsAgencyCardProps{
    localId:string;
    accType:string;
}
export default function AwardsAgencyCard({localId, accType}:AwardsAgencyCardProps){

  const [awards, setAwards] = useState<Award []>() 

  const [editAwards, setEditAwards] = useState(false)

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType
  
  const { setOpen: addAwardSetOpen } = useContext(AddAwardModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)

        await api.get(`/award/realtor/${1}`)
        .then((response) => {
          setAwards(response.data)
          setLoadingOpen(false)
        })
        .catch((error) => {
          setLoadingOpen(false)
          return error
        })
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'realtor') setSessionProfile(true)
    setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteAward = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)

    await api.delete(`/award/${id}`)
    .then((response) => {
      console.log("Passou aqui")
      toast.success("Prêmio removido com sucesso!")
      setLoadingOpen(false)
      if(response.data === 'deleted') router.reload()
    })
    .catch((error) => {
      toast.error("Erro ao remover prêmio!")
      setLoadingOpen(false)
      return error
    })
  }

  return (
    <Container >
      <div className="card awards">
        <h2>Prêmios e distinções</h2>
        { sessionProfile ? (
          <div className="edit-icons">
            <Image onClick={() => setEditAwards(!editAwards)} className='plus' src={editIcon} alt='edit icon'/>
            <Image onClick={() => addAwardSetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
          </div>
        ): ''}
        <ul>
          {awards?.map(item => (
              <li key={item.id}>
                {sessionProfile && editAwards ? (
                  <Image onClick={e => handleDeleteAward(e)} id={String(item.id)} className="close" src={closeIcon} alt="close icon"/>
                ): ''}
                {item.title}
              </li>
            )
          )}
        </ul>
      </div>
    </Container>
  ) 
}