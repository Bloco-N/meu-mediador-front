"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import locales from "locales";
import { signIn, useSession } from "next-auth/react";
import { FormSignIn } from "../FormSignIn";

interface ISignIn {
  onSubmit: (value?:any) => any;
  loginError:boolean;
}

export const SignIn:React.FC<ISignIn> = ({ onSubmit,loginError = false }) => {
  const { data: session, status } = useSession();
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


  return (
        <FormSignIn
          t={t}
          onSubmit={onSubmit}
          signIn={signIn}
          loginError={loginError}        
        />
  );
};

