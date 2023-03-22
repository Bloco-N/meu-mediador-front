import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import MainInfo from "components/MainInfo"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import plusIcon from '@/../public/plus.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddPropertyModalContext from "context/AddPropertyModalContext"
import { Property } from "@/types/Property"
import Link from "next/link"
import { Service } from "@/types/Service"
import AddServiceModalContext from "context/AddServiceModalContext"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;
  .services{
    height: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 2rem;
    gap: 2rem;
    .service{
      background-color: var(--base);
      padding: 1rem;
      border-radius: 1rem;
      position: relative;
      display: flex;
      align-items: center;
      gap: 2rem;
      .close{
        position: relative;
      }
    }
  }
  .properties{
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem;
    .list{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      gap: 2rem;
      .plus{
        cursor: pointer;
        height: 3rem;
        width: 3rem;
        position: absolute;
        top: 3rem;
        right: 3rem;
      }
      .propertie{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--base);
        padding: 2rem;
        border-radius: 1rem;
        width: 40rem;
        position: relative;
        .close{
          position: absolute;
          right: 1rem;
        }
        .special-link{
          width: 12rem;
        }
      }
    }
  }
`

export default function Profile(){

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [properties, setProperties ] = useState<Property []>()

  const [services, setServices] = useState<Service []>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const { setOpen: addServiceSetOpen } = useContext(AddServiceModalContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + id)
      const data = await response.json()
      setRealtor(data)

      const responseProperties = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/realtor/' + id)
      const propertiesData = await responseProperties.json()
      setProperties(propertiesData)

      const responseServices = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/realtor/' + id)
      const serviceData = await responseServices.json()
      console.log(serviceData)
      setServices(serviceData)

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId)) setSessionProfile(true)

    fetchData()

  }, [id, user.id])

  const handleDeleteProperty = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    router.reload()

  }

  const handleDeleteService = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    router.reload()

  }



  return (
    <Container>
      <MainInfo realtor={realtor as RealtorProfile} isProfile={true}/>
      <div className="services card">
          <h3>Este consultor trabalha com:</h3>
          {services?.map((item) =>
                <p className="service" key={item.id}>
                  {item.title}
                  { sessionProfile && (
                  <Image onClick={ e => handleDeleteService(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                </p> 
          )}

          { sessionProfile ? (
            <Image onClick={() => addServiceSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
          ): ''}
      </div>

      <div className="card properties">
        <h2>Imóveis</h2>
        <div className="list">
          {properties?.map(item => (
            <div key={item.id} className="propertie">
                { sessionProfile && (
                  <Image onClick={ e => handleDeleteProperty(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                <h3>{item.title}</h3>
                <p className="elipses">
                  {item.description}
                </p>
                <Link className="special-link" href={item.link} target='_blank'>
                  Conferir Imóvel
                </Link>
              </div>

          ))}
          { sessionProfile ? (
          <Image onClick={() => addPropertySetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
      ): ''}
        </div>
      </div>
    </Container>
  )
}