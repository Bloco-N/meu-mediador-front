import { SignUpForm } from "@/types/SignUpForm";
import locales from "locales";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";

const SignUpContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;

  form{
    @media only screen and (max-width: 900px){
      width: 60%;
    }
    @media only screen and (max-width: 500px){
      width: calc(100% - 30px);
      padding: 3rem 2rem;
      gap: 3rem;
    }
    width: 30%;
    min-height: 55rem;
    margin: 0 auto;
    padding: 3rem 3.5rem;
    gap: 2.5rem;

    .full-name{
      width: 100%;
      display: flex;
      gap: 2rem;
      /* flex-direction: column; */
    }
    .check_box{
      all: revert !important;
    }
    button:disabled,
    button[disabled]{
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    }
    span{
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    padding: 0 37px;

    .card {
      width: 100%;
      min-height: 363px;
      gap: 26px;
      padding: 25px 27px 16px 27px;

      .full-name {
        gap: 18px;
      }

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
    }
  }
`

const SignUp = () => {

  const { register, handleSubmit } = useForm<SignUpForm>()
  const [privacy_policy, setPrivacyPolicy] = useState(false);

  const [cadastroExiste, setCadastroExiste] = useState(false);

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onPrivacyClick = () =>{
    setPrivacyPolicy(!privacy_policy);
  }



  const onSubmit = async (data: SignUpForm) => {

    setCadastroExiste(false);

    const fetchData = async () => {

      if(data.password !== data.confirmPassword) return

      const { confirmPassword, ...body} = data

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/client/sign-up', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })

      if(response.ok) {
        router.push('/sign-in/client')
      }
      else {
        if (response.status == 400){
          console.log("Cliente já cadastrado")
          alert("Cliente já cadastrado com esse e-mail")
          setCadastroExiste(true);
        }
      }

    }

    await fetchData()
  }
  
    return (

      <SignUpContainer>

        <form className="card" onSubmit={handleSubmit(onSubmit)}>

          <h2>{t.signUp.signUp}</h2>

          <div className="full-name">
              <input type="text" className="input-name" placeholder={t.mainInfoEditModal.name}
              {...register('firstName', {required:true, })} />
              <input type="text" className="input-name" placeholder={t.mainInfoEditModal.lastName}
              {...register('lastName', {required: true})} />
          </div>

          <input className="input-sign-up" type="email" placeholder={t.signIn.email}
          {...register('email', {required:true})}/>
          {
            cadastroExiste ? <label style={{color:"red"}}>Cadastro já existe com esse email</label> : <></>
          }
          <input className="input-sign-up" type="password" placeholder={t.signIn.password}
          {...register('password', {required:true})}/>
          <input className="input-sign-up" type="password" placeholder={t.signUp.confirmPassword}
          {...register('confirmPassword', {required:true})}/>
         
          <span className="txt-center"> <input type="checkbox" className="check_box" checked={privacy_policy} onClick={onPrivacyClick}/>{t.signUp.check_police}</span>
          
          <button type="submit" disabled={!privacy_policy}>{t.signUp.signUp}</button>
          
        </form>
        
      </SignUpContainer>

    );
};

export default SignUp;