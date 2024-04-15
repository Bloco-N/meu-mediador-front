import * as C from '@components/Form/styles'
import { useForm } from 'react-hook-form';
import GoogleLoginButton from "@components/ButtonAuth";
import iconGoogle from "/public/icon-google.png";
import iconFacebook from "public/icons-facebook.png";
import { useRouter } from 'next/router';

export const Form:React.FC<any> = ({ t, onSubmit, signIn, loginError }) => {
    const { register, handleSubmit } = useForm()
    const router = useRouter();
    const path = router.asPath
    
    function renderTitle() {
        if(path.includes('client')){
          return t.signIn?.signInClient
        }else if(path.includes('realtor')){
          return t.signIn?.signInRealtor
        }else if(path.includes('agency')){
          return t.signIn?.signInAgency
        }else{
          return t.signIn.signIn
        }
    }
  
    return (
      <C.Container>
        <C.SignInContainer>
          <C.Card onSubmit={handleSubmit(onSubmit)}>
              <C.Title>{renderTitle()}</C.Title>
              <C.ContainerInputs>
                <C.Input
                      type="email"
                      placeholder={t.signIn.email}
                      {...register("email", { required: true })}
                    />
                    <C.Input
                      type="password"
                      placeholder={t.signIn.password}
                      {...register("password", { required: true })}
                    />
                  {loginError && <C.ErrorText className="text-error">{t.signIn.error}</C.ErrorText>}
              </C.ContainerInputs>
  
              <C.ForgotPasswordLink href="/forgot-password/client">
                {t.signIn.forgot}
              </C.ForgotPasswordLink>
              <button>{t.signIn.enter}</button>
  
              <C.OrSeparator className="orSeparator">
                <C.BorderTop className="borderTop" />
                <C.OrText className="orText">ou</C.OrText>
                <C.BorderTop className="borderTop" />
              </C.OrSeparator>
  
              <C.ContainerOAuth>
                <GoogleLoginButton
                  icon={iconGoogle.src}
                  onClick={() => signIn("google")}
                  text={t.signIn.google}
                />
  
                <GoogleLoginButton
                  icon={iconFacebook.src}
                  onClick={() => signIn("facebook")}
                  text={t.signIn.facebook}
                />
              </C.ContainerOAuth>
  
              <C.BottomCta>
                <h5>{t.signIn.notHaveAnAccount}</h5>
                <C.CreateAccountLink className="create-account special-link" href="/sign-up/profile">
                  {t.signIn.here}
                </C.CreateAccountLink>
              </C.BottomCta>
              
          </C.Card>
        </C.SignInContainer>
      </C.Container>
    );
};