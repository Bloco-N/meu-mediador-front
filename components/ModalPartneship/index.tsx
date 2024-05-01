import api from "@/services/api";
import { AddAwardForm } from "@/types/AddAwardForm";
import { AddPartnershipForm } from "@/types/AddPartnershipForm";
import { AgencyProfile } from "@/types/AgencyProfile";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as S from './styles'

type AddServiceModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddPartnershipModal = ({ setOpen }: AddServiceModalProps) => {
  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const [workHere, setWorkHere] = useState(false);

  const { register, handleSubmit } = useForm<AddPartnershipForm>();

  const [agencies, setAgencies] = useState<AgencyProfile[]>();

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const endInput = document.getElementById("end") as HTMLInputElement;
    if (endInput) {
      endInput.value = "";
    }
  }, [workHere]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/agency/no-pagination`)
        .then((response) => {
          setAgencies(response.data);
        })
        .catch((error) => {
          return error;
        });
    };

    fetchData();
  }, []);

  const onSubmit = async (data: AddPartnershipForm) => {
    const init = new Date(data.init as Date);
    const end = new Date(data.end as Date);

    if (init > end) return alert("Data de fim é anterior a de início");

    const localId = localStorage.getItem("id");
    await api
      .post(`/partnership`, {
        ...data,
        realtorId: Number(localId),
      })
      .then((response) => {
        setLoadingOpen(false);
        toast.success(t.toast.addExperience);
        if (response.data === "updated") router.reload();
      })
      .catch((error) => {
        setLoadingOpen(false);
        toast.error(t.toast.errorExperience);
        return error;
      });
  };

  return (
    <S.Container className="modal">
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addPartnership.addExperience}</h3>
        <input
          {...register("title", { required: true })}
          placeholder={t.addPartnership.jobTitle}
          type="text"
        />
        <input
          list="agencies"
          {...register("agency", { required: true })}
          placeholder={t.addPartnership.company}
          type="text"
        />
        <datalist id="agencies">
          {agencies?.map((item) => (
            <option key={item.id} value={item.name} />
          ))}
        </datalist>
        <div className="dates-inputs">
          <div className="dates-input-group">
            <p className="label-text-inputs">{t.addPartnership.dateStart}</p>
            <input {...register("init", { required: true })} type="date" />
          </div>
          <div className="dates-input-group">
            <p className="label-text-inputs">{t.addPartnership.dateEnd}</p>
            <input
              {...register("end")}
              id="end"
              disabled={workHere}
              type="date"
            />
          </div>
        </div>
        <div className="word-here">
          <label htmlFor="active">{t.addPartnership.currentJob}</label>
          <input
            onChange={() => setWorkHere(!workHere)}
            id="active"
            type="checkbox"
            className="checkbox"
          />
        </div>
        <p onClick={() => setOpen(false)}>X</p>
        <button className="button" type="submit"> {t.addPartnership.create} </button>
      </form>
    </S.Container>
  )
};

export default AddPartnershipModal;
