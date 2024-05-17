import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { Img } from '@components/index';
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AboutEditModalContext from "context/AboutEditModalContext"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales from "locales"
import { Modal, ModalAbout } from ".."

const Container = styled.div`
  .introduction{
    background: #fff;
    padding: 3rem;
    align-items: flex-start;
    position: relative;
    text-align: left;

    h2 {
      margin-bottom: 18px;
    }

    p{
      @media only screen and (max-width: 500px){
        margin: 0;
      }
      margin: 2rem;
      white-space: pre-wrap;
      font-size: 1.8rem;
    }
    .elipses-button{
      cursor: pointer;
      margin-top: 9px;
      font-weight: 600;
    }
  }
`

interface AboutCardProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
    pdfPage?: boolean;
}

export default function AboutCard({localId, accType, sessionProfile, pdfPage=false}:AboutCardProps){

  const [elip, setElip] = useState(true)

  const [ realtor, setRealtor ] = useState<RealtorProfile>()
  const [openModal, setOpen] = useState(false)
  const [childSizeModal, setChildSize] = useState({ width: "80%", height: "100%", radius: 10 });

  const { user } = useContext(UserContext) as UserContextType
  
  // const { setOpen: aboutEditOpen } = useContext(AboutEditModalContext) as ModalOpenContextType

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
        const data = await apiService.getRealtorInformation(id as string)
        setLoadingOpen(false)

        setRealtor(data)
      }
    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  return (
    <Container >
      <div className="card introduction">
        <h2>{t.about.about}</h2>
        {pdfPage?
          <p>{realtor?.introduction}</p>
        : <p className={elip ? "elipses" : ""}>
            {realtor?.introduction}
          </p>}
        {pdfPage?"":
        elip ? (
          <p className="elipses-button" onClick={() => setElip(false)}>{t.about.showMore}</p>
          ):(
          <p className="elipses-button" onClick={() => setElip(true)}>{t.about.showLess}</p>
        )}
        { sessionProfile ? (
            <Img onClick={() => setOpen(true)} className='edit-main' file={editIcon} alt='edit icon'/>
          ): ''}
      </div> 
      <Modal isOpen={openModal} onClose={() => setOpen(false)} childSize={childSizeModal}>
        <ModalAbout setOpen={setOpen}/>
      </Modal>
    </Container>
  ) 
}