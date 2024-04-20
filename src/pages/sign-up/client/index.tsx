import { SignUpForm } from "@/types/SignUpForm";
import locales from "locales";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import api from "@/services/api";
import { toast } from "react-toastify";
import BaseCardSignUp from "../../../../components/BaseCardSignUp";
import RenderConditional from "@components/RenderConditional";

const SignUp = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();
  const [userExist, setUserExist] = useState(false);
  const router = useRouter()
  const locale = router.locale;
  const { data: session } = useSession();
  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    if (session) {
      onSubmit(null);
    }
  }, []);

  const onSubmit = async (data: SignUpForm | null) => {
    const partesDoNome = session?.user?.name?.split(" ");
    const firstName = partesDoNome ? partesDoNome[0] : null;
    const lastName = partesDoNome?.slice(1).join(" ");

    const dataGoogle = {
      email: session?.user?.email,
      firstName: firstName,
      lastName: lastName,
    };
    const fetchData = async () => {
      let body;

      if (!session) {
        if(data?.password != data?.confirmPassword){
          return toast.info('Senhas divergentes!')
        } 
        const { confirmPassword, ...bodyData } = data as SignUpForm;
        body = bodyData;
      }

      const urlFetch = "/client/sign-up";
      const urlFetchGoogle = "/client/sign-in/google";

      api.post(session ? urlFetchGoogle : urlFetch, session ? dataGoogle : body)
      .then((response) => {
        if (response.data){ 
          toast.success(t.toast.addUser);
          router.push("/sign-in/client");
        } else{
          if (response.status === 400){
            setUserExist(true);
          }
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status == 400){
          setUserExist(true);
        }
      })  
    };

    await fetchData();
  };

  return (
    <BaseCardSignUp onSubmit={handleSubmit(onSubmit)}> 
          <div className="full-name">
            <input
              type="text"
              className="input-sign-up"
              placeholder={t.mainInfoEditModal.name}
              {...register("firstName", { required: true })}
            />
            <input
              type="text"
              className="input-sign-up"
              placeholder={t.mainInfoEditModal.lastName}
              {...register("lastName", { required: true })}
            />
          </div>

              <input
                className="input-sign-up"
                type="email"
                placeholder={t.signIn.email}
                {...register("email", { required: true })}
              />

          <RenderConditional isTrue={userExist}>
            <label style={{color:"red"}}>{t.signUp.check_email}</label>
          </RenderConditional>
          <input
            className="input-sign-up"
            type="password"
            placeholder={t.signIn.password}
            {...register("password", { required: true })}
          />
          <input
            className="input-sign-up"
            type="password"
            placeholder={t.signUp.confirmPassword}
            {...register("confirmPassword", { required: true })}
          />
    
    </BaseCardSignUp>
  )

};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

export default SignUp;