import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AboutEditModalContext from "context/AboutEditModalContext"
import LoadingContext from "context/LoadingContext"

const Container = styled.div`
  .introduction{
    padding: 3rem;
    align-items: flex-start;
    position: relative;
    p{
      margin: 2rem;
      white-space: pre-wrap;
    }
    .elipses-button{
      cursor: pointer;
    }
  }
`

interface AboutCardProps{
    localId:string;
    accType:string;
}

export default function AboutCard({localId, accType}:AboutCardProps){

  const [elip, setElip] = useState(true)

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType
  
  const { setOpen: aboutEditOpen } = useContext(AboutEditModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + id)
        const data = await response.json()
        setRealtor(data)
  
        setLoadingOpen(false)
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'realtor') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  return (
    <Container >
      <div className="card introduction">
        <h2>Sobre</h2>
        <p className={elip ? "elipses" : ""}>
          {realtor?.introduction}
        </p>
        {elip ? (
          <p className="elipses-button" onClick={() => setElip(false)}>Mostrar Mais</p>
          ):(
          <p className="elipses-button" onClick={() => setElip(true)}>Mostrar Menos</p>
        )}
        { sessionProfile ? (
            <Image onClick={() => aboutEditOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
          ): ''}
      </div> 
    </Container>
  ) 
}