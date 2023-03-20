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
import MainInfoProfileEditModalContext from "context/MainInfoProfileEditModalContext"
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddPropertyModalContext from "context/AddPropertyModalContext"
import { Property } from "@/types/Property"
import Link from "next/link"

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
        cursor: pointer;
      }
    }
  }
`

export default function Profile(){

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [properties, setProperties ] = useState<Property []>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + id)
      const data = await response.json()
      setRealtor(data)
      const responseProperties = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/' + id)
      const propertiesData = await responseProperties.json()
      setProperties(propertiesData)

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId)) setSessionProfile(true)

    fetchData()

  }, [id, user.id])

  return (
    <Container>
      <MainInfo realtor={realtor as RealtorProfile} isProfile={true}/>
      <div className="services card">
        <h3>Este consultor trabalha com:</h3>
        <p>Venda de Imoveis</p> |
        <p>Consulta</p> |
        <p>Orçamento</p>

        { sessionProfile ? (
          <Image className='edit-main' src={editIcon} alt='edit icon'/>
      ): ''}
      </div>

      <div className="card properties">
        <h2>Imóveis</h2>
        <div className="list">
          {properties?.map(item => (
          <Link id={String(item.id)} key={item.id} href={item.link} target='_blank'>
              <div className="propertie">
                <h3>{item.title}</h3>
                <p className="elipses">
                  {item.description}
                </p>
              </div>
          </Link>

          ))}
          { sessionProfile ? (
          <Image onClick={() => addPropertySetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
      ): ''}
        </div>
      </div>
    </Container>
  )
}