import { SignInForm } from "@/types/SignInForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form{
    text-align: center;
    width: 30%;
    height: 45rem;
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
  .login-as{
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    p{
      font-size: 1.3rem;
    }
  }
`

const SignIn = () => {

    const { register, handleSubmit } = useForm<SignInForm>()

    const router = useRouter()

    const onSubmit = async (data:SignInForm) => {

      const fetchData = async () => {

        const { accountType, ...body } = data
        
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/' + accountType + '/sign-in', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        const token = await response.text()
        localStorage.setItem('token', token)
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
          <div className="login-as">
            <p>Entrando como:</p>
            <select id="account-type"
            {...register('accountType', {required: true})}>
              <option value="client">Cliente</option>
              <option value="realtor">Consultor</option>
              <option value="agency">Agência</option>
            </select>
          </div>

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