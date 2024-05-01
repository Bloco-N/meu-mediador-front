import api from "@/services/api";
import * as S from "./styles"
import { AddServiceForm } from "@/types/AddServiceForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { RealtorService } from "@/types/RealtorService";
import { Service } from "@/types/Service";
import LoadingContext from "context/LoadingContext";
import locales, { servicesLocales } from "locales";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


type AddServiceModalProps = {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddServiceModal = ({ open, setOpen }: AddServiceModalProps) => {
  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const { register, handleSubmit } = useForm<AddServiceForm>();

  const [services, setServices] = useState<Service[]>();

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  useEffect(() => {
    const fetchData = async () => {
      const localId = localStorage.getItem("id");
      const accountType = localStorage.getItem("accountType");
      let data: Service[] = [];
      let realtorServicesData: RealtorService[] = [];

      if (localId) {
        await api
          .get("/service")
          .then((response) => {
            data = response.data as Service[];
          })
          .catch((error) => {
            return error;
          });

        await api
          .get(
            `/service/${
              accountType === "agency" ? "agenct" : "realtor"
            }/${localId}`
          )
          .then((response) => {
            realtorServicesData = response.data as RealtorService[];
          })
          .catch((error) => {
            return error;
          });

        const realtorServicesNames = realtorServicesData?.map(
          (item) => item.service.title
        );
        const deleteSet = new Set(realtorServicesNames);

        data = data?.filter((item) => !deleteSet.has(item.title));
        setServices(data);
      }
    };
    fetchData();
  }, [open, setLoadingOpen]);

  const onSubmit = async (data: AddServiceForm) => {
    const localId = localStorage.getItem("id");
    const accountType = localStorage.getItem("accountType");
    const realtorBody = {
      serviceId: Number(data.serviceId),
      realtorId: Number(localId),
    };
    const agencyBody = {
      serviceId: Number(data.serviceId),
      agencyId: Number(localId),
    };

    setLoadingOpen(true);

    await api
      .post(
        `/service/${accountType}`,
        accountType === "agency" ? agencyBody : realtorBody
      )
      .then((response) => {
        toast.success(t.toast.addService);
        setLoadingOpen(false);
        if (response.data === "created") router.reload();
      })
      .catch((error) => {
        toast.success(t.toast.errorAddService);
        setLoadingOpen(false);
      });
  };

  return(
    <S.Container className="modal">
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addServices.createService}</h3>
        {services?.length === 0 ? (
          <h4>{t.addServices.YouHaveNoMore}</h4>
        ) : (
          <>
            <select
              {...register("serviceId", { required: true })}
              name="serviceId"
            >
              {locale === "pt" &&
                services?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {
                      servicesLocales.pt[
                        item.title as keyof typeof servicesLocales.pt
                      ]
                    }
                  </option>
                ))}
              {locale === "en" &&
                services?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {
                      servicesLocales.en[
                        item.title as keyof typeof servicesLocales.en
                      ]
                    }
                  </option>
                ))}
              {locale === "es" &&
                services?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {
                      servicesLocales.es[
                        item.title as keyof typeof servicesLocales.es
                      ]
                    }
                  </option>
                ))}
            </select>
            <button className="button" type="submit">{t.addServices.create}</button>
          </>
        )}
        <p onClick={() => setOpen(false)}>X</p>
      </form>
    </S.Container>
  )
};

export default AddServiceModal;
