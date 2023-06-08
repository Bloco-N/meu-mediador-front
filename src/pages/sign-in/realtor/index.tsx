import { SignInForm } from "@/types/SignInForm";
import UserContext from "context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { decode } from "jsonwebtoken";
import { UserContextType } from "@/types/UserContextType";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";

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
`

const SignIn = () => {

    const { register, handleSubmit } = useForm<SignInForm>()

    const { setUser } = useContext(UserContext) as UserContextType

    const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if(token){
        router.push('/')
      }
    }, [router])

    const onSubmit = async (data:SignInForm) => {

      const fetchData = async () => {

        try {
          setLoadingOpen(true)
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor' + '/sign-in', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
  
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
          router.reload()
          
        } catch (error) {
          console.log(error)
        }
        
        
      }

      await fetchData()
    }

    return (
      <SignInContainer>

        <form className="card" onSubmit={handleSubmit(onSubmit)}>

          <h2>Login</h2>

          <input className="input-sign-up" type="email" placeholder="E-mail"
          {...register('email', {required: true})} />
          <input className="input-sign-up" type="password" placeholder="Senha" 
          {...register('password', {required: true})}/>

          <Link className="forgot-password" href="/forgot-password">Esqueci minha senha</Link>

          <button>Entrar</button>

          <div className="bottom-cta">
            <h5>Ainda não tem uma conta? </h5>
            <Link className="create-account special-link" href="/sign-up/profile">Cadastre-se aqui</Link>
          </div>
        </form>


      </SignInContainer>

    );
};

export default SignIn;