import api from "@/services/api";
import { AddAwardForm } from "@/types/AddAwardForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as S from './styles'

type AddAwardModalProps = {
  open?: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddAwardModal = ({open, setOpen}: AddAwardModalProps) => {

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const { register, handleSubmit } = useForm<AddAwardForm>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data: AddAwardForm) => {
    const localId = localStorage.getItem('id')
    setLoadingOpen(true)
    await api.post("/award" , {
      title: data.title,
      realtorId: Number(localId)
    })
    .then((response) => {
      if(response.data === 'created') {
        toast.success(t.toast.prizeCreated);
        setLoadingOpen(false);
        setOpen(false)
      }
    })
    .catch((error) => {
      toast.success(t.toast.errorAward)
    })
   
  }

  return (
    <S.Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addAwards.createAward}</h3>
        <input  {...register('title', {required: true})}  placeholder={t.addAwards.title} type="text" />
        <p onClick={() => setOpen(false)}>X</p>
        <button className="button" type="submit"> {t.addAwards.create} </button>
      </form>
    </S.Container>
  );
};

export default AddAwardModal
