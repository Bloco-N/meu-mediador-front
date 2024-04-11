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
    const partesDoNome = session?.user?.name?.split(" ");
    const firstName = partesDoNome ? partesDoNome[0] : null;
    const lastName = partesDoNome?.slice(1).join(" ");

    const dataGoogle = {
      email: session?.user?.email,
      firstName: firstName,
      lastName: lastName,
    };

    const urlFetch = "/realtor/sign-in";
    const urlFetchGoogle = "/realtor/sign-in/google";
    
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
            firstName: string;
            lastName: string;
          };
          localStorage.setItem("id", String(user.id));

          const realtorResponse = await api.get(`/realtor/${user.id}`);
          const realtorData = realtorResponse.data;

          localStorage.setItem("pic", realtorData.profilePicture);
          localStorage.setItem("accountType", "realtor");


          setUser({
            token,
            id: user.id,
            profilePicture: realtorData.profilePicture,
            coverPicture: realtorData.coverPicture,
            accountType: "realtor",
          });
          setLoadingOpen(false);

          if (realtorData.verified === false) {
            localStorage.setItem("accountType", "realtor");
            router.push("/verify/realtor");
          } else {
            router.reload();
          }

          toast.success(`${t.toast.welcome} ${realtorData.firstName}!`);
        })
        .catch((error) => {
          setLoginError(true);
          setLoadingOpen(false);
        });
    };

    await fetchData();
  };
  
  return <SignIn loginError={loginError} onSubmit={onSubmit}/>
};

export default SignInRealtor;
