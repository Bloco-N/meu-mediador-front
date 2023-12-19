import { useForm } from "react-hook-form";
import styled from "styled-components";
import SearchContext from "context/SearchContext";
import { SearchContextType } from "@/types/SearchContextType";
import { useRouter } from "next/router";
import { useRef,useContext, useEffect, useState } from "react";
import SearchResultContext from "context/SearchResultContext";
import { SearchResultContextType } from "@/types/SearchResultContextType";
import { SearchForm } from "@/types/SearchForm";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import locales from "../../locales";
import InfoFooter from "components/InfoFooter";

const SearchRealtor = styled.div`
  width: 100%;
  height: auto;
  padding: 0 37px;
  margin-bottom: 60px;
  margin-top: 16rem;

  form {
    background: #e9e9e985;
    max-width: 45%;
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
      /* padding: 2rem 5rem; */
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
      h4 {
        color: #3a2e2c;
        opacity: 1;
      }
    }
  }
  .novo-botao{
    color:blue;
    text-decoration: underline;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 27px;
    margin-top: 4rem;
    .card {
      width: 100%;
      height: 332px;
      padding: 0 27px;
    }
  }

`;

const NovoCadastro = styled.div`
    margin-top:-50px;
    text-align: center;
  height: auto;
  padding: 0 37px;
  border-radius: 1.8rem;
  

  
    background: #e9e9e985;

    
    
    height: fit-content;
   
    backdrop-filter: blur(5px);
    padding: 1rem 3rem;

    h4 {
      font-weight: 600;
      margin-top: 0px;
    }



    @media only screen and (max-width: 990px) {
      
      
    }
  
  .novo-botao{
    color:blue;
    text-decoration: underline;
  }

`;
export default function Home() {
  const { register, handleSubmit } = useForm<SearchForm>();

  const [cities, setCities] = useState<Array<string>>();

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
        setSearch(data.search);
      } 

      if (data.zipCode) {
        url += "search=" + data.zipCode;
        setSearch(data.search);
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
        <h4>{t.home.welcome}</h4>
      </form>
      
    </SearchRealtor>
    <NovoCadastro className="novo-cadastro2" style={{ width: `${size2}px` }}>
      <h4 >Já faz parte do Meoagent? <a className="novo-botao">Criar nova conta.</a></h4>
    </NovoCadastro>
    <InfoFooter/>
    </>
  );
}
