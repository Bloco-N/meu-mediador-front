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
import { GetServerSideProps } from "next";
import {getSession, signIn,useSession} from 'next-auth/react'
import GoogleLoginButton from '../../../../components/ButtonAuth'
import iconGoogle from '../../../../public/icon-google.png'
import iconFacebook from '../../../../public/icons-facebook.png'

const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    @media only screen and (max-width: 800px) {
      width: 60%;
    }
    @media only screen and (max-width: 500px) {
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

  .bottom-cta {
    display: flex;
    gap: 0.5rem;

    @media only screen and (max-width: 400px) {
      flex-direction: column;
      align-items: center;

      h5,
      .create-account {
        margin-top: 0.5rem; /* Adicione espaçamento entre os elementos em um layout de coluna, se necessário */
      }
    }
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
        opacity: 0.8;
        font-weight: 500;
        color: #3A2E2C;
      }

      input[type="email"] {
        margin-bottom: 19px;
      }
    }
  }
`;

const SignIn = () => {

    const { data: session, status } = useSession();

    const { register, handleSubmit } = useForm<SignInForm>()

    const { setUser } = useContext(UserContext) as UserContextType

    const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

    const [loginError, setLoginError] = useState(false)

    const router = useRouter()

    const locale = router.locale

    const t = locales[locale as keyof typeof locales]
   
    useEffect(() => {
      console.log("Entrou")
      const checkAndSubmit = async () => {
        if (status === 'authenticated') {
          console.log("Entro2")
          await onSubmit(null);
        } else {
          const token = localStorage.getItem("token");
          if (token) {
            router.push("/");
          }
        }
      };
  
      checkAndSubmit();
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

        const urlFetch = process.env.NEXT_PUBLIC_API_URL + '/client' + '/sign-in'
        const urlFetchGoogle = process.env.NEXT_PUBLIC_API_URL + '/client' + '/sign-in' + '/google'

      const fetchData = async () => {
        
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
        console.log(user.id, "Id do usuario")
        localStorage.setItem('id', String(user.id))

        const clientResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/client/' + user.id)
    
        const clientData = await clientResponse.json()

        localStorage.setItem('accountType', 'client')

        setUser({ token, id: user.id, profilePicture: null, coverPicture: null, accountType: 'client' })
        setLoadingOpen(false)

        if(clientData.verified === false){
          router.push('/verify/client')
        }else{
          router.reload()
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

          <Link className="forgot-password" href="/forgot-password/client">{t.signIn.forgot}</Link>

          <button>{t.signIn.enter}</button>

          <div className="orSeparator">
              <div className="borderTop"></div>
              <div className="orText">ou</div>
              <div className="borderTop"></div>
          </div>

          <GoogleLoginButton 
          icon={iconGoogle.src} 
          onClick={() => signIn("google", { callbackUrl: "https://www.meoagent.com/sign-in/client" })}
          text={t.signIn.google}
          />

          <GoogleLoginButton 
            icon={iconFacebook.src} 
            onClick={() => signIn("facebook", { callbackUrl: "https://www.meoagent.com/sign-in/client" })}
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
    if (!session) {
      return {
        redirect: {
          destination: '/sign-in/client',
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