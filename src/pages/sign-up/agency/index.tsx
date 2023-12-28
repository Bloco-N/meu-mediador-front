import { SignUpFormAgency } from "@/types/SignUpFormAgency";
import locales from "locales";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
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
    min-height: 60rem;
    margin: 0 auto;
    padding: 3rem 3.5rem;
    gap: 2.5rem;
    @media (max-width: 769px) {
      height: 65rem;
    }
    .full-name{
      display: flex;
      gap: 2rem;
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

  const { register, handleSubmit } = useForm<SignUpFormAgency>()
  const [privacy_policy, setPrivacyPolicy] = useState(false);
  const [userExist, setUserExist] = useState(false);


  const onPrivacyClick = () =>{
    setPrivacyPolicy(!privacy_policy);
  }
  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data:SignUpFormAgency) => {
    const fetchData = async () => {

      if(data.password !== data.confirmPassword) return

      const { confirmPassword, ...body} = data

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency/sign-up', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      if (response.ok){ 
        router.push('/sign-in/agency');
      } else{
        if (response.status === 400){
          setUserExist(true);
        }
      }
      

    }

    await fetchData()
  }
  
    return (

      <SignUpContainer>

        <form className="card" onSubmit={handleSubmit(onSubmit)}>

          <h2>{t.signUp.signUp}</h2>

          <input type="text" className="input-name" placeholder={t.mainInfoEditModal.agencyName}
          {...register('name', {required:true, })} />
          <input className="input-sign-up" type="email" placeholder={t.signIn.email}
          {...register('email', {required:true})}/>
          {
            userExist ?
            <label style={{color:"red"}}>{t.signUp.check_email}</label>
            :
            <></>
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