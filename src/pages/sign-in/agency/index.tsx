import { SignInForm } from "@/types/SignInForm";
import UserContext from "context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { UserContextType } from "types/UserContextType";

const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form{
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

    const router = useRouter()

    const onSubmit = async (data:SignInForm) => {

      const fetchData = async () => {
        
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency' + '/sign-in', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        const token = await response.text()
        localStorage.setItem('token', token)
        setUser({token})
        router.push('/')

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

          {/* <Link className="forgot-password" href="/forgot-password">Esqueci minha senha</Link> */}

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