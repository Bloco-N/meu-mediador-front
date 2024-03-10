import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "./ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from "../public/profile.svg";
import { useRouter } from "next/router";
import { SearchForm } from "@/types/SearchForm";
import { useForm } from "react-hook-form";
import locales from "locales";
import SearchContext from "context/SearchContext";
import { SearchContextType } from "@/types/SearchContextType";
import SearchResultContext from "context/SearchResultContext";
import { SearchResultContextType } from "@/types/SearchResultContextType";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import api from "@/services/api";
import { FaAngleDown } from "react-icons/fa";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<any>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Chame imediatamente para definir o tamanho inicial

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Array vazio garante que o efeito seja executado apenas na montagem e desmontagem

  return windowSize;
};

const Nav = styled.div`
  /* position: relative; */
  flex-direction: row;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-area {
    height: 100%;
  }
  .logo {
  }
  .left-side {
    position: absolute;
    right: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    min-width: 100px;
    &:has(.profile) {
      align-items: center;
    }
    &:has(.profile) ~ .card {
      animation: fadeInProfile 0.4s;
    }
    @keyframes fadeInProfile {
      from {
        transform: translateY(-125px);
        opacity: 0;
      }
      to {
        transform: translateY(initial);
        opacity: 1;
      }
    }
  }
  .card {
    border: 0;
    background-color: transparent;
  }
  .locale {
    width: 5rem;
    height: 5rem;
    background-color: transparent;
    border: none;
    padding: 0.2rem;
    font-size: 1.3rem;
    option {
      background-color: transparent;
      padding: 1rem;
    }
  }
  a {
    text-decoration: none;
  }
  p {
    font-size: 1.8rem;
    cursor: pointer;
  }
  .login {
    position: relative;
    width: 125px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transition: all 0.5s;
    background-color: var(--surface);
    border: solid 0.1rem var(--border-color);
    text-align: center;
    border-radius: 1rem;
    transition: all 0.5s, border-radius 0s;
    z-index: 2;
    &:has(div) {
      border-radius: 1rem 1rem 0 0;
    }

    @media only screen and (max-width: 900px) {
      width: 95px;
      margin-right: 10px;
    }

    p {
      width: 100%;
      position: relative;
      display: flex;
      align-items: end;
      justify-content: center;
      z-index: 4;
      background-color: inherit;
      border-radius: 1rem;
      transition: border-radius 0s;

      &:hover {
        border-radius: 1rem 1rem 0 0;
        transition: border-radius 0.4s;
      }
    }

    div {
      position: absolute;
      background: inherit;
      width: calc(100% + 2px);
      border-radius: 0 0 1rem 1rem;
      top: 100%;
      left: -1px;
      border: solid 0.8px var(--border-color);
      border-top-color: transparent;
      animation: fadeIn 0.3s;
      z-index: 1;

      a {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: end;
        &:last-child::after {
          display: none;
        }

        &::after {
          content: "";
          position: absolute;
          width: 80%;
          height: 1px;
          background: rgba(0, 0, 0, 0.4);
          top: 100%;
        }
      }
      a p {
        font-size: 1.8rem;
      }
    }

    @keyframes fadeIn {
      from {
        transform: translateY(-30px);
        opacity: 1;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  .selection {
    display: flex;
    align-items: center;
    right: 25rem;
    gap: 1rem;
    background-color: var(--surface);
    border-radius: 1rem;
    padding: 1rem;
    height: 35px;
  }
  .profile {
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
    height: 120px;
    .locale-area {
      display: none;
    }
    .logo-area {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
    }
    .logo {
      height: 80px;
    }
    .profile {
    }
    .left-side {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0rem;
      min-width: 100px;
    }
  }
  @media only screen and (max-width: 900px) {
    height: 150px;
    .locale-area {
    }
    .logo-area {
      display: flex;
      height: 50px;
    }
    .logo {
    }
    .profile {
    }
    .left-side {
    }
  }

  .logo-full{
    margin-left: 2.5rem;
  }
`;
const SearchRealtor = styled.div`
  position: absolute;
  left: 32rem;
  display: flex;
  width: 700px;
  height: 70px;
  border: opx;

  form {
    background: #e9e9e985;
    max-width: 100%;
    backdrop-filter: blur(5px);
    padding: 1rem 1rem;
    border-radius: 1rem;
    .search-row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 2rem;
      width: 100%;
      height: 100%;
      .input-city-cep {
        margin: 0;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        border: 1px solid #3a2e2c5a;
        font-size: 16px;
      }
      .input-realtor {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        border: 1px solid #3a2e2c5a;
        font-size: 16px;
      }

      .input-realtor::placeholder,
      .input-city-cep::placeholder {
        font-size: 15px; /* Define o tamanho da fonte do placeholder */
      }

      .searchButton {
        padding: 0;
        width: 80%;
        height: 100%;
        border-radius: 1rem;
        font-size: 16px;
      }

        select {
          border-radius: 1rem;
          height: 100%;
          border: none;
          background-color: none;
          font-size: 18px;
          padding: 0 18px;
          border: 1px solid #3a2e2c5a;

          @media only screen and (max-width: 1100px){
            height: 25px;
            padding: 0 5px;
            font-size: 16px;
          }
        }
      /* } */
    }
  }

  @media only screen and (max-width: 1100px) {
    position: relative;
    left: 0rem;
    display: flex;
    width: 100%;
    padding-right: 80px;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 0;
    border: 0px;
    form {
      .search-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
        height: 100%;
        .input-city-cep {
          width: 140px;
          height: 25px;
          padding: 1rem;
        }
        .input-realtor {
          width: 140px;
          height: 25px;
          padding: 1rem;
        }
        .searchButton {
          width: 140px;
          height: 25px;
        }
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    width: 450px;
    form {
      .search-row {
        .input-city-cep {
          width: 160px;
        }
        .input-realtor {
          width: 160px;
        }
        .searchButton {
          width: 160px;
        }
      }
    }
  }
`;

interface NavBarInterface {
  showSearchBar: boolean;
}

const Navbar = () => {
  const { user } = useContext(UserContext) as UserContextType;

  // const [open, setOpen] = useState(false)
  const [open, setOpen] = useState(false);

  const [flag, setFlag] = useState("GB");

  const [defaultLocale, setDefaultLocale] = useState("");

  const [openProfile, setOpenProfile] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);

  const [pic, setPic] = useState("");

  const router = useRouter();

  let showSearchBar = router.pathname !== "/" ? true : false;

  const { id } = router.query;

  const pdfPage = router.query.pdf ? true : false;

  useEffect(() => {
    let locale = localStorage.getItem("locale");
    if (!locale) locale = router.locale as string;
    const localeSet = document.getElementById(
      "locale-set"
    ) as HTMLSelectElement;
    localeSet.value = locale;
    setDefaultLocale(locale);
    if (locale === "en") {
      setFlag("GB");
    } else {
      setFlag(locale.toUpperCase());
    }
    if (id && typeof id === "string") {
      const finalPath = router.asPath.replace("[id]", id);
      router.push(finalPath, finalPath, { locale });
    } else {
      router.push(router.asPath, router.asPath, { locale });
    }
  }, []);

  const changeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value as string;
    localStorage.setItem("locale", locale);
    router.push(router.asPath, router.asPath, { locale });
    setDefaultLocale(locale);
    if (locale === "en") {
      setFlag("GB");
    } else {
      setFlag(locale.toUpperCase());
    }
  };

  useEffect(() => {
    console.log(defaultLocale);
  }, [defaultLocale]);

  useEffect(() => {
    const profilePicture = localStorage.getItem("pic");
    if (profilePicture === "undefined") return;
    if (user.profilePicture) setPic(user.profilePicture);
    else if (profilePicture && profilePicture !== "null")
      setPic(profilePicture);
  }, [user]);

  const { register, handleSubmit } = useForm<SearchForm>();

  const [cities, setCities] = useState<Array<string>>();

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
  const [size2, setSize2] = useState(200);
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    handleResize();
  });

  function handleResize() {
    if (window.innerWidth < 770) {
      setSize2(inputRef.current == null ? 200 : inputRef.current.clientWidth);
    } else {
      setSize2(
        inputRef.current == null ? 200 : inputRef.current.clientWidth * 0.7
      );
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/city`)
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
    console.log(data.idSearch, "TEste 2")
    const fetchData = async () => {
      let url = data.idSearch == 1 ? "/realtor?" : "/agency?";
      if (data.search) {
        url += "search=" + data.search;
        setSearch(data.search);
      } else {
        setSearch("");
      }
      
      console.log(url , "PEdro")
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

  const { width } = useWindowSize();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (window.innerWidth < 770) {
          // Se estiver em um dispositivo móvel, acione o onSubmit
          handleSubmit(onSubmit)();
        }
      }
    };
  
    document.addEventListener('keypress', handleKeyPress);
  
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);
  

  

  return (
<Nav
  style={{
    justifyContent: showSearchBar
      ? "flex-start"
      : width < 768
      ? "space-between"
      : "center",
    backgroundColor: showSearchBar ? "#dedddd" : "transparent",
    paddingTop: showSearchBar ? "1rem" : "1rem",
    paddingBottom: showSearchBar ? "1rem" : "1rem",
    paddingRight: showSearchBar ? "1rem" : "0rem",
    paddingLeft: showSearchBar ? "1rem" : "0rem",

  }}
>
      <Link href="/" className="logo-area">
        <picture>
          {/* Imagem para telas largas */}
          <source className="logo-full" media="(min-width: 769px)" srcSet="/meoagent-logo.png" />

          {/* Imagem para telas estreitas */}
          <img className="logo" src="/sublogo.png" alt="Meoagent-logo" />
        </picture>
      </Link>
      {showSearchBar && (
        <>
          <SearchRealtor>
            <form
              className="card"
              onSubmit={handleSubmit(onSubmit)}
              ref={inputRef}
            >
              <div className="search-row">
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

                <input
                  type="text"
                  className="input-realtor"
                  placeholder={t.home.searchRealtorNamePlaceholder}
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
                {width < 768 ? null : (
                  <button className="searchButton">
                    {t.home.searchButton}
                  </button>
                )}
              </div>
            </form>
          </SearchRealtor>
        </>
      )}
      {pdfPage || (
        <>
          <div className="left-side">
            <div className="locale-area selection border">
              <Image
                alt="United States"
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
                width={20}
                height={20}
              />

              <select
                id="locale-set"
                onChange={(e) => changeLocation(e)}
                className="locale"
              >
                <option value="en">EN</option>
                <option value="pt">PT</option>
                <option value="es">ES</option>
              </select>
            </div>
            {user.token ? (
              <Image
                onClick={() => setOpenProfile(!openProfile)}
                className="profile"
                src={pic ? pic : profileIcon}
                alt={"Profile"}
                width={60}
                height={60}
              />
            ) : (
              <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className={open ? "login" : "login closed"}
                // style={width > 768 ? {} : { width: 95 }}
              >
                <p>LOGIN</p>
                <LoginMoldal open={open} setOpen={setOpen} />
              </div>
            )}
          </div>
          <ProfileMoldal open={openProfile} setOpen={setOpenProfile} />
        </>
      )}
    </Nav>
  );
};

export default Navbar;