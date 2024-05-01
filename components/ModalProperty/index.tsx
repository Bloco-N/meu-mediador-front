import { AddPropertyForm } from "@/types/AddPropertyForm";
import Preservations from "@/types/Preservations";
import PropertyTypes from "@/types/PropertyTypes";
import Rooms from "@/types/Rooms";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as S from "./styles";
import placeholderImg from "../../public/placeholder.jpg";
import CurrencyInput from "../CurrencyInput";
import AreaInput from "../AreaInput";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import EnergyEfficience from "@/types/EnergyEfficience";
import AddPropertyModalContext, {
  ModalPropertyOpenContextType,
} from "context/AddPropertyModalContext";
import { ApiService } from "@/services/ApiService";
import api from "@/services/api";
import { toast } from "react-toastify";

type AddPropertyModalProps = {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  propertyToUpdate?: any
};

const AddPropertyModal = ({ open, setOpen, propertyToUpdate }: AddPropertyModalProps) => {
  const apiService = new ApiService();

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const {
    // propertyToUpdate: propertyToUpdate,
    setPropertyToUpdate: setPropertyToUpdate,
  } = useContext(AddPropertyModalContext) as ModalPropertyOpenContextType;

  const { register, handleSubmit, setValue } = useForm<AddPropertyForm>();

  const [price, setPrice] = useState("");
  const [grossArea, setGrossArea] = useState("");
  const [usefulArea, setUsefulArea] = useState("");

  const [pic, setPic] = useState("");

  useEffect(() => {
    setValue("title", (propertyToUpdate && propertyToUpdate.title) || "");
    setValue("link", (propertyToUpdate && propertyToUpdate.link) || "");
    setValue(
      "propertyType",
      (propertyToUpdate && propertyToUpdate.propertyType) || "HOME"
    );
    setValue("rooms", (propertyToUpdate && propertyToUpdate.rooms) || "T1");
    setValue(
      "preservation",
      (propertyToUpdate && propertyToUpdate.preservation) || "NEW_BUILDING"
    );
    setValue(
      "energyefficience",
      (propertyToUpdate && propertyToUpdate.energyefficience) || "K"
    );
    setPic((propertyToUpdate && propertyToUpdate.profilePicture) || "");
    setGrossArea((propertyToUpdate && propertyToUpdate.grossArea) || "");
    setUsefulArea((propertyToUpdate && propertyToUpdate.usefulArea) || "");
    setPrice((propertyToUpdate && propertyToUpdate.price) || "");
  }, [propertyToUpdate, open]);

  const router = useRouter();

  const locale = router.locale;

  const t = locales[locale as keyof typeof locales];

  const onSubmit = async (data: AddPropertyForm) => {
    if (pic == "") {
      return toast.info("Adicione uma imagem para salvar!");
    }

    const localId = localStorage.getItem("id");
    const accountType = localStorage.getItem("accountType");
    const realtorBody = {
      propertyData: {
        ...data,
        price,
        grossArea,
        usefulArea,
        profilePicture: pic,
      },
      realtorId: Number(localId),
    };
    const agencyBody = {
      propertyData: {
        ...data,
        price,
        grossArea,
        usefulArea,
        profilePicture: pic,
      },
      agencyId: Number(localId),
    };
    setLoadingOpen(true);
    let dataResponse;
    if (!(propertyToUpdate && propertyToUpdate.id)) {
      await api
        .post(
          `/property/${accountType}`,
          accountType === "agency" ? agencyBody : realtorBody
        )
        .then((response) => {
          dataResponse = response.data;
        })
        .catch((error) => {
          setLoadingOpen(false);
          toast.error(t.toast.errorAddProperty);
          return error;
        });
    } else {
      await api
        .put(
          `/property/${propertyToUpdate.id}/${accountType}`,
          accountType === "agency" ? agencyBody : realtorBody
        )
        .then((response) => {
          dataResponse = response.data;
        })
        .catch((error) => {
          setLoadingOpen(false);
          toast.error(t.toast.errorUpdateProperty);
          return error;
        });
    }

    setLoadingOpen(false);
    const response = dataResponse;
    if (response === "created" || response === "updated") router.reload();
  };

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    if (FileReader && file) {
      const fr = new FileReader();
      const token = localStorage.getItem("token");

      const onload = async () => {
        const img = document.getElementById("property-img") as HTMLImageElement;

        img.src = fr.result as string;

        setPic(fr.result as string);
      };

      fr.onload = onload;

      fr.readAsDataURL(file);
    }
  };

  return (
    <S.Container className="modal">
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>
          {propertyToUpdate && propertyToUpdate.id
            ? t.addPropertiesModal.updatePropertie
            : t.addPropertiesModal.uploadPropertie}
        </h3>
        <div className="input-titulo">
         
        </div>
        <div className="all-infos">
          <div className="infos">
            <div className="inputs">
               <input
            required
            {...register("title", { required: true })}
            type="text"
            placeholder={t.addPropertiesModal.title}
          />
        
              <input
                required
                {...register("link", { required: true })}
                type="text"
                placeholder={t.addPropertiesModal.link}
              />
              <CurrencyInput
                required
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(e.target.value)
                }
                placeholder="0.00 €"
              />
              <AreaInput
                required
                value={grossArea}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGrossArea(e.target.value)
                }
                placeholder={t.addPropertiesModal.grossArea}
              />

              <select
                placeholder="Selecione"
                {...register("energyefficience", { required: true })}
                name="energyefficience"
                id="energyefficience"
              >
                {Object.entries(
                  EnergyEfficience[locale as keyof typeof EnergyEfficience]
                ).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="selections">
            <input type="text" placeholder="Referencia do Imóvel" />
              <select
                {...register("propertyType")}
                name="propertyType"
                id="propertyType"
              >
                {Object.entries(
                  PropertyTypes[locale as keyof typeof PropertyTypes]
                ).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <select {...register("rooms")} name="rooms" id="rooms">
                {Object.entries(Rooms).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <select
                {...register("preservation", { required: true })}
                name="preservation"
                id="preservation"
              >
                {Object.entries(
                  Preservations[locale as keyof typeof Preservations]
                ).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              <AreaInput
                required
                value={usefulArea}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsefulArea(e.target.value)
                }
                placeholder={t.addPropertiesModal.usableArea}
              />
            </div>
          </div>
          <div className="image-place">
            <Image
              id="property-img"
              height={400}
              width={400}
              className="property-img"
              src={pic ? pic : placeholderImg}
              alt="property image"
            ></Image>
            <label htmlFor="property-pic">{t.addPropertiesModal.edit}</label>
            <input
              onChange={(e) => handleChange(e)}
              id="property-pic"
              type="file"
            />
      
          </div>

        </div>
        <p
          onClick={() => {
            setOpen(false);
            setPropertyToUpdate(undefined);
          }}
        >
          X
        </p>
        <div className="buttons">
          <button className="button" type="submit">
            {propertyToUpdate && propertyToUpdate.id
              ? t.addPropertiesModal.updatePropertie
              : t.addPropertiesModal.uploadPropertie}
          </button>
          {propertyToUpdate && propertyToUpdate.id && (
            <button
              className="buttondelete"
              type="button"
              onClick={async () => {
                const token = localStorage.getItem("token");
                setLoadingOpen(true);
                const response = await apiService.deleteRealtorProperty(
                  token as string,
                  propertyToUpdate.id,
                  "realtor"
                );
                setLoadingOpen(false);
                if (response === "deleted") router.reload();
              }}
            >
              {t.addPropertiesModal.deleteProperty}
            </button>
          )}
        </div>
      </form>
    </S.Container>
  );
};

export default AddPropertyModal;
