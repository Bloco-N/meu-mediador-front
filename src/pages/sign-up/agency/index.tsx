import { SignUpFormAgency } from "@/types/SignUpFormAgency";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SignUpContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form{
    @media only screen and (max-width: 900px){
      width: 60%;
    }
    @media only screen and (max-width: 500px){
      width: 80%;
    }
    width: 30%;
    height: 55rem;
    margin: auto;
    padding: 3rem 3.5rem;
    gap: 2.5rem;

    .full-name{
      display: flex;
      gap: 2rem;
    }

  }
`

const SignUp = () => {

  const { register, handleSubmit } = useForm<SignUpFormAgency>()
  const router = useRouter()

  const onSubmit = async (data:SignUpFormAgency) => {
    const fetchData = async () => {

      if(data.password !== data.confirmPassword) return

      const { confirmPassword, ...body} = data

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency/sign-up', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })

      if(response.ok) router.push('/sign-in/agency')

    }

    await fetchData()
  }
  
    return (

      <SignUpContainer>

        <form className="card" onSubmit={handleSubmit(onSubmit)}>

          <h2>Cadastro</h2>

          <input type="text" className="input-name" placeholder="Nome da Agência" 
          {...register('name', {required:true, })} />
          <input className="input-sign-up" type="email" placeholder="E-mail" 
          {...register('email', {required:true})}/>
          <input className="input-sign-up" type="password" placeholder="Senha" 
          {...register('password', {required:true})}/>
          <input className="input-sign-up" type="password" placeholder="Confirmar Senha"
          {...register('confirmPassword', {required:true})}/>

          <button type="submit">Cadastrar</button>

        </form>

      </SignUpContainer>

    );
};

export default SignUp;