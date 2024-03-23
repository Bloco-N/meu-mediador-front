import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import styled from 'styled-components';


const ForgotPasswordContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;
width: 430px;
min-height: 30rem;
form {
  min-height: 32rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  h4 {
    font-size: 1.3rem;
  }
  h2 {
    margin-bottom: 2rem;
  }
  padding: 2rem 3rem;
}

@media (max-width: 1025px) {
  /* Tablet / Notebook */
  form {
    h4 {
      font-size: 2rem;
    }
  }
}

@media (max-width: 768px) {
  /* Mobile */
  width: calc(100% - 30px);
  form {
    padding: 5rem 3rem;
    h4 {
      font-size: 2rem;
    }
  }
}
`;

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

@media (max-width: 768px) {
  margin-top: 3rem;
}
`

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const [sended, setSended] = useState(false);

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  const onSubmit = async (data: { email: string }) => {
    setLoadingOpen(true);
    api
      .post("/agency/recover-password/", data)
      .then((response) => {
        if (response.data === "email sended") {
          setSended(true);
        }
        setLoadingOpen(false);
      })
      .catch((error) => {
        setLoadingOpen(false);
        return error;
      });
  };

  return (
    <Container>
      <ForgotPasswordContainer>
        <form className="card" onSubmit={handleSubmit(onSubmit)} action="">
          <h2>{t.forgotPassword.recoverPassword}</h2>

          <input
            {...register("email", { required: true })}
            className="input-forgot-password"
            type="email"
            placeholder={t.signIn.email}
          />
          <h4>{t.forgotPassword.enterAnEmail}</h4>

          <button className="forgotPasswordButton">
            {t.forgotPassword.send}
          </button>
        </form>

        {sended && <p>{t.forgotPassword.emailSent}</p>}
      </ForgotPasswordContainer>
    </Container>
  );
};

export default ForgotPassword;
