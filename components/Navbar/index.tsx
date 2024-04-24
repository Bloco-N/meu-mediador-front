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
import Modal, { IModalProps } from "@components/Modal";
import { MdCloseFullscreen } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { isMobileDevice } from "@/utils";
import InfoFooter from "@components/InfoFooter";
import { Popover } from "@components/Popover";

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

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const Navbar:React.FC<any> = ({ children }) => {
  // Contexts
  const { setSearch } = useContext(SearchContext) as SearchContextType;
  const { setSearchResult } = useContext(SearchResultContext) as SearchResultContextType;
  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType;
  const { user } = useContext(UserContext) as UserContextType;

  // States
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("GB");
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1)
  const [pic, setPic] = useState("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [cities, setCities] = useState<Array<string>>();
  const [defaultLocale, setDefaultLocale] = useState('pt')
  const { width } = useWindowSize();

  const inputRef = useRef<any>(null);
  const { register, handleSubmit } = useForm<SearchForm>();
  // Control Variables
  const configModal:IModalProps = {
    childSize: { width:'250px',height:'280px',radius:10},
    isOpen:isOpenModal,
    onClose: () => {}
  }
  const router = useRouter();
  let isLogad;
  if (typeof localStorage !== 'undefined') {
    isLogad = localStorage.getItem("id");
  } 
  const perfilImage = isLogad ? iconIsLogad : profileIcon;
  const { id } = router.query;
  const pdfPage = router.query.pdf ? true : false;
  const { locale } = router;
  const t = locales[locale as keyof typeof locales];

  let showSearchBar = router.pathname !== "/" ? true : false;
  let sourceUrl = "";
  let classNameImage = "";

  if (router.pathname === "/" || width >= 768) {
    sourceUrl = "/logo_semFundo.png";
    classNameImage = "logo-full";
  } else {
    sourceUrl = "/sublogo.png";
    classNameImage = "logo";
  }

  useEffect(() => {
    const localeSet = document.getElementById('locale-set-footer') as HTMLSelectElement
    let locale = localStorage.getItem('locale') as string;

    if(!locale) {
      localeSet.value = 'pt'
      locale = 'pt'
    }else{
      localeSet.value = locale
      setDefaultLocale(locale)
    }

    
    if(locale === 'en'){
      setFlag('GB')
    }else{
      setFlag(locale.toUpperCase())
    }
  }, [])

  // Initialization
  useEffect(() => {
    const profilePicture = localStorage.getItem("pic");
    if (profilePicture === "undefined") return;
    if (user.profilePicture) setPic(user.profilePicture);
    else if (profilePicture && profilePicture !== "null")
      setPic(profilePicture);
  }, [user]);

  useEffect(() => {
    fetchData();

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (window.innerWidth < 770) {
          // Se estiver em um dispositivo móvel, acione o onSubmit
          handleSubmit(onSubmit)();
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    let locale = localStorage.getItem("locale");
    if (!locale) locale = router.locale as string;
    
    const localeSet = document.getElementById("locale-set") as HTMLSelectElement | null;
  
    if (localeSet) {
      localeSet.value = locale;
    }
  
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
    
    setIsMobile(isMobileDevice())

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
    
  }, []);

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
  
  const changeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value as string;
    localStorage.setItem("locale", locale);
    setDefaultLocale(locale)
    router.push(router.asPath, router.asPath, { locale });
    if (locale === "en") {
      setFlag("GB");
    } else {
      setFlag(locale.toUpperCase());
    }
  };

  function PopupSearch(){
    return (
      <Modal {...configModal}>
      <C.ContainerModal
        onSubmit={handleSubmit(onSubmit)}
        ref={inputRef}
      >
        <C.HeaderActionsModal>
            <MdCloseFullscreen
              onClick={() => setIsOpenModal(false)} 
              size={30}
            />
        </C.HeaderActionsModal>
        <C.ContainerInputs>
            <C.BoxInput>
                <select
                  value={selectedValue}
                  className="select-type"
                  {...register("idSearch", {
                      required: true,
                      onChange: (e) => setSelectedValue(e.target.value),
                  })}
                  >
                  <option value={1}>{t.home.realtor}</option>
                  <option value={2}>{t.home.agency}</option>
              </select>
            </C.BoxInput>

            <C.BoxInput>
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
            </C.BoxInput>

            <C.BoxInput>
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
          </C.BoxInput>

        </C.ContainerInputs>

        <C.FooterActionsModal>
            <div className="content-search-button">
                <button className="searchButton">
                {t.home.searchButton}
                </button>
              </div>
        </C.FooterActionsModal>
      </C.ContainerModal>

    </Modal>
    )
  }

  const onSubmit = async (data: SearchForm) => {
    setIsOpenModal(false)
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
    <C.ContainerNavbar>
    <PopupSearch/>
    <C.Nav path={router.pathname}>
      <C.Container>
        <span/>
        <C.BoxSearch path={router.pathname}>

        <div className="box-image">
          <C.LogoImage
            path={router.pathname}
            onClick={() => router.push("/")}
            src={sourceUrl}
            alt="Meoagent-logo"
          />
        </div>

        <RenderConditional isTrue={showSearchBar && !pdfPage}>
            <C.SearchRealtor>
              <form
                className="card"
                onSubmit={handleSubmit(onSubmit)}
                ref={inputRef}
              >
                  <div className="search-row">
                    <RenderConditional isTrue={width > 727}>
                      <div className='inputs-search'>
                        <div>
                          <select
                            value={selectedValue}
                            className="select-type"
                            {...register("idSearch", {
                              required: true,
                              onChange: (e) => setSelectedValue(e.target.value),
                            })}
                          >
                            <option value={1}>{t.home.realtor}</option>
                            <option value={2}>{t.home.agency}</option>
                          </select>
                        </div>
                          <div>
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
                          </div>
                          <div>
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
                        </div>
                      </div>
                    </RenderConditional>
                    <RenderConditional isTrue={width > 727}>
                      <div className="content-search-button">
                        <button className="searchButton">
                          {t.home.searchButton}
                        </button>
                      </div>
                    </RenderConditional>
                  </div>
              </form>
            </C.SearchRealtor>
        </RenderConditional>
        </C.BoxSearch>

        <RenderConditional isTrue={!pdfPage}>
          <>
            <div className="left-side">
                <RenderConditional isTrue={ showSearchBar && width <= 727}>
                  <span 
                    className="box-icon-search"
                    onClick={() => setIsOpenModal(true)}
                    >
                      <FaSearch/>
                  </span>
                </RenderConditional>

                <RenderConditional isTrue={width >= 820}>
                    <div className="locale-area selection border">
                      <Image
                        alt="select-language"
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
                        width={20}
                        height={20}
                      />
                      
                      <select 
                        id="locale-set-footer"
                        name="language"
                        onChange={e => changeLocation(e)}
                        className="locale"
                        value={defaultLocale}
                        >
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                    <option value="es">ES</option>
                  </select>
                    </div>
                </RenderConditional>

                <RenderConditional isTrue={!!user.token}>
                  <div className="profile-container">
                  {/* <Popover showArrow triggerNode={                  <Image
                        onClick={() => setOpenProfile(!openProfile)}
                        className="profile"
                        src={pic ? pic : perfilImage}
                        alt={"Profile"}
                        width={60}
                        height={60}
                      />} trigger="click">
                                          <Image
                        onClick={() => setOpenProfile(!openProfile)}
                        className="profile"
                        src={pic ? pic : perfilImage}
                        alt={"Profile"}
                        width={60}
                        height={60}
                      />
                </Popover> */}
                  <Image
                        onClick={() => setOpenProfile(!openProfile)}
                        className="profile"
                        src={pic ? pic : perfilImage}
                        alt={"Profile"}
                        width={60}
                        height={60}
                      />

                  </div>

                </RenderConditional>

                <RenderConditional isTrue={!user.token}>
                  <div
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    onClick={() => setOpen(!open)}
                    className={open ? "login" : "login"}
                    >

                    <RenderConditional isTrue={width < 768}>
                        <Image
                          onClick={() => setOpenProfile(!openProfile)}
                          className="profile"
                          src={pic ? pic : perfilImage}
                          alt={"Profile"}
                          width={60}
                          height={60}
                        />
                    </RenderConditional>

                    <RenderConditional isTrue={width >= 768}>
                      <p>LOGIN</p>
                    </RenderConditional>
                    
                    <LoginMoldal open={open} setOpen={setOpen} />
                  </div>
                </RenderConditional>

            </div>
            <ProfileMoldal open={openProfile} setOpen={setOpenProfile} />
          </>
        </RenderConditional>

        </C.Container>
      </C.Nav>
      <C.ContentNavbar isMobileDevice={isMobile}>
        {children}
        <RenderConditional isTrue={router.pathname === "/"}>
          <InfoFooter home={true} />
        </RenderConditional>
      </C.ContentNavbar>
    </C.ContainerNavbar>

  );
};

export default Navbar;
