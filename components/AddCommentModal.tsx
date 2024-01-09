import api from "@/services/api";
import { AddCommentForm } from "@/types/AddCommentForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { error } from "console";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  
  form {
    position: relative;
    height: 65rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-top: 4rem;
    /* border: 1px solid tomato; */
    @media (max-width: 1000px) {
      width: 60%;
      height: 70rem;
    }
    @media (max-width: 654px) {
      width: 80%;
      gap: 1rem;
      height: 65rem;
    }
    @media (max-width: 376px) {
      gap: 0.1rem;
    gap: 1.5rem;
    padding-top: 2.5rem; 
    
    @media (max-width: 600px) {
      width: 80%;
      height: auto;
      padding-top: 2rem;
    }    
  }

  textarea{
    min-height: 10rem;
      @media (max-width: 600px) {
        width: 85%;
        min-height: 20rem;
      }
    }
  }

  div {
       display: flex; 
       flex-direction: row; 
       align-items: center; 
       justify-content: space-between; 
       gap: 1.5rem; 
       width: 80%;
      
       p {
        font-weight: bold;
      }
      @media (max-width: 376px) {
        height: 8rem;
      } 
    }
  
  .desableForm{
      height: 20rem;
    }
  .redirect {
    position: absolute;
    top: 50%;
    font-weight: bold;
    display: flex;
  }
  
  .close {
    cursor: pointer;
    position: absolute;
    top: 2.5rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
    
    @media (max-width: 600px) {
      top: 2.5%;
    }
  }

  .star-svg{
    @media (max-width: 900px) {
      width: 3.5rem !important;
    }
    @media (max-width: 400px) {
      width: 3.5rem !important;
    }
  }
  select {
  width: 26%;
  height: 3.5rem;
  padding: 0.5rem;
  font-size: 16px;
  text-align: center;
  overflow: auto;

  @media (max-width: 600px) {
    width: 40%;
    font-size: 12px;
  }
}

  input {
    width: 26%;
    height: 3.5rem;
    text-align: left;
    font-size: 10px;
    
    @media (max-width: 600px) {
      width: 27%;
      font-size: 10px;
    }
  }
  
  button {
    margin-bottom: 8em;
    
    @media (max-width: 600px) {
      margin-bottom: 2em;
    }
  }

  .redirectContainer{
    position: absolute;
    top: 40%;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 50%;

    @media (max-width: 600px) {
      font-size: 10px;
    }

    .styledLink{
      margin-left: 5px;
      margin-right: 0;
    }
    
    .redirectMessage{
      display: inline;
    }
    .divLabel{
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .link{
      text-decoration: underline;
    }
  }
`;

type AddCommentModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}



const AddCommentModal = ({open, setOpen}: AddCommentModalProps) => {
  const [marketExpertiseRating, setMarketExpertiseRating] = useState(0)
  const [responsivenessRating, setResponsivenessRating] = useState(0)
  const [negotiationSkillsRating, setNegotiationSkillsRating] = useState(0)
  const [profissionalismAndComunicationRating, setProfissionalismAndComunicationRating] = useState(0)
  const [size, setSize] = useState(50);
  const [dateOftheDeed, setDateOftTheDeed] = useState("");

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  useEffect(() => {
    const localId = localStorage.getItem('id')
    setIdClient(localId)

    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSize(30);
      } else {
        setSize(40);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };

   
  }, []);

  const handleMarketRating = (rate: number) => {
    setMarketExpertiseRating(rate)
  }

  const handleResponsiveRating = (rate: number) => {
    setResponsivenessRating(rate)
  }

  const handleNegotiationRating = (rate: number) => {
    setNegotiationSkillsRating(rate)
  }

  const handleProfissionalismRating = (rate: number) => {
    setProfissionalismAndComunicationRating(rate)
  }

  const { register, handleSubmit } = useForm<AddCommentForm>()

  const [accType, setAccType] = useState('')
  const [validateClient, setValidateClient] = useState(false)
  const [idClient, setIdClient] = useState<string | null>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  
  const profileType = router.pathname.includes("agency")?"agency":"realtor"
  const { id:profileId } = router.query
  
  const onSubmit = async (data: AddCommentForm) => {
  
    setLoadingOpen(true)
    const realtorBody = {
      text: data.text,
      sold: data.id == 1 ? 1 : 0,
      bought: data.id == 2 ? 1 : 0,
      marketExpertiseRating,
      responsivenessRating,
      negotiationSkillsRating,
      profissionalismAndComunicationRating,
      clientId: Number(idClient),
      realtorId: Number(profileId),
      dateOftheDeed
    }
    const agencyBody = {
      ...data,
      marketExpertiseRating,
      responsivenessRating,
      negotiationSkillsRating,
      profissionalismAndComunicationRating,
      clientId: Number(idClient),
      agencyId: Number(profileId)
    }

    await api.post(`/comment/${profileType}`, profileType === "agency"? agencyBody : realtorBody)
    .then((response) => {
      if(response.data == false){
        setValidateClient(false)
      }
      toast.error(t.toast.sendReview)
      setLoadingOpen(false)
      console.log(response.data)
      if(response.data === 'created') router.reload()
    })
    .catch((error) => {
      toast.error(t.toast.errorSendReview)
      setLoadingOpen(false)
    })
    
  }

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')

    if(accountType){
      setAccType(accountType)
      setValidateClient(false)
    }else{
      setValidateClient(true)
    }

  }, [open])

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }
  useEffect(() => {
    if (hasWindow) {
      

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return (
    (open) ?
    <Container className='modal'>
      <form  onSubmit={handleSubmit(onSubmit)} action="">
        {accType === 'client'? (
          <>
            <h3>{t.review.createAReview}</h3>
            <div>
              <p>{t.review.marketKnowledge} </p>
              <Rating
                onClick={handleMarketRating}
                size={size}
              />
            </div>
            <div>
              <p>{t.review.responsiveness} </p>
              <Rating
                onClick={handleResponsiveRating}
                size={size}
              />
            </div>
            <div>
              <p>{t.review.negotiation} </p>
              <Rating
                onClick={handleNegotiationRating}
                size={size}
              />
            </div>
            <div>
              <p>{t.review.professionalismAndCommunication} </p>
              <Rating
                onClick={handleProfissionalismRating}
                size={size}
              />
            </div>
            <div>
              <p>{t.review.soldAndBought} </p>
              <select {...register('id', { required: true})}>
                  <option key={1} value={1}>Vendi</option>
                  <option key={2} value={2}>Comprei</option>
              </select>
            </div>
            <div>
              <p>{t.review.dateOfTheDeed} </p>
              <input onChange={(e) => setDateOftTheDeed(e.target.value)} type="date" />
            </div>
            <textarea placeholder={t.review.writeYourCommentHere} {...register('text', {required: true})}/>
            <p className="close" onClick={() => setOpen(false)}>X</p>
            <button type="submit"> {t.addCity.add} </button>
          </>

        ): (
          <>
            <p className="close" onClick={() => setOpen(false)}>X</p>
            {validateClient?
            <p className="redirect">{t.comments.login}</p>
              :
            <div className="redirectContainer">
              <p className="redirectMessage">{t.comments.completeData}</p>
              <div className="divLabel">
                <p> <a onClick={() => setOpen(false)} className="styledLink" href={`/profile/client/${idClient}`}>
                  <strong className="link">{t.comments.link}</strong>
                  </a> 
                  {t.comments.endRegistration}
                </p>
              </div>
             
             
            </div>
            }
          </>
        ) }
      </form>
    </Container>
    : <></>
  );
};

export default AddCommentModal