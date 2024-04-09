"use client";

import { SignInForm } from "@/types/SignInForm";
import UserContext from "context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { decode } from "jsonwebtoken";
import { UserContextType } from "@/types/UserContextType";
import locales from "locales";
import { useState } from "react";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { signIn, useSession } from "next-auth/react";
import GoogleLoginButton from "../../../../components/ButtonAuth";
import iconGoogle from "../../../../public/icon-google.png";
import iconFacebook from "../../../../public/icons-facebook.png";
import api from "../../../services/api";
import { toast } from "react-toastify";
import * as C from './styles'
import Popover from "./Popover";

const Form:React.FC<any> = ({ t, onSubmit, signIn, loginError }) => {
  const { register, handleSubmit } = useForm();

  return (
    <C.Container>
      <C.SignInContainer>
        <C.Card onSubmit={handleSubmit(onSubmit)}>
          <C.Title>{t.signIn.signIn}</C.Title>

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

            <Popover>
                  <C.BottomCta>
                    <h5>{t.signIn.notHaveAnAccount}</h5>
                    <C.CreateAccountLink className="create-account special-link" href="/sign-up/profile">
                      {t.signIn.here}
                    </C.CreateAccountLink>
                  </C.BottomCta>
            </Popover>

        </C.Card>
      </C.SignInContainer>
    </C.Container>
  );
};

const SignIn = () => {
  const { data: session, status } = useSession();

  const { register, handleSubmit } = useForm<SignInForm>();

  const { setUser } = useContext(UserContext) as UserContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const checkAndSubmit = async () => {
      if (status === "authenticated") {
        await onSubmit(null);
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          router.push("/");
        }
      }
    };

    checkAndSubmit();
  }, [router, session, status]);

  const onSubmit = async (data: SignInForm | null) => {
    const partesDoNome = session?.user?.name?.split(" ");
    const firstName = partesDoNome ? partesDoNome[0] : null;
    const lastName = partesDoNome?.slice(1).join(" ");

    const dataGoogle = {
      email: session?.user?.email,
      firstName: firstName,
      lastName: lastName,
    };

    const urlFetch = "/client/sign-in";
    const urlFetchGoogle = "/client/sign-in/google";

    const fetchData = async () => {
      setLoadingOpen(true);
      await api
        .post(!data ? urlFetchGoogle : urlFetch, !data ? dataGoogle : data)
        .then(async (response) => {
          const token = await response.data;
          localStorage.setItem("token", token);
          const user = decode(token) as {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
          };
          localStorage.setItem("id", String(user.id));

          const clientResponse = await api.get(`/client/${user.id}`);
          const clientData = await clientResponse.data;
          localStorage.setItem("accountType", "client");
          setUser({
            token,
            id: user.id,
            profilePicture: null,
            coverPicture: null,
            accountType: "client",
          });
          setLoadingOpen(false);

          if (clientData.verified === false) {
            router.push("/verify/client");
          } else {
            router.reload();
          }

          toast.success(`${t.toast.welcome} ${clientData.firstName}!`);
        })
        .catch((error) => {
          setLoginError(true);
          setLoadingOpen(false);
        });
    };

    await fetchData();
  };

  return (
        <Form
          t={t}
          onSubmit={onSubmit}
          signIn={signIn}
          loginError={loginError}        
        />
  );
};

export default SignIn;
