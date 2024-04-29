import locales from "locales";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as C from '../../../stylesPages/styles-FormForgotPassword';

const FormForgotPassword:React.FC<any> = ({ onSubmit,sended }) => {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const router = useRouter();
  const locale = router.locale;
  const t = locales[locale as keyof typeof locales];

  return (
    <C.Container>
      <C.ForgotPasswordContainer>
        <form className="card" onSubmit={handleSubmit(onSubmit)} action="">
          <h2>{t.forgotPassword.recoverPassword}</h2>

          <input
            {...register("email", { required: true })}
            className="input-forgot-password"
            type="email"
            placeholder={t.signIn.email}
          />
          <h4>{t.forgotPassword.enterAnEmail}</h4>

          <button className="button">
            {t.forgotPassword.send}
          </button>
        </form>

        {sended && <p>{t.forgotPassword.emailSent}</p>}
      </C.ForgotPasswordContainer>
    </C.Container>
  );
};

export default FormForgotPassword;
