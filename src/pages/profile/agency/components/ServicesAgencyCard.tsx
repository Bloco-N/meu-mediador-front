import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddServiceModalContext from "context/AddServiceModalContext"
import { RealtorService } from "@/types/RealtorService"
import LoadingContext from "context/LoadingContext"

const Container = styled.div`
  .services{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 3rem;
    gap: 2rem;
    position: relative;
    flex-wrap: wrap;
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
  console.log("AQUI")
  const [services, setServices] = useState<RealtorService []>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addServiceSetOpen } = useContext(AddServiceModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  
  useEffect(() => {
    const fetchData = async () => {
      console.log("AQ",id)
      if(id){
        setLoadingOpen(true)
        
        const responseServices = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/agenct/' + id)
        const serviceData = await responseServices.json()
        console.log("SERVDATA",serviceData)
        setServices(serviceData)

        setLoadingOpen(false)
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'agency') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteService = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)


    setLoadingOpen(true)
    
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/agency/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)
    router.reload()
  }

  return (
    <Container >
      <div className="card services">
          <h3>Esta agência trabalha com:</h3>
          {services?.map((item) =>
                <p className="service" key={item.id}>
                  {item.service.title}
                  { sessionProfile && (
                  <Image onClick={ e => handleDeleteService(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                </p> 
          )}

          { sessionProfile ? (
            <Image onClick={() => addServiceSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
          ): ''}
      </div>
    </Container>
  ) 
}