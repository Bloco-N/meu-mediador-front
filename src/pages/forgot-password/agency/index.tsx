import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import { useContext, useState } from "react";
import api from "@/services/api";
import FormForgotPassword from "../FormForgotPassword";

const ForgotPasswordAgency = () => {
  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType;
  const [sended, setSended] = useState(false);

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
    <FormForgotPassword 
      onSubmit={onSubmit}
      sended={sended}
    />
  )
};

export default ForgotPasswordAgency;
