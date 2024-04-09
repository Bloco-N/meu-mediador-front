import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import LoginMoldal from "../LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "../ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from "../../public/userLoged.svg";
import iconIsLogad from "../../public/user.svg";
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
import * as C from './styles'
import { RenderConditional } from '@components/index'

interface NavBarInterface {
  showSearchBar: boolean;
}

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

const Navbar = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("GB");
  const [defaultLocale, setDefaultLocale] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1)
  const [pic, setPic] = useState("");

  const router = useRouter();
  const isLogad = localStorage.getItem("id");
  const perfilImage = isLogad ? iconIsLogad : profileIcon;
  let showSearchBar = router.pathname !== "/" ? true : false;
  const { id } = router.query;
  const pdfPage = router.query.pdf ? true : false;
  
  useEffect(() => {
    let locale = localStorage.getItem("locale");
    if (!locale) locale = router.locale as string;
    
    const localeSet = document.getElementById("locale-set") as HTMLSelectElement | null;
  
    // Verificar se o elemento foi encontrado antes de tentar acessar suas propriedades
    if (localeSet) {
      localeSet.value = locale;
    }
  
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

  const { width } = useWindowSize();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (window.innerWidth < 770) {
          // Se estiver em um dispositivo móvel, acione o onSubmit
          handleSubmit(onSubmit)();
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  let sourceUrl = "";
  let classNameImage = "";
  if (router.pathname === "/" || width > 768) {
    sourceUrl = "/logo_semFundo.png";
    classNameImage = "logo-full";
  } else {
    sourceUrl = "/sublogo.png";
    classNameImage = "logo";
  }

  function sizeWidth() {
    if (width > 768) {
      return 250;
    } else {
      if (router.pathname == "/") {
        return 220;
      }
      return 80;
    }
  }

  function sizeWidthDesk() {
      if (router.pathname == "/") {
        return 430;
      }
      return 250;
  }

  return (
    <C.Nav
      path={router.pathname}
      style={{
        justifyContent: showSearchBar
          ? "flex-start"
          : width < 768
          ? "space-between"
          : "center",
        backgroundColor: showSearchBar ? "#dedddd" : "transparent",
        paddingTop: showSearchBar ? "1rem" : "5rem",
        paddingBottom: showSearchBar ? "1rem" : "1rem",
        paddingRight: showSearchBar ? "1rem" : "0rem",
        paddingLeft: showSearchBar ? "0rem" : "0rem",
      }}
    >
      <C.Container>
      <div>
            <img
                onClick={() => router.push("/")}
                width={(width < 768) ? sizeWidth() :sizeWidthDesk()}
                src={sourceUrl}
                alt="Meoagent-logo"
                className="img-absolute"
              />

      </div>

        <RenderConditional isTrue={showSearchBar && !pdfPage}>
          <>
            <C.SearchRealtor>
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
                  {width < 768 ? null : (
                    <button className="searchButton">
                      {t.home.searchButton}
                    </button>
                  )}
                </div>
              </form>
            </C.SearchRealtor>
          </>
        </RenderConditional>

        <RenderConditional isTrue={!pdfPage}>
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
                    src={pic ? pic : perfilImage}
                    alt={"Profile"}
                    width={60}
                    height={60}
                  />
              ) : (
                <div
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  onClick={() => setOpen(!open)}
                  className={open ? "login" : "login closed"}
                >
                  {width < 768 ? (
            
                      <Image
                        onClick={() => setOpenProfile(!openProfile)}
                        className="profile"
                        src={pic ? pic : perfilImage}
                        alt={"Profile"}
                        width={60}
                        height={60}
                      />
                  
                  ) : (
                    <p>LOGIN</p>
                  )}

                  <LoginMoldal open={open} setOpen={setOpen} />
                </div>
              )}
            </div>
            <ProfileMoldal open={openProfile} setOpen={setOpenProfile} />
          </>
        </RenderConditional>
        </C.Container>
    </C.Nav>
  );
};

export default Navbar;
