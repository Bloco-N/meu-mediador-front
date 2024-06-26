import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { Img } from '@components/index';
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import plusIcon from '@/../public/plus.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddPropertyModalContext from "context/AddPropertyModalContext"
import { Property } from "@/types/Property"
import Link from "next/link"
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes"
import Rooms, { TRooms } from "@/types/Rooms"
import Preservations, { TPreservations } from "@/types/Preservations"
import { timeSince } from "@/utils/timeSince"
import LoadingContext from "context/LoadingContext"
import locales from "locales"
import api from "@/services/api"

const Container = styled.div`
  .properties{
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem;
    position: relative;
    text-align: left;
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
        text-align: left;
        @media only screen and (max-width: 400px){
          width: 25rem;
        }
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
`

interface PropertiesCardProps{
    localId:string;
    accType:string;
}

export default function PropertiesAgencyCard({localId, accType}:PropertiesCardProps){

  const [properties, setProperties ] = useState<Property []>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)
        await api.get(`/property/agency/${id}`)
        .then((response) => {
          setProperties(response.data)
          setLoadingOpen(false)
        })
        .catch((error) => {
          return error
        })
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'agency') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteProperty = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    await api.delete(`/property/agency/${id}`)
    .then((response) => {
      setLoadingOpen(false)
      if(response.data === 'deleted') router.reload()
    })
    .catch((error) => {
      setLoadingOpen(false)
    }) 
  }

  return (
    <Container >
      <div className="card properties">
        <h2>Imóveis da Agência</h2>
        <div className="list">
          {properties?.map(item => (
            <div key={item.id} className="propertie">
                { sessionProfile && (
                  <Img onClick={ e => handleDeleteProperty(e)} id={String(item.id)} className="close" file={closeIcon} alt='close icon'/>
                )}
                <Img 
                  className="property-img"
                  validateURL={!!item.profilePicture}
                  url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${item.profilePicture}`}
                  width={200}
                  height={100}
                  alt="profile picture"/>
                <h2>{item.price}</h2>
                <h3>{item.title}</h3>
                <p className="sub-text">
                  {PropertyTypes[locale as keyof typeof PropertyTypes][item.propertyType as keyof TPropertyTypes]} {Rooms[item.rooms as keyof TRooms]} {item.grossArea} de Área Bruta e {item.usefulArea} de Área Útil, {Preservations[locale as keyof typeof Preservations][item.preservation as keyof TPreservations]}.
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
          <Img onClick={() => addPropertySetOpen(true)} className='plus' file={plusIcon} alt='edit icon'/>
      ): ''}
        </div>
      </div>
    </Container>
  ) 
}