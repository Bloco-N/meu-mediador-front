"use client";

import { SignInForm } from "@/types/SignInForm";
import UserContext from "context/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { decode } from "jsonwebtoken";
import { UserContextType } from "@/types/UserContextType";
import locales from "locales";
import { useState } from "react";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { useSession } from "next-auth/react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { SignIn } from "../components";

const SignInRealtor = () => {
  const { data: session } = useSession();
  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType;
  const { setUser } = useContext(UserContext) as UserContextType;
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const locale = router.locale
  const t = locales[locale as keyof typeof locales];

  const onSubmit = async (data: SignInForm | null) => {
    const dataGoogle = {
      email: session?.user?.email,
      name: session?.user?.name,
    };

    const urlFetch = "/agency/sign-in";
    const urlFetchGoogle = "/agency/sign-in/google";

    const fetchData = async () => {
      setLoadingOpen(true);
      await api
        .post(!data ? urlFetchGoogle : urlFetch, !data ? dataGoogle : data)
        .then(async (response) => {
          const token = response.data;
          localStorage.setItem("token", token);
          const user = decode(token) as {
            id: number;
            email: string;
            name: string;
          };

          localStorage.setItem("id", String(user.id));

          const agencyResponse = await api.get(`/agency/${user.id}`);
          const agencyData = agencyResponse.data;

          localStorage.setItem("pic", JSON.stringify(agencyData?.profilePicture));
          localStorage.setItem("accountType", "agency");

          setUser({
            token,
            id: user.id,
            profilePicture: agencyData.profilePicture,
            coverPicture: agencyData.coverPicture,
            accountType: "agency",
          });
          setLoadingOpen(false);
          if (agencyData.verified === false) {
            router.push("/verify/agency");
          } else {
            router.reload();
          }
          toast.success(t.toast.welcome);
        })
        .catch((error) => {
          console.log(error)
          setLoginError(true);
          setLoadingOpen(false);
        });
    };

    await fetchData();
};
  
  return <SignIn loginError={loginError} onSubmit={onSubmit}/>
};

export default SignInRealtor;
