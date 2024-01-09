import api from "@/services/api";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const VerifyContainer = styled.div`
`

const Verify = () => {

  const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    const fetchData = async () => {
      setLoadingOpen(true)
      await api.put('/client/verify')
      .then((response) => {
        if(response.data === 'updated') router.push('/')
        setLoadingOpen(false)
      })
      .catch((error) => {
        setLoadingOpen(false)
        toast.error("Erro ao verificar email!")
        return error
      })
    } 
    fetchData()
  }, [router, token, setLoadingOpen])

    return (
      <VerifyContainer>
      </VerifyContainer>
    );
};

export default Verify;