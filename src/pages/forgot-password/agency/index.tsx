import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordContainer,
  Container,
} from "../style/ForgotPasswordContainer";
import api from "@/services/api";

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
