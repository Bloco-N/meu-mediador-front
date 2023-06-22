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
import agencyIcon from '@/../public/agency.svg'
import AddPartnershipModalContext from "context/AddPartnershipModalContext"
import { PartnershipList } from "@/types/PartnershipList"
import LoadingContext from "context/LoadingContext"

const Container = styled.div`
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
              div{
                display: flex;
                gap: 1rem;
              }
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
`

interface ExperiencesCardProps{
    localId:string;
    accType:string;
}

export default function ExperiencesCard({localId, accType}:ExperiencesCardProps){
  
  const [partnerships, setPartnerships] = useState<PartnershipList []>()

  const [indexPartnership, setIndexPartnership] = useState(-1)

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPartnershipOpen } = useContext(AddPartnershipModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)

        const responsePartnerships = await fetch(process.env.NEXT_PUBLIC_API_URL + '/partnership/realtor/' + id)
        const partnershipData = await responsePartnerships.json()
        setPartnerships(partnershipData)

        setLoadingOpen(false)
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'realtor') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeletePartnership = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/partnership/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleEditPartnership = (index:number) => {

    if(index === indexPartnership){
      setIndexPartnership(-1)
    } else {
      setIndexPartnership(index)
    }
    
  }

  return (
    <Container >
      <div className="card expiriences">
        <h2> Experiência </h2>
        { sessionProfile ? (
          <Image onClick={() => addPartnershipOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
        ): ''}
        <div className="list">
          {partnerships?.map((item, index) => (
            <div key={index} className="card work">
            { sessionProfile ? (
            <Image onClick={() => handleEditPartnership(index)} className='plus' src={editIcon} alt='edit icon'/>
          ): ''}
              <div className="header">
                <Image width={10} height={10} className="agency-img" src={item.pic ? item.pic : agencyIcon} alt="" />
                <div className="infos">
                {item.list.map((partnership) => (
                    <div key={partnership.id} className="position">
                      <div>
                        {sessionProfile && index === indexPartnership ?(
                            <Image onClick={e => handleDeletePartnership(e)} id={String(partnership.id)} className="close" src={closeIcon} alt="close icon"/>
                            ): ''}
                        <h3>{partnership.title}</h3>
                      </div>
                      <h4>{item.name}</h4>
                      <p>{partnership.workTime}</p>
                    </div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  ) 
}