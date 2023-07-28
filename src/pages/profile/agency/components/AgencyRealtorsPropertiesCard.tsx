import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
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
import { AgencyProfile } from "@/types/AgencyProfile"

const Container = styled.div`
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
`

export default function AgencyRealtorsPropertiesCard({agency}:any){

  const [properties, setProperties ] = useState<any>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const [prop,setProp] = useState([])

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  

  useEffect(() => {
    const allProperties = agency.Partnerships.map((part:any)=> part.Realtor)
    const agencyRealtors = allProperties.map((item:any)=> {
        console.log(item)
        return {name:item.firstName,lastName:item.lastName, id:item.id, properties:item.Properties}
    })
    const agencyRealtorsProperties: any = []
    for(let i = 0; i< agencyRealtors.length;i++){
        for(let j = 0; j< agencyRealtors[i].properties.length;j++){
            agencyRealtorsProperties.push({
                ...agencyRealtors[i].properties[j],
                realtorLastName:agencyRealtors[i].lastName,
                realtorId:agencyRealtors[i].id,
                realtorName:agencyRealtors[i].name
            })
        }
    }

    setProperties(agencyRealtorsProperties)
  }, [])
  
  return (
    <Container >
      <div className="card properties">
        <h2>Imóveis</h2>
        <div className="list">
          {properties?.map((item:any) => (
            <div key={item.id} className="propertie">
                <Image className="property-img" src={item.profilePicture} width={200} height={100} alt="profile picture"/>
                <div>
                    <span>Consultor(a): </span>
                    <a className="special-link" onClick={()=>router.push(`/profile/realtor/${item.realtorId}`)}>
                        {`${item.realtorName} ${item.realtorLastName}`}
                    </a>
                </div>
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
    </Container>
  ) 
}