import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  form{
    height: 30rem;
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

const ForgotPassword = () => {

  const { register, handleSubmit } = useForm<{email:string}>()

  const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const [sended, setSended] = useState(false)

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data:{email:string}) => {
    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor' + '/recover-password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })

    const text = await response.text()

    if(text === 'email sended') {
      setSended(true)
    }
    setLoadingOpen(false)
  }

    return (
      <ForgotPasswordContainer >

        <form className="card" onSubmit={handleSubmit(onSubmit)}  action="">

          <h2>{t.forgotPassword.recoverPassword}</h2>

          <input {...register('email', {required: true})} className="input-forgot-password" type="email" placeholder={t.signIn.email} />
          <h4>{t.forgotPassword.enterAnEmail}</h4>


          <button className="forgotPasswordButton">{t.forgotPassword.send}</button>

        </form>
        {sended && (
          <p>{t.forgotPassword.emailSent}</p>
        )}


      </ForgotPasswordContainer>
    );
};

export default ForgotPassword;