import { useForm } from "react-hook-form";
import styled from "styled-components";
import SearchContext from "context/SearchContext";
import { SearchContextType } from "@/types/SearchContextType";
import { useRouter } from "next/router";
import { useRef, useContext, useEffect, useState } from "react";
import SearchResultContext from "context/SearchResultContext";
import { SearchResultContextType } from "@/types/SearchResultContextType";
import { SearchForm } from "@/types/SearchForm";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import locales from "../../locales";
import InfoFooter from "components/InfoFooter";
import Link from "next/link";
import api from "@/services/api";
import { FaAngleDown } from "react-icons/fa";
import Footer from "components/Footer";

const SearchRealtor = styled.div`
  width: 100%;
  height: auto;
  margin-top: 190px;
  @media only screen and (max-width: 1400px) {
    width: 100%;
    transform: scale(0.67);
    margin-top: 80px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    transform: none;
  }

  form {
    background: #e9e9e985;
    width: 100%;
    max-width: 100%;
    width: fit-content;
    margin: auto;
    height: fit-content;
    margin-top: 20vh;
    backdrop-filter: blur(5px);
    padding: 2rem 3rem;

    h4 {
      font-weight: 600;
      margin-top: 10px;
    }
    .search-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      width: 900px;

      @media only screen and (max-width: 1190px) {
      }
      @media (max-width: 768px) {
        flex-direction: column;
        padding: 2rem 0rem;
        /* gap: 3rem; */
        width: 100%;
        input {
          width: 100%;
        }
      }
    }

    input {
      width: 25%;
      height: 60px;
    }

    .selectWrapper {
      position: relative;
      width: 230px;

      @media (max-width: 768px) {
        width: 100%;
        height: 60px;
        -webkit-appearance: none;
      }

      select {
        padding: 0 18px;
        padding-left: 10px;
        appearance: none;
        height: 60px;
        @media (max-width: 768px) {
          width: 100%;
          height: 58px;
          background-color: #fff;
          -webkit-appearance: none;
          padding-left: 18px;
        }
      }

      .selectIcon {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        pointer-events: none;

        svg {
          display: block;
        }

        svg path {
          fill: #555;
        }
      }
    }

    @media only screen and (max-width: 1000px) {
      width: 90%;
      height: 40rem;
      padding: 2rem;
      text-align: center;
      margin-top: 0;
    }

    @media only screen and (max-width: 768px) {
      width: calc(100% - 4rem);
      max-width: 90%;
      height: 20px;
      input {
      }
      input,
      .searchButton {
        background: #fff;
      }
      .searchButton,
      h4 {
        color: #3a2e2c;
        opacity: 1;
      }
    }
  }
  .novo-botao {
    color: blue;
    text-decoration: underline;
  }

  .card {
    width: 100%;
    max-width: 910px;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 27px;
    margin-top: 2rem;
    .card {
      width: 100%;
      height: 400px;
      padding: 0 27px;
    }
  }
`;

const NovoCadastro = styled.div`
  text-align: center;
  height: auto;
  border-radius: 1.2rem;
  background: #e9e9e985;
  height: fit-content;
  backdrop-filter: blur(5px);
  padding: 1rem 3rem;
  margin-top: 10px;

  h4 {
    font-weight: 600;
    margin-top: 0px;
    font-size: 18px;
  }

  @media only screen and (max-width: 1400px) {
    margin-top: -35px;
    h4 {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 768px) {
    margin-top: 0px;
    border: solid 0.1rem var(--border-color);
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    h4 {
      font-size: 16px;
    }
  }

  .novo-botao {
    color: blue;
    text-decoration: underline;
  }
`;
export default function Home() {
  const { register, handleSubmit } = useForm<SearchForm>();

  const [cities, setCities] = useState<Array<string>>();
  const [selectedValue, setSelectedValue] = useState(1);

  const router = useRouter();

  const { locale } = router;

  const t = locales[locale as keyof typeof locales];

  const { setSearch } = useContext(SearchContext) as SearchContextType;
  const { setSearchResult } = useContext(
    SearchResultContext
  ) as SearchResultContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const inputRef = useRef<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/city")
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          return error;
        });
    };

    fetchData();
  }, []);

  const onSubmit = async (data: SearchForm) => {
    const fetchData = async () => {
      let url = data.idSearch == 1 ? "/realtor?" : "/agency?";
      if (data.search) {
        url += "search=" + data.search + "&";
        setSearch(data.search);
      } else {
        setSearch("");
      }

      if (data.zipCode) {
        const capitalizedZipCode =
          data.zipCode.charAt(0).toUpperCase() + data.zipCode.slice(1);
        url += "zipCode=" + capitalizedZipCode;
        setSearch(data.search);
      }

      await api
        .get(url)
        .then((response) => {
          setSearchResult(response.data);
          router.push({
            pathname: "/search-result",
            query: { idSearch: data.idSearch },
          });
        })
        .catch((error) => {
          return error;
        });
    };
    setLoadingOpen(true);
    await fetchData();
    setLoadingOpen(false);
  };

  return (
    <>
      <SearchRealtor>
        <form className="card" onSubmit={handleSubmit(onSubmit)} ref={inputRef}>
          <div className="search-row">
            <div className="selectWrapper">
              <select
                value={selectedValue}
                {...register("idSearch", {
                  required: true,
                  onChange: (e) => setSelectedValue(e.target.value),
                })}
              >
                <option value={1}>{t.home.realtor}</option>
                <option value={2}>{t.home.agency}</option>
              </select>
              <div className="selectIcon">
                <FaAngleDown />
              </div>
            </div>

            <input
              type="text"
              className="input-realtor"
              placeholder={
                selectedValue == 1
                  ? t.home.searchRealtorNamePlaceholder
                  : t.home.searchAgencyNamePlaceholder
              }
              {...register("search")}
            />

            <input
              list="cities"
              type="text"
              className="input-city-cep"
              placeholder={t.home.searchRealtorCityPlaceholder}
              {...register("zipCode")}
            />
            <datalist id="cities">
              {cities?.map((item, index) => (
                <option key={index} value={item} />
              ))}
            </datalist>

            <button className="searchButton">{t.home.searchButton}</button>
          </div>
          <h4>{t.home.welcome}</h4>
        </form>
      </SearchRealtor>
      <NovoCadastro className="novo-cadastro2">
        <h4>
          {t.home.cad_bar}
          <Link
            style={{ color: "blue" }}
            className="create-account special-link"
            href="/sign-up/profile"
          >
            {" "}
            {t.signIn.here}
          </Link>
        </h4>
      </NovoCadastro>
      <Footer />
      <InfoFooter home={true} />
    </>
  );
}
