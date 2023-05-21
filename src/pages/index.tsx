import { useForm } from "react-hook-form";
import styled from "styled-components";
import SearchContext from "context/SearchContext";
import { SearchContextType } from "@/types/SearchContextType";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SearchResultContext from "context/SearchResultContext";
import { SearchResultContextType } from "@/types/SearchResultContextType";
import { SearchForm } from "@/types/SearchForm";
import { UserCard } from "@/types/UserCard";

const SearchRealtor = styled.div`


width: 100%;
height: 100%;

form{
    @media only screen and (max-width: 1000px) {

      width: 90%;
      height: 40rem;
      padding: 2rem;
      text-align: center;
      
    }
    width: 60%;
    height: 17rem;
    margin: auto;
    margin-top: 15vh;
    background-color: #ffffff8C;
    backdrop-filter: blur(5px);
    h4{
      /* font-weight: bold; */
    }
    .search-row {
      @media only screen and (max-width: 1000px){
        flex-direction: column;
      }
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 2rem 5rem;
        gap: 2rem;
        width: 100%;
    }
  }
`

export default function Home() {

  const { register, handleSubmit } = useForm<SearchForm>()

  const [cities, setCities] = useState<Array<string>>()

  const router = useRouter()

  const { setSearch } = useContext(SearchContext) as SearchContextType
  const { setSearchResult } = useContext(SearchResultContext) as SearchResultContextType

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/city')
      const data = await response.json()
      setCities(data)
    }

    fetchData()

  }, [])

  
  
  const onSubmit = async (data:SearchForm) =>{
    const fetchData = async () => {
      let url = process.env.NEXT_PUBLIC_API_URL + '/realtor?'
      if(data.search){
        url += 'search=' + data.search
        setSearch(data.search)
      } else{
        setSearch('')
      }
      const response = await fetch(url, {
        method:'GET'
      })
      const json = await response.json()
      setSearchResult(json)
      router.push('/search-result')
    }
    await fetchData()
  }

  return (

    <SearchRealtor>

      <form className="card" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-row">
          <input type="text" className="input-realtor" placeholder="Nome do Consultor"
          {...register('search')} />
          <input list="cities" type="text" className="input-city-cep" placeholder="Cidade ou CEP" 
          {...register('zipCode')}/>
          <datalist id="cities">
            {cities?.map((item, index) => (
              <option key={index} value={item}/>
            ))}
          </datalist>
          <button className="searchButton">Buscar</button>
        </div>
        <h4>Encontre um consultor pro seu próximo imóvel aqui</h4>
      </form>
    </SearchRealtor>

  )
}
