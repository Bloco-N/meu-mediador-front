import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import { Property } from "@/types/Property"
import { RealtorService } from "@/types/RealtorService"
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes"
import Rooms, { TRooms } from "@/types/Rooms"
import Preservations, { TPreservations } from "@/types/Preservations"
import { Award } from "@/types/Award"
import { Course } from "@/types/Course"
import LoadingContext from "context/LoadingContext"
import jsPDF from "jspdf"

const Container = styled.button`
    width: 10%;
    margin-left: auto;
    font-size: 1.3rem;
`
interface ConvertToPDFProps{
    localId:string;
    accType:string;
}
export default function ConvertToPDF({localId, accType}:ConvertToPDFProps){

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [properties, setProperties ] = useState<Property []>()

  const [services, setServices] = useState<RealtorService []>()

  const [awards, setAwards] = useState<Award []>() 

  const [courses, setCourses] = useState<Course []>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)
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

        setLoadingOpen(false)
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'realtor') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])


  function dottedLine(doc:jsPDF, xFrom:number, yFrom:number, xTo:number, yTo:number, segmentLength:number){
    // Calculate line length (c)
    var a = Math.abs(xTo - xFrom);
    var b = Math.abs(yTo - yFrom);
    var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

    // Make sure we have an odd number of line segments (drawn or blank)
    // to fit it nicely
    var fractions = c / segmentLength;
    var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

    // Calculate x, y deltas per segment
    var deltaX = adjustedSegmentLength * (a / c);
    var deltaY = adjustedSegmentLength * (b / c);

    var curX = xFrom, curY = yFrom;
    while (curX <= xTo && curY <= yTo)
    {
        doc.line(curX, curY, curX + deltaX, curY + deltaY);
        curX += 2*deltaX;
        curY += 2*deltaY;
    }
  }

  const handleConvertToPDF = () => {
    const doc = new jsPDF()
    doc.setFillColor('#e8e8e8')
    doc.rect(0, 0, 1000, 1000, 'F');
    doc.setTextColor('#454545');
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(23)
    doc.text(`${realtor?.firstName} ${realtor?.lastName}`, 20, 20)
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(13)
    doc.text(`Atua em: ${realtor?.RealtorCities.map(city => ` ${city.City.name}`)}`, 25, 30)
    doc.text(`Experiencia: ${realtor?.expTime} anos`, 25, 40)
    doc.text(`Idiomas: ${realtor?.RealtorLanguages.map(languages => ` ${languages.Language.name}`)}`, 25, 50)
    doc.text(`Email: ${realtor?.email}`, 25, 60)
    doc.text(`Telefone: ${realtor?.phone}`, 25, 70)
    dottedLine(doc, 20, 80, 180, 80, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Serviços: `, 20, 100)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    services?.forEach((service, index) => {
      doc.text(`${service.service.title}`, 25, 100 + ((index + 1) * 10))
    })
    const height1 = 100 + ((services?.length as number + 1) * 10)
    dottedLine(doc, 20, height1, 180, height1, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Imóveis: `, 20, height1 + 20)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    doc.setTextColor('#2e6b89')
    properties?.forEach((propertie, index) => {
      doc.textWithLink(`${propertie.title}: ${PropertyTypes[propertie.propertyType as keyof TPropertyTypes]} ${Rooms[propertie.rooms as keyof TRooms]} ${propertie.grossArea} de Área Bruta e ${propertie.usefulArea} de Área Útil,\n${Preservations[propertie.preservation as keyof TPreservations]}`, 25, height1 + 20 + ((index + 1) * 15), {url: propertie.link})
    })
    doc.addPage()
    doc.setFillColor('#e8e8e8')
    doc.rect(0, 0, 1000, 1000, 'F');
    doc.setTextColor('#454545');
    const height = 0
    dottedLine(doc, 20, height, 180, height, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Prêmios e Distinções: `, 20, height + 20)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    awards?.forEach((award, index) => {
      doc.text(`${award.title}`, 25, height + 30 + (index * 10))
    })
    const height2 = height + 30 + (awards?.length as number * 10)
    dottedLine(doc, 20,  height2, 180, height2, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Cursos e Especializações: `, 20, height2 + 20)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    courses?.forEach((course, index) => {
      doc.text(`${course.name}`, 25, height2 + 30 + (index * 10))
    })
    doc.save(`${realtor?.firstName}-${realtor?.lastName}-profile.pdf`.toLowerCase())
  }

  return (
    <>
      {sessionProfile && (
        <Container onClick={handleConvertToPDF}>Converter Perfil em PDF</Container>
      )}
    </>
  ) 
}