import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { Img, Modal, ServiceModal } from '@components/index';
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddServiceModalContext from "context/AddServiceModalContext"
import { RealtorService } from "@/types/RealtorService"
import LoadingContext from "context/LoadingContext"
import locales from "locales"
import api from "@/services/api"
import { toast } from "react-toastify"

const Container = styled.div`
  .services{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 3rem;
    gap: 2rem;
    position: relative;
    flex-wrap: wrap;
    text-align: left;
    .service{
      flex-shrink: 0;
      scroll-snap-align: start;
      background-color: var(--base);
      padding: 1rem;
      border-radius: 3rem;
      position: relative;
      display: flex;
      align-items: center;
      gap: 2rem;
      @media only screen and (max-width: 400px){
        font-size: 1.5rem;
      }
      .close{
        position: relative;
      }
    }
  }
`
interface ServicesCardProps{
    localId:string;
    accType:string;
}
export default function ServicesAgencyCard({localId, accType}:ServicesCardProps){
  
  const [services, setServices] = useState<RealtorService []>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addServiceSetOpen } = useContext(AddServiceModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const [openModalService, setOpenModalService] = useState(false)
  const [childSizeModal, setChildSize] = useState({ width: "95%", height: "100%", radius: 10 });

  const router = useRouter()
  const { id } = router.query

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)

        await api.get(`/service/agenct/${id}`)
        .then((response) =>{
          setServices(response.data)
          setLoadingOpen(false)
        })
        .catch((error) => {
          setLoadingOpen(false)
          return error
        })
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'agency') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteService = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    const { id } = target
    
    setLoadingOpen(true)

    await api.delete(`/service/agency/${id}`)
    .then((response) => {
      toast.success(t.toast.removeService)
      setLoadingOpen(false)
      router.reload()
    })
    .catch((error) => {
      toast.error(t.toast.errorRemoveService)
      setLoadingOpen(false)
    })

   
  }

  return (
    <Container >
      <div className="card services">
          <h3>{t.services.thisAgencyWorkWith}</h3>
          {services?.map((item) =>
                <p className="service" key={item.id}>
                  {item.service.title}
                  { sessionProfile && (
                  <Img onClick={ e => handleDeleteService(e)} id={String(item.id)} className="close" file={closeIcon} alt='close icon'/>
                )}
                </p> 
          )}

          { sessionProfile ? (
            <Img onClick={() => setOpenModalService(true)} className='edit-main' file={editIcon} alt='edit icon'/>
          ): ''}
      </div>
      <Modal isOpen={openModalService} onClose={() => setOpenModalService(false)} childSize={childSizeModal}>
        <ServiceModal setOpen={setOpenModalService}/>
      </Modal>
    </Container>
  ) 
}