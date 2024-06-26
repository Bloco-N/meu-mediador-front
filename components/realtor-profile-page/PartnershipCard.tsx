import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { Img } from '@components/index';
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import plusIcon from '@/../public/plus.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import agencyIcon from '@/../public/agency.svg'
import { PartnershipList } from "@/types/PartnershipList"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales from "locales"
import { Modal, ModalPartneship} from ".."
import { useIsMobile } from "hooks";

const Container = styled.div`
  .expiriences{
    background-color: #fff;
    align-items: flex-start;
    padding: 3rem;
    position: relative;
    gap: 2rem;
    .list{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .plus{
        @media only screen and (max-width: 768px){
          position: absolute;
          top: 8px;
          right: 15px;
        }
      }

      .work{

        @media only screen and (max-width: 1000px){
          width: 100%;
        }
        @media only screen and (max-width: 510px){
          padding: 24px;
        }
        @media only screen and (max-width: 470px){
          padding: 20px;
        }
        @media only screen and (max-width: 420px){
          padding: 16px 10px;
        }
        @media only screen and (max-width: 400px){
          padding: 14px 8px;
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
              text-align: left;
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

              @media only screen and (max-width: 768px) {
                h4, p {
                  margin-left: 0px;
                }
              }
            }
          }
        }
        .agency-img{
          height: 10rem;
          width: 90px;
        }
      }
    }
  }
`

interface PartnershipCardProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
}

export default function PartnershipCard({localId, accType, sessionProfile}:PartnershipCardProps){

  const isMobile = useIsMobile()
  const [partnerships, setPartnerships] = useState<PartnershipList []>()
  const [open, setOpen] = useState(false)

  const childSizeModal = { width: "95%", height:isMobile ?  "20%" : "100%", radius: 10 }

  const [indexPartnership, setIndexPartnership] = useState(-1)

  const { user } = useContext(UserContext) as UserContextType

  // const { setOpen: addPartnershipOpen } = useContext(AddPartnershipModalContext) as ModalOpenContextType

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
        const partnershipData = await apiService.getRealtorPartnership(id as string)
        setLoadingOpen(false)

        setPartnerships(partnershipData)
      }

    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeletePartnership = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    const response = await apiService.deleteRealtorPartnership(token as string, id)
    setLoadingOpen(false)

    if(response === 'deleted') router.reload()
  }

  const handleEditPartnership = (index:number) => {

    if(index === indexPartnership){
      setIndexPartnership(-1)
    } else {
      setIndexPartnership(index)
    }
    
  }

  return (
    <>
    <Container>
      <div className="card expiriences">
        <h2>{t.partnership.partnership}</h2>
        { sessionProfile ? (
          <Img onClick={() => setOpen(true)} className='plus' file={plusIcon} alt='edit icon'/>
        ): ''}
        <div className="list">
          {partnerships?.map((item, index) => (
            <div key={index} className="card work">
            { sessionProfile ? (
            <Img onClick={() => handleEditPartnership(index)} className='plus' file={editIcon} alt='edit icon'/>
          ): ''}
              <div className="header">
                <Img width={10} height={10} className="agency-img" file={item.pic ? item.pic : agencyIcon} alt="" />
                <div className="infos">
                {item.list.map((partnership) => (
                    <div key={partnership.id} className="position">
                      <div>
                        {sessionProfile && index === indexPartnership ?(
                            <Img onClick={e => handleDeletePartnership(e)} id={String(partnership.id)} className="close" file={closeIcon} alt="close icon"/>
                            ): ''}
                        <h3>{partnership.title}</h3>
                      </div>
                      <h4>{item.name}</h4>
                      <p>{partnership.workTime[locale as keyof typeof partnership.workTime]}</p>
                    </div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
     <Modal isOpen={open} onClose={() => setOpen(false)} childSize={childSizeModal}>
      <ModalPartneship setOpen={setOpen}/>
    </Modal>
   </>
  ) 
}