import api from "@/services/api";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";

const ForgotPasswordContainer = styled.div`
  form{
    height: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2rem;
    h4{
      font-size: 1.3rem;
    }
    h2{
      margin-bottom: 2rem;
    }
    padding: 2rem 3rem;
  }
`

const RecoverPassword = () => {

  const { register, handleSubmit } = useForm<{password:string, confirmPassword:string}>()

  const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { token } = router.query

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data:{password:string, confirmPassword:string}) => {

    if(data.password !== data.confirmPassword) return;
    setLoadingOpen(true)
    await api.put('/realtor/recover-password/update-password', {password: data.password})
    .then((response) => {
      toast.success(t.toast.updatePassword)
      if(response.data === 'updated') router.push('/sign-in/realtor')
      setLoadingOpen(false)
    })
    .catch((error) => {
      toast.error(t.toast.errorUpdatePassword)
      setLoadingOpen(false)
      return error
    })
  }

    return (
      <div className="container">
      <ForgotPasswordContainer className="card">

        <form onSubmit={handleSubmit(onSubmit)}  action="">

          <h2>{t.forgotPassword.recoverPassword}</h2>

          <input {...register('password', {required: true})} className="input-forgot-password" type="password" placeholder={t.signIn.password} />
          <input {...register('confirmPassword', {required: true})} className="input-forgot-password" type="password" placeholder={t.signUp.confirmPassword} />

          <button className="forgotPasswordButton">{t.forgotPassword.send}</button>

        </form>


      </ForgotPasswordContainer>
      </div>
    );
};

export default RecoverPassword;