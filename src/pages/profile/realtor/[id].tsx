import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import MainInfo from "components/MainInfo"
import UserContext from "context/UserContext"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import { LastExp } from "@/types/LastExp"
import LoadingContext from "context/LoadingContext"
import ConvertToPDF from "./components/ConvertToPDF"
import ServicesCard from "./components/ServicesCard"
import AboutCard from "./components/AboutCard"
import AwardsCard from "./components/AwardsCard"
import CoursesCard from "./components/CoursesCard"
import ExperiencesCard from "./components/ExperiencesCard"
import CommentsCard from "./components/CommentsCard"
import PropertiesCard from "./components/PropertiesCard"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;
  .plus{
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
  }
`

export default function Profile(){

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [lastExp, setLastExp] = useState<LastExp>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const [localId, setLocalId] = useState('')

  const [accType, setAccType] = useState('')

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const localStorageId = localStorage.getItem('id')
    const accountType = localStorage.getItem('accountType')

    if(localStorageId){
      setLocalId(localStorageId)
    }
    if(accountType){
      setAccType(accountType)
    }
    
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)
        console.log("INFORMATIONNNNNNNNNNNNNNNNNNNNNNNNNn")
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + id)
        const data = await response.json()
        setRealtor(data)
        console.log("data=",data)
  
        const responseProperties = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/realtor/' + id)
        const propertiesData = await responseProperties.json()
        console.log("propertiesData=",propertiesData)

        const responseAwards = await fetch(process.env.NEXT_PUBLIC_API_URL + '/award/realtor/' + id)
        const awardsData = await responseAwards.json()
        console.log("awardsData=",awardsData)

        const responseCourses = await fetch(process.env.NEXT_PUBLIC_API_URL + '/course/realtor/' + id)
        const coursesData = await responseCourses.json()
        console.log("coursesData=",coursesData)
  
        const responseServices = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/realtor/' + id)
        const serviceData = await responseServices.json()
        console.log("serviceData=",serviceData)

        const responsePartnerships = await fetch(process.env.NEXT_PUBLIC_API_URL + '/partnership/realtor/' + id)
        const partnershipData = await responsePartnerships.json()
        console.log("partnershipData=",partnershipData)

        const responseComments = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/realtor/' + id)
        const commentData = await responseComments.json()
        console.log("commentData=",commentData)

        setLastExp({name: partnershipData[0]?.name, pic: partnershipData[0]?.pic })
        console.log("lastExp=",{name: partnershipData[0]?.name, pic: partnershipData[0]?.pic })
        setLoadingOpen(false)
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'realtor') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  return (
    <Container>
      <ConvertToPDF localId={localId} accType={accType}/>
      <MainInfo isRealtor={true} lastExp={lastExp as LastExp} userSigned={realtor as RealtorProfile} isProfile={true}/>
      <ServicesCard localId={localId} accType={accType}/>
      <AboutCard localId={localId} accType={accType}/>
      <PropertiesCard localId={localId} accType={accType}/>
      <AwardsCard localId={localId} accType={accType}/>
      <CoursesCard localId={localId} accType={accType}/>
      <ExperiencesCard localId={localId} accType={accType}/>
      <CommentsCard localId={localId} accType={accType}/>
    </Container>
  ) 
}