import { SignInForm } from "@/types/SignInForm";
import UserContext from "context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { decode } from "jsonwebtoken";
import { UserContextType } from "@/types/UserContextType";
import locales from "locales";

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

    const router = useRouter()

    const locale = router.locale

    const t = locales[locale as keyof typeof locales]

    useEffect(() => {
      const token = localStorage.getItem('token')
      if(token){
        router.push('/')
      }
    }, [router])

    const onSubmit = async (data:SignInForm) => {

      const fetchData = async () => {

        try {
          
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency' + '/sign-in', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })

          if(response.ok){

            const token = await response.text()

            localStorage.setItem('token', token)
            const user = decode(token) as { id:number, email:string, name: string}

            localStorage.setItem('id', String(user.id))
    
            const agencyResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency/' + user.id)
    
            const agencyData = await agencyResponse.json()
            
            localStorage.setItem('pic', agencyData.profilePicture)
            localStorage.setItem('accountType', 'agency')
    
            setUser({ token, id: user.id, profilePicture: agencyData.profilePicture, coverPicture: agencyData.coverPicture, accountType: 'agency' })
            if(agencyData.verified === false){
              router.push('/verify/agency')
            }else{
              router.reload()
            }
          }

          if(response.status === 400){
            throw new Error('email or password incorrect')
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

          <Link className="forgot-password" href="/forgot-password/agency">{t.signIn.forgot}</Link>

          <button>{t.signIn.enter}</button>

          <div className="bottom-cta">
            <h5>{t.signIn.notHaveAnAccount}</h5>
            <Link className="create-account special-link" href="/sign-up/profile">{t.signIn.here}</Link>
          </div>
        </form>


      </SignInContainer>

    );
};

export default SignIn;