import { SignInForm } from "@/types/SignInForm";
import UserContext from "context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { decode } from "jsonwebtoken";
import { UserContextType } from "@/types/UserContextType";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import locales from "locales";
import { useState } from 'react'
import GoogleLoginButton from "components/ButtonAuth";
import iconGoogle from '../../../../public/icon-google.png'
import iconFacebook from '../../../../public/icons-facebook.png'
import { getSession, signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

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
      width: 80%;
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

    const { register, handleSubmit } = useForm<SignInForm>()

    const {data: session, status} = useSession()

    const { setUser } = useContext(UserContext) as UserContextType

    const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

    const [loginError, setLoginError] = useState(false)

    const router = useRouter()

    const locale = router.locale

    const t = locales[locale as keyof typeof locales]

    useEffect(() => {
      (async() => {
        console.log("Entrou")
        console.log(session, status , "Pedro")
        
        if (status === 'authenticated') {
          console.log("Entro2")
          await onSubmit(null);
        } else {
          const token = localStorage.getItem("token");
          if (token) {
            router.push("/");
          }
        }
      })()
  
    }, [router, session, status]);

    const onSubmit = async (data:SignInForm | null) => {

      const partesDoNome = session?.user?.name?.split(" ");
      const firstName = partesDoNome ? partesDoNome[0] : null;
     const lastName = partesDoNome?.slice(1).join(" ");
   
     const dataGoogle = {
       email: session?.user?.email,
       firstName:firstName,
       lastName: lastName

     }

     const urlFetch = process.env.NEXT_PUBLIC_API_URL + '/realtor' + '/sign-in'
     const urlFetchGoogle = process.env.NEXT_PUBLIC_API_URL + '/realtor' + '/sign-in' + '/google'
''

      const fetchData = async () => {
        try {
          setLoadingOpen(true)
          const response = await fetch(!data ? urlFetchGoogle : urlFetch, {
            method: 'POST',
            body: JSON.stringify(!data ? dataGoogle : data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })

          if(!response.ok){
            setLoginError(true)
            setLoadingOpen(false)
            return
          }
          const token = await response.text()
          localStorage.setItem('token', token)
          const user = decode(token) as { id:number, email:string, firstName: string, lastName: string}
          localStorage.setItem('id', String(user.id))
  
          const realtorResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + user.id)
  
          const realtorData = await realtorResponse.json()
  
          localStorage.setItem('pic', realtorData.profilePicture)
          localStorage.setItem('accountType', 'realtor')
  
          setUser({ token, id: user.id, profilePicture: realtorData.profilePicture, coverPicture: realtorData.coverPicture, accountType: 'realtor' })
          setLoadingOpen(false)

          if(realtorData.verified === false){
            router.push('/verify/realtor')
          }else{
            router.reload()
          }
          
        } catch (error) {
          console.log(error)
        }
        
        
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
          <Link className="forgot-password" href="/forgot-password/realtor">{t.signIn.forgot}</Link>

          <button>{t.signIn.enter}</button>

          <div className="orSeparator">
              <div className="borderTop"></div>
              <div className="orText">ou</div>
              <div className="borderTop"></div>
          </div>

          <GoogleLoginButton 
          icon={iconGoogle.src} 
          onClick={() => signIn("google", { callbackUrl: "https://www.meoagent.com/sign-in/realtor" })}
          text={t.signIn.google}
          />

          <GoogleLoginButton 
            icon={iconFacebook.src} 
            onClick={() => signIn("facebook", { callbackUrl: "https://www.meoagent.com/sign-in/realtor" })}
            text={t.signIn.facebook}
          />

          <div className="bottom-cta">
            <h5>{t.signIn.notHaveAnAccount} </h5>
            <Link className="create-account special-link" href="/sign-up/profile">{t.signIn.here}</Link>
          </div>
        </form>


      </SignInContainer>

    );
};


export const getServerSideProps:GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '//sign-in/realtor',
        permanent: false,
      },
    };
  }
  return {
    props:{
      session
    }
  }
}


export default SignIn;