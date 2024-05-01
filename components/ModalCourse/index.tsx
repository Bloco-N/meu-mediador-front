import api from "@/services/api";
import { AddCourseForm } from "@/types/AddCourseForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { error } from "console";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as S from './styles'



type AddCourseModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCourseModal = ({ setOpen}: AddCourseModalProps) => {

  const { register, handleSubmit } = useForm<AddCourseForm>()

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data: AddCourseForm) => {

    const localId = localStorage.getItem('id')
    setLoadingOpen(true)
    await api.post('/course', {
      name: data.name,
      realtorId: Number(localId)
    })
    .then((response) => {
      if(response.data === 'created'){
        setOpen(false);
        toast.success(t.toast.addCourse);
        setLoadingOpen(false);
      }
    })
    .catch((error) => {
      toast.error(t.toast.errorAddCourse)
    })

  }

  return (
    <S.Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addStudy.createStudy}</h3>
        <input  {...register('name', {required: true})}  placeholder={t.addStudy.title} type="text" />
        <p onClick={() => setOpen(false)}>X</p>
        <button className="button" type="submit"> {t.addStudy.create} </button>
      </form>
    </S.Container>
  );
};

export default AddCourseModal
