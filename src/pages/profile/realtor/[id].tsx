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
import AddServiceModalContext from "context/AddServiceModalContext"
import { RealtorService } from "@/types/RealtorService"
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes"
import Rooms, { TRooms } from "@/types/Rooms"
import Preservations, { TPreservations } from "@/types/Preservations"
import agencyIcon from '@/../public/agency.svg'
import { timeSince } from "@/utils/timeSince"
import AddAwardModalContext from "context/AddAwardModalContext"
import AddPartnershipModalContext from "context/AddPartnershipModalContext"
import { Award } from "@/types/Award"
import AddCourseModalContext from "context/AddCourseModalContext"
import { Course } from "@/types/Course"
import AboutEditModal from "components/AboutEditModal"
import AboutEditModalContext from "context/AboutEditModalContext"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;
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
  .plus{
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
  }
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
  .properties{
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem;
    position: relative;
    .list{
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 2rem;
      scroll-snap-type: x mandatory;
      padding: 1rem;
      overflow: auto;
      .plus{
        cursor: pointer;
        height: 3rem;
        width: 3rem;
        position: absolute;
        top: 3rem;
        right: 3rem;
      }
      .propertie{
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
        .footer{
          display: flex;
          justify-content: space-between;
          .sub-text{
            font-style: italic;
          }
        }
        h2{
          color: var(--surface-2);
        }
        h3{
          color: var(--surface-2);
        }
        .property-img{
          margin-top: 3rem;
          object-fit: cover;
          opacity: 1;
          border-radius: 3rem;
          width: 100%;
          height: 100%;
          max-height: 25rem;
        }
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
  .expiriences{
    align-items: flex-start;
    padding: 3rem;
    position: relative;
    gap: 2rem;
    .list{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .work{

        @media only screen and (max-width: 1000px){
          width: 100%;
        }
        @media only screen and (max-width: 500px){
          padding: 5rem;
        }
        position: relative;
        width: 80%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 2rem;
        background-color: var(--base);
        .header{
          display: flex;
          gap: 2rem;
          .infos{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .position{
              display: flex;
              flex-direction: column;
              gap: 1rem;
              h4{
                font-size: 1.6rem;
                margin-left: 1rem;
              }
              p{
                font-size: 1.2rem;
                margin-left: 1rem;
                font-style: italic;
              }
            }
          }
        }
        .agency-img{
          height: 10rem;
          width: auto;
        }
      }
    }
  }

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

export default function Profile(){

  const [elip, setElip] = useState(true)

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [properties, setProperties ] = useState<Property []>()

  const [services, setServices] = useState<RealtorService []>()

  const [awards, setAwards] = useState<Award []>() 

  const [courses, setCourses] = useState<Course []>()

  const [editAwards, setEditAwards] = useState(false)

  const [editCourses, setEditCourses] = useState(false)

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const { setOpen: addServiceSetOpen } = useContext(AddServiceModalContext) as ModalOpenContextType
  
  const { setOpen: addAwardSetOpen } = useContext(AddAwardModalContext) as ModalOpenContextType

  const { setOpen: addCourseSetOpen } = useContext(AddCourseModalContext) as ModalOpenContextType

  const { setOpen: addPartnershipOpen } = useContext(AddPartnershipModalContext) as ModalOpenContextType
  
  const { setOpen: aboutEditOpen } = useContext(AboutEditModalContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      if(id){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + id)
        const data = await response.json()
        setRealtor(data)
  
        const responseProperties = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/realtor/' + id)
        const propertiesData = await responseProperties.json()
        setProperties(propertiesData)

        const responseAwards = await fetch(process.env.NEXT_PUBLIC_API_URL + '/award/realtor/' + id)
        const awardsData = await responseAwards.json()
        setAwards(awardsData)

        const responseCourses = await fetch(process.env.NEXT_PUBLIC_API_URL + '/course/realtor/' + id)
        const coursesData = await responseCourses.json()
        setCourses(coursesData)
  
        const responseServices = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/realtor/' + id)
        const serviceData = await responseServices.json()
        setServices(serviceData)
      }

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
    if(text === 'deleted') router.reload()

  }

  const handleDeleteAward = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/award/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleDeleteCourse = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/course/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleDeleteService = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/realtor/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }



  return (
    <Container>
      <MainInfo realtor={realtor as RealtorProfile} isProfile={true}/>
      <div className="card services">
          <h3>Este consultor trabalha com:</h3>
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


      <div className="card properties">
        <h2>Imóveis</h2>
        <div className="list">
          {properties?.map(item => (
            <div key={item.id} className="propertie">
                { sessionProfile && (
                  <Image onClick={ e => handleDeleteProperty(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                <Image className="property-img" src={item.profilePicture} width={200} height={100} alt="profile picture"/>
                <h2>{item.price}</h2>
                <h3>{item.title}</h3>
                <p className="sub-text">
                  {PropertyTypes[item.propertyType as keyof TPropertyTypes]} {Rooms[item.rooms as keyof TRooms]} {item.grossArea} de Área Bruta e {item.usefulArea} de Área Útil, {Preservations[item.preservation as keyof TPreservations]}.
                </p>
                <div className="footer">
                  <Link className="special-link" href={item.link} target='_blank'>
                    Conferir Imóvel
                  </Link>
                  <p className="sub-text">
                    {timeSince(new Date(item.createdAt))}
                  </p>
                </div>
              </div>

          ))}
          { sessionProfile ? (
          <Image onClick={() => addPropertySetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
      ): ''}
        </div>
      </div>

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

      <div className="card awards">
        <h2>Cursos e Especializações</h2>
        { sessionProfile ? (
          <div className="edit-icons">
            <Image onClick={() => setEditCourses(!editCourses)} className='plus' src={editIcon} alt='edit icon'/>
            <Image onClick={() => addCourseSetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
          </div>
        ): ''}
        <ul>
          {courses?.map(item => (
              <li key={item.id}>
                {sessionProfile && editCourses ? (
                  <Image onClick={e => handleDeleteCourse(e)} id={String(item.id)} className="close" src={closeIcon} alt="close icon"/>
                ): ''}
                {item.name}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="card expiriences">
        <h2> Experiência </h2>
        { sessionProfile ? (
          <Image onClick={() => addPartnershipOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
        ): ''}
        <div className="list">
          <div className="card work">
          { sessionProfile ? (
          <Image onClick={() => addPropertySetOpen(true)} className='plus' src={editIcon} alt='edit icon'/>
        ): ''}
            <div className="header">
              <Image className="agency-img" src={agencyIcon} alt="" />
              <div className="infos">
                <div className="position">
                  <h3>Cargo</h3>
                  <h4>Empresa ● Tempo Integral</h4>
                  <p>jul de 2022 - dez de 2022 · 6 meses</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card work">
          { sessionProfile ? (
          <Image onClick={() => addPropertySetOpen(true)} className='plus' src={editIcon} alt='edit icon'/>
        ): ''}
            <div className="header">
              <Image className="agency-img" src={agencyIcon} alt="" />
              <div className="infos">
                <div className="position">
                  <h3>Cargo</h3>
                  <h4>Empresa ● Tempo Integral</h4>
                  <p>jul de 2022 - dez de 2022 · 6 meses</p>
                </div>
                <div className="position">
                  <h3>Cargo 2</h3>
                  <h4>Empresa ● Tempo Integral</h4>
                  <p>jul de 2022 - dez de 2022 · 6 meses</p>
                </div>
                <div className="position">
                  <h3>Cargo 3</h3>
                  <h4>Empresa ● Tempo Integral</h4>
                  <p>jul de 2022 - dez de 2022 · 6 meses</p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

    </Container>
  )
}