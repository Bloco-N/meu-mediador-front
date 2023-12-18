import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';
import { useContext, useEffect, useRef, useState } from "react";
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "./ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from '../public/profile.svg'
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

const Nav = styled.div`
    position: relative;
    flex-direction: row;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 3rem 6rem;
    position: relative;
    @media only screen and (max-width: 500px){
      padding: 47px 47px 10px 47px;
    }
    /* .logo-area {
      height: 100%;
      display: flex;
      place-items: center;
    } */

    .logo{
      height: 60px;
      
      @media only screen and (max-width: 420px){
        height: 35px;
      }
      @media only screen and (max-width: 390px){
        /* height: 30px; */
      }
    }
    .left-side{
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
        /* transform: translateY(calc(-100% + 30px)); */
        animation: fadeInProfile .4s;

        @media (max-width: 501px) {
          top: 100%;
        }
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
    @media only screen and (max-width: 850px){
      justify-content: space-between;

      .left-side {
        position: initial;
      }
    }
    .card {
      /* top: calc(100% + 20px); */
    }
    .locale{
      width: 5rem;
      height: 5rem;
      background-color: transparent;
      border: none;
      padding: 0.2rem;
      font-size: 1.3rem;
      option{
        background-color: transparent;
        padding: 1rem;
      }
    }
    a {
        text-decoration: none;
    }
    p{
      font-size: 1.8rem;
      cursor: pointer;
    }
    .login{
      position: relative;
      width: 125px;
      height: 35px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      transition: all .5s;
      background-color: var(--surface);
      border: solid 0.1rem var(--border-color );
      text-align: center;
      border-radius: 1rem;
      transition: all .5s, border-radius 0s;
      z-index: 2;

      &:has(div) {
        border-radius: 1rem 1rem 0 0;

        /* & > p {
          position: relative;
          display: flex;
          align-content: center;

          &:last-child::after {
            display: none;
          }

          &::after {
            content: '';
            position: absolute;
            width: 80%;
            height: 1px;
            background: rgba(0,0,0,.4);
            top: calc(100% + 4px);
          }
        } */
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
        transition: border-radius .0s;
        
        &:hover {
          border-radius: 1rem 1rem 0 0;
          transition: border-radius .4s;
        }
      }

      div {
        position: absolute;
        background: inherit;
        width: calc(100% + 2px);
        border-radius: 0 0 1rem 1rem;
        top: 100%;
        left: -1px;
        border: solid 0.8px var(--border-color );
        border-top-color: transparent;
        animation: fadeIn .3s;
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
            content: '';
            position: absolute;
            width: 80%;
            height: 1px;
            background: rgba(0,0,0,.4);
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

      @media only screen and (max-width: 500px){
        position: relative;
        width: 100px;
        /* height: 24px; */
        top: 0;
        right: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .5s, border-radius 0s;

        &:has(div) {
          border-radius: 1rem 1rem 0 0;
          div {
            position: absolute;
            background: #e8e8e8;
            top: 100%;
            border-radius: 0 0 1rem 1rem;
            animation: apear .5s forwards;

            a{
              display: flex;
              position: relative;
              justify-content: center;
              align-items: end;
              img {
                display: none;
              }
            }
          }
        }

        p {
          padding: 4px 0;
          font-size: 1.7rem;
        }
      }
      @media only screen and (max-width: 420px) {
        /* width: 75px; */
        font-size: 1.65rem;
      }
      @media only screen and (max-width: 390px){
        width: 100px;
        font-size: 1.6rem;
      }
    }
    .selection{
      /* position: absolute; */
      display: flex;
      align-items: center;
      right: 25rem;
      gap: 1rem;
      background-color: var(--surface);
      border-radius: 1rem;
      padding: 1rem;
      height: 35px;
      @media (max-width: 768px) {
        display: none;
      }
    }
    .profile{
      cursor: pointer;
      border-radius: 50%;
      object-fit: cover;
    }
    
`
const SearchRealtor = styled.div`
  position: absolute;
  left: 3%;
  display: flex;
  width: 600px;
  height: 70px;
  form {
    background: #e9e9e985;
    max-width: 100%;
    backdrop-filter: blur(5px);
    padding: 1rem 1rem;
    border-radius: 10px;
    .search-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      width: 100%;

      @media only screen and (max-width: 1190px) {
        flex-direction: column;
        input {
        }
      }
      @media (max-width: 768px) {
        padding: 2rem 0rem;
        gap: 3rem;
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
      height: 136px;
      input {
        border: 1px solid #3a2e2c5a;
      }
      input,
      .searchButton {
        background: #fff;
      }
      .searchButton,
    }
  }
  .novo-botao{
    color:blue;
    text-decoration: underline;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 4rem;
    .card {
      width: 100%;
    }
  }
  .input-city-cep{
    height: 50px;
    border-radius: 10px;
  }
  .input-realtor{
    height: 50px;
    border-radius: 10px;
  }
  .searchButton{
    height: 20px;
  }

`;

interface NavBarInterface{
  showSearchBar: boolean
}

const Navbar = ({showSearchBar}: NavBarInterface) => {

    const { user } = useContext(UserContext) as UserContextType

    // const [open, setOpen] = useState(false)
    const [open, setOpen] = useState(false)

    const [flag, setFlag] = useState('GB')

    const [defaultLocale, setDefaultLocale] = useState('')

    const [openProfile, setOpenProfile] = useState(false)

    const [pic, setPic] = useState('')

    const router = useRouter()

    const { id } = router.query

    const pdfPage = router.query.pdf?true:false;
    
    useEffect(() => {
      let locale = localStorage.getItem('locale')
      if(!locale) locale = router.locale as string
      const localeSet = document.getElementById('locale-set') as HTMLSelectElement
      localeSet.value = locale
      setDefaultLocale(locale)
      if(locale === 'en'){
        setFlag('GB')
      }else{
        setFlag(locale.toUpperCase())
      }
      if(id && typeof id === 'string'){
        const finalPath = router.asPath.replace('[id]', id)
        router.push(finalPath, finalPath, { locale })
      }else{
        router.push(router.asPath, router.asPath, { locale })
      }

    }, [])

    const changeLocation = (e:React.ChangeEvent<HTMLSelectElement>) => {
      const locale = e.target.value as string
      localStorage.setItem('locale', locale)
      router.push(router.asPath, router.asPath, { locale })
      setDefaultLocale(locale)
      if(locale === 'en'){
        setFlag('GB')
      }else{
        setFlag(locale.toUpperCase())
      }

    }

    useEffect(() => { console.log(defaultLocale)}, [defaultLocale])

    useEffect(() => {
      const profilePicture = localStorage.getItem('pic')
      if(profilePicture === "undefined") return
      if(user.profilePicture) setPic(user.profilePicture)
      else if(profilePicture && profilePicture !== 'null') setPic(profilePicture)
    }, [user])
    
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

  function handleResize(){
    if (window.innerWidth < 770){
          setSize2(inputRef.current == null ? 200 : inputRef.current.clientWidth);
    }else{
      setSize2(inputRef.current == null ? 200 : inputRef.current.clientWidth*0.7);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/city");
      const data = await response.json();
      setCities(data);
    };

    fetchData();
  }, []);
    const onSubmit = async (data: SearchForm) => {
      const fetchData = async () => {
        let url = process.env.NEXT_PUBLIC_API_URL + "/realtor?";
        if (data.search) {
          url += "search=" + data.search;
          console.log( url );
          setSearch(data.search);
        } else {
          setSearch("");
        }
        const response = await fetch(url, {
          method: "GET",
        });
        const json = await response.json();
        setSearchResult(json);
        router.push("/search-result");
      };
      setLoadingOpen(true);
      await fetchData();
      setLoadingOpen(false);
    };
    
    return (
        <Nav>
            {showSearchBar && 
              <>
                <SearchRealtor >
                  <form className="card" onSubmit={handleSubmit(onSubmit)} ref={inputRef}>
                    <div className="search-row">
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

                      <button className="searchButton">{t.home.searchButton}</button>
                    </div>
                  </form>
                  
                </SearchRealtor>
              </>
            }
            <Link href="/" className="logo-area">
                <img className="logo" src="/meoagent-logo.png" alt="Meoagent-logo" />
            </Link>
            {pdfPage || <>
              <div className="left-side">
                <div className="locale-area selection border">
                  <Image
                    alt="United States"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
                    width={20}
                    height={20}
                  />
                  <select id="locale-set" onChange={e => changeLocation(e)} className="locale">
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                    <option value="es">ES</option>
                  </select>
                </div>
                {user.token ? (
                    <Image onClick={() => setOpenProfile(!openProfile)} className="profile" src={pic ? pic :  profileIcon} alt={'Profile'} width={60} height={60}/>
                ): (
                    <div
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                      className = { open ? 'login' : 'login closed'}
                      >
                      <p>
                        LOGIN
                      </p>
                      <LoginMoldal open={ open } setOpen = { setOpen }/>
                    
                    </div>
                )}
              </div>

              <ProfileMoldal open={openProfile} setOpen={setOpenProfile}/>
            </>}
        </Nav>
    );
};

export default Navbar;