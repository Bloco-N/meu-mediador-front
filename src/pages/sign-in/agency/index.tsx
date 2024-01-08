import { SignInForm } from "@/types/SignInForm";
import UserContext from "context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { decode } from "jsonwebtoken";
import { UserContextType } from "@/types/UserContextType";
import locales from "locales";
import { useState } from 'react'
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import GoogleLoginButton from "components/ButtonAuth";
import iconGoogle from '../../../../public/icon-google.png'
import iconFacebook from '../../../../public/icons-facebook.png'
import { getSession, signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import api from "@/services/api";
import { toast } from "react-toastify";

const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form{
    @media only screen and (max-width: 800px){
      width: 60%;
    }
    @media only screen and (max-width: 500px){
      width: 90%;

      .bottom-cta, h5, .forgot-password {
        font-size: 1.5rem;
      }
    }
    text-align: center;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
  }
  .bottom-cta{
    display: flex;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 37px;

    .card {
      width: 100%;
      min-height: 363px;
      gap: 18px;
      padding: 19px 27px 31px 27px;

      input {
        color: #3A2E2C;
        opacity: 1;
        font-weight: 600;
      }

      input::placeholder {
        opacity: .8;
        font-weight: 500;
        color: #3A2E2C;
      }

      input[type="email"]{
        margin-bottom: 19px;
      }
    }
  }
`

const SignIn = () => {

    const {data: session, status} = useSession()

    const { register, handleSubmit } = useForm<SignInForm>()

    const { setUser } = useContext(UserContext) as UserContextType

    const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

    const [loginError, setLoginError] = useState(false)

    const router = useRouter()

    const locale = router.locale

    const t = locales[locale as keyof typeof locales]

    useEffect(() => {
      const checkAndSubmit = async () => {
        if (status === 'authenticated') {
          await onSubmit(null);
        } else {
          const token = localStorage.getItem("token");
          if (token) {
            router.push("/");
          }
        }
      };
  
      checkAndSubmit();
    }, [router, status, session]);

    const onSubmit = async (data:SignInForm | null) => {
      
     const dataGoogle = {
       email: session?.user?.email,
       name: session?.user?.name
     }

      const urlFetch = '/agency/sign-in'
      const urlFetchGoogle ='/agency/sign-in/google'


      const fetchData = async () => {
          setLoadingOpen(true)
          await api.post(!data ? urlFetchGoogle : urlFetch, !data ? dataGoogle : data)
          .then(async (response) => {
            const token = response.data
            localStorage.setItem('token', token)
            const user = decode(token) as { id:number, email:string, name: string}
  
            localStorage.setItem('id', String(user.id))
    
            const agencyResponse = await api.get(`/agency/${user.id}`)
            const agencyData = agencyResponse.data
            
            localStorage.setItem('pic', agencyData.profilePicture)
            localStorage.setItem('accountType', 'agency')
    
            setUser({ token, id: user.id, profilePicture: agencyData.profilePicture, coverPicture: agencyData.coverPicture, accountType: 'agency' })
            setLoadingOpen(false)
            if(agencyData.verified === false){
              router.push('/verify/agency')
            }else{
              router.reload()
            }
            toast.success(`Seja bem vindo`);
          })
          .catch((error) => {
            setLoginError(true)
            setLoadingOpen(false)
          })
      }
      
      await fetchData()
    }

    return (
      <SignInContainer>

        <form className="card" onSubmit={handleSubmit(onSubmit)}>

          <h2>{t.signIn.signIn}</h2>

          <input className="input-sign-up" type="email" placeholder={t.signIn.email}
          {...register('email', {required: true})} />
          <input className="input-sign-up" type="password" placeholder={t.signIn.password}
          {...register('password', {required: true})}/>

          {loginError && (
            <p className="text-error">
              {t.signIn.error}
            </p>
          )}

          <Link className="forgot-password" href="/forgot-password/agency">{t.signIn.forgot}</Link>

          <button>{t.signIn.enter}</button>

          <div className="orSeparator">
              <div className="borderTop"></div>
              <div className="orText">ou</div>
              <div className="borderTop"></div>
          </div>

          <GoogleLoginButton 
          icon={iconGoogle.src} 
          onClick={() => signIn("google", { callbackUrl: "https://www.meoagent.com/sign-in/agency" })}
          text={t.signIn.google}
          />

          <GoogleLoginButton 
            icon={iconFacebook.src} 
            onClick={() => signIn("facebook", { callbackUrl: "https://www.meoagent.com/sign-in/agency" })}
            text={t.signIn.facebook}
          />

          <div className="bottom-cta">
            <h5>{t.signIn.notHaveAnAccount}</h5>
            <Link className="create-account special-link" href="/sign-up/profile">{t.signIn.here}</Link>
          </div>
        </form>


      </SignInContainer>

    );
};

export const getServerSideProps:GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props:{
      session
    }
  }
}

export default SignIn;