import { AddAwardForm } from "@/types/AddAwardForm";
import { AddPartnershipForm } from "@/types/AddPartnershipForm";
import { AgencyProfile } from "@/types/AgencyProfile";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form{
    position: relative;
    height: 50rem;
    width: 40%;
    padding-top: 4rem;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    h3{
      margin-bottom: 4rem;
    }
    div{
      display: flex;
      gap: 2rem;
      width: 80%;
      justify-content: center;
      
    }
    input[type='text']{
      width: 80%;
    }
    @media (max-width: 800px) {
      width: 80%;
    }
    @media (max-width: 500px) {
      height: 58rem;
    }
    .dates-inputs{
      @media (max-width: 500px) {
        flex-direction: column;
        width: 60%;
      }
    }
  }
  p{
    cursor: pointer;
    position: absolute;
    top: 3rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
  }
`

type AddServiceModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddPartnershipModal = ({open, setOpen}: AddServiceModalProps) => {

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const [workHere, setWorkHere] = useState(false)

  const { register, handleSubmit } = useForm<AddPartnershipForm>()

  const [agencies, setAgencies] = useState<AgencyProfile []>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const endInput = document.getElementById('end') as HTMLInputElement;
    if(endInput){
      endInput.value = ""
    }
  }, [workHere])

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/agency/no-pagination`)
      const json = await response.json()
      setAgencies(json)
    }

    fetchData()

  }, [])

  const onSubmit = async (data: AddPartnershipForm) => {

    const localId = localStorage.getItem('id')

    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/partnership', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        realtorId: Number(localId)
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const text = await response.text()
    setLoadingOpen(false)
    if(text === 'updated') router.reload()

  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addPartnership.addExperience}</h3>
        <input {...register( 'title', {required: true})} placeholder={t.addPartnership.jobTitle} type="text" />
        <input list="agencies" {...register( 'agency', {required: true})} placeholder={t.addPartnership.company} type="text" />
        <datalist id="agencies">
          {agencies?.map(item => (
            <option key={item.id} value={item.name}/>
          ))}
        </datalist>
        <div className="dates-inputs">          
          <input  {...register('init', {required:true})} type="date" />
          <input {...register('end')} id="end" disabled={workHere} type="date" />
        </div>
        <div>
          <label htmlFor="active">{t.addPartnership.currentJob}</label>
          <input onChange={() => setWorkHere(!workHere)} id="active" type="checkbox" />
        </div>
        <p onClick={() => setOpen(false)}>X</p>
        <button type="submit"> {t.addPartnership.create} </button>
      </form>
    </Container>
    : <></>
  );
};

export default AddPartnershipModal