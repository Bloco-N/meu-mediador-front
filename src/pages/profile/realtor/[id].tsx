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
import CommentsCard from "./components/CommentsCard"
import PropertiesCard from "./components/PropertiesCard"
import { ApiService } from "@/services/ApiService"
import PartnershipCard from "./components/PartnershipCard"

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
  const apiService = new ApiService()

  useEffect(() => {
    const localStorageId = localStorage.getItem('id')
    const accountType = localStorage.getItem('accountType')
    console.log(accountType)

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
        //console.log("API INFORMATION")
        //console.log(id,accType)
  
        const data = await apiService.getRealtorInformation(id as string)
        setRealtor(data)
        //console.log("DATA INFO:",data)
        
        // const responseServices = await apiService.getRealtorServices(id as string)
        // console.log("SERVICES=",responseServices)
  
        // const responseProperties = await apiService.getRealtorProperties(id as string)
        // console.log("PROPERTIES=",responseProperties)
        
        // const responseAwards = await apiService.getRealtorAwards(id as string)
        // console.log("AWARDS=",responseAwards)

        // const responseCourses = await apiService.getRealtorCourses(id as string)
        // console.log("COURSES=",responseCourses)

        // const responseComments = await apiService.getRealtorComments(id as string)
        // console.log("COMMENTS=",responseComments)
  
        const responsePartnerships = await apiService.getRealtorPartnership(id as string)
        //console.log("PARTNERSHIP=",responsePartnerships)

        setLastExp({name: responsePartnerships[0]?.name, pic: responsePartnerships[0]?.pic })
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
      <PartnershipCard localId={localId} accType={accType}/>
      <CommentsCard localId={localId} accType={accType}/>
    </Container>
  ) 
}