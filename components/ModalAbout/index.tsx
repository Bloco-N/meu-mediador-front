import api from "@/services/api";
import { AddCourseForm } from "@/types/AddCourseForm";
import { EditAboutForm } from "@/types/EditAboutForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { RealtorProfile } from "@/types/RealtorProfile";
import { error } from "console";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as S from "./styles"


type AboutEditModalProps = {
  open?: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AboutEditModal = ({open, setOpen}: AboutEditModalProps) => {

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const { register, handleSubmit } = useForm<EditAboutForm>()

  const [introduction, setIntroduction] = useState('')

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const fetchData = async () => {

      const localId = localStorage.getItem('id')
      const accountType = localStorage.getItem('accountType')
      if(localId && accountType){
        await api.get(`/${accountType}/${localId}`)
        .then((response) => {
          const data = response.data
          setIntroduction(accountType==="agency"?data.description : data.introduction)
        })
        .catch((error) => {
          toast.error(t.toast.dataError)
        })
      }
    }
    fetchData()
  }, [])

  const onSubmit = async (data: EditAboutForm) => {
    const accountType = localStorage.getItem('accountType')
    const realtorBody = {introduction: data.introduction}
    const agencyBody = {description: data.introduction}
    setLoadingOpen(true)
  
    await api.put(`/${accountType}/` , accountType==="agency"? agencyBody : realtorBody)
    .then((response) =>{
      toast.success(t.toast.dataSuccess)
      setLoadingOpen(false)
      router.reload()
    })
    .catch((error) => {
      toast.error(t.toast.dataError)
      setLoadingOpen(false)
    })
  }

  return (
    <S.Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h2>{t.aboutEditModal.whoIsYou}</h2>
        <textarea {...register('introduction')} defaultValue={introduction ? introduction : ''} placeholder={t.aboutEditModal.putYourDescriptionHere}/>
        <p onClick={() => setOpen(false)}>X</p>
        <button className="button" type="submit"> {t.aboutEditModal.edit} </button>
      </form>
    </S.Container>
  );
};

export default AboutEditModal
