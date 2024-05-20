import api from "@/services/api";
import { AddCommentForm } from "@/types/AddCommentForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { error } from "console";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import * as S from './styles'


type AddCommentModalProps = {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setChildSize: any
};

const AddCommentModal = ({ setOpen, setChildSize }: AddCommentModalProps) => {
  const [marketExpertiseRating, setMarketExpertiseRating] = useState(0);
  const [responsivenessRating, setResponsivenessRating] = useState(0);
  const [negotiationSkillsRating, setNegotiationSkillsRating] = useState(0);
  const [
    profissionalismAndComunicationRating,
    setProfissionalismAndComunicationRating,
  ] = useState(0);
  const [size, setSize] = useState(50);
  const [dateOftheDeed, setDateOftTheDeed] = useState("");

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  useEffect(() => {
    const localId = localStorage.getItem("id");
    setIdClient(localId);

    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSize(30);
      } else {
        setSize(40);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMarketRating = (rate: number) => {
    setMarketExpertiseRating(rate);
  };

  const handleResponsiveRating = (rate: number) => {
    setResponsivenessRating(rate);
  };

  const handleNegotiationRating = (rate: number) => {
    setNegotiationSkillsRating(rate);
  };

  const handleProfissionalismRating = (rate: number) => {
    setProfissionalismAndComunicationRating(rate);
  };

  const { register, handleSubmit } = useForm<AddCommentForm>();

  const [accType, setAccType] = useState("");
  const [validateClient, setValidateClient] = useState(false);
  const [idClient, setIdClient] = useState<string | null>();

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  const profileType = router.pathname.includes("agency") ? "agency" : "realtor";
  const { id: profileId } = router.query;

  const onSubmit = async (data: AddCommentForm) => {
    setLoadingOpen(true);
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
      dateOftheDeed,
    };
    const agencyBody = {
      ...data,
      id:+data.id,
      marketExpertiseRating,
      responsivenessRating,
      negotiationSkillsRating,
      profissionalismAndComunicationRating,
      clientId: Number(idClient),
      agencyId: Number(profileId),
    };

    await api
      .post(
        `/comment/${profileType}`,
        profileType === "agency" ? agencyBody : realtorBody
      )
      .then((response) => {
        if (response.data == false) {
          setValidateClient(false);
        }
        toast.error(t.toast.sendReview);
        setLoadingOpen(false);
        if (response.data === "created") router.reload();
      })
      .catch((error) => {
        toast.error(t.toast.errorSendReview);
        setLoadingOpen(false);
      });
  };

  useEffect(() => {
    const accountType = localStorage.getItem("accountType");

    if (accountType) {
      setAccType(accountType);
      setValidateClient(false);
    } else {
      setValidateClient(true);
      setChildSize({ width: "100%", height: "20%", radius: 10 })
    }
  }, []);

  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }
  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return(
    <S.Container className="modal">
      <form className="border" onSubmit={handleSubmit(onSubmit)} action="">
        {accType === "client" ? (
          <>
            <h3>{t.review.createAReview}</h3>
            <div>
              <p>{t.review.marketKnowledge} </p>
              <Rating onClick={handleMarketRating} size={size} />
            </div>
            <div>
              <p>{t.review.responsiveness} </p>
              <Rating onClick={handleResponsiveRating} size={size} />
            </div>
            <div>
              <p>{t.review.negotiation} </p>
              <Rating onClick={handleNegotiationRating} size={size} />
            </div>
            <div>
              <p>{t.review.professionalismAndCommunication} </p>
              <Rating onClick={handleProfissionalismRating} size={size} />
            </div>
            <div>
              <p>{t.review.soldAndBought} </p>
              <select {...register("id", { required: true })}>
                <option key={1} value={1}>
                  Vendi
                </option>
                <option key={2} value={2}>
                  Comprei
                </option>
              </select>
            </div>
            <div>
              <p>{t.review.dateOfTheDeed} </p>
              <input
                onChange={(e) => setDateOftTheDeed(e.target.value)}
                type="date"
              />
            </div>
            <textarea
              placeholder={t.review.writeYourCommentHere}
              {...register("text", { required: true })}
            />
            <p className="close" onClick={() => setOpen(false)}>
              X
            </p>
            <button className="button" type="submit"> {t.addCity.add} </button>
          </>
        ) : (
          <>
            <p className="close" onClick={() => setOpen(false)}>
              X
            </p>
            {validateClient ? (
              <p className="redirect">
              {t.comments.login}
              {" "}
              <a href="/sign-in/client" className="link">{t.comments.link}</a>
              {" "}
              {t.comments.continues}
            </p>
            ) : (
              <div className="redirectContainer">
                <p className="redirectMessage">{t.comments.completeData}</p>
                <div className="divLabel">
                  <p>
                    {" "}
                    <a
                      onClick={() => setOpen(false)}
                      className="styledLink"
                      href={`/profile/client/${idClient}`}
                    >
                      <strong className="link">{t.comments.link}</strong>
                    </a>
                    {t.comments.endRegistration}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </form>
    </S.Container>
  );
};

export default AddCommentModal;
