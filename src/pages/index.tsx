import { useForm } from "react-hook-form";
import styled from "styled-components";

const SearchRealtor = styled.div`
  
  width: 100%;
  height: 100%;

  form{
    width: 60%;
    height: 20rem;
    margin: auto;
    margin-top: 15vh;
    .search-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 2rem 5rem;
        gap: 2rem;
    }
  }
`

export default function Home() {

  const { register } = useForm()

  return (

    <SearchRealtor>

      <form className="card" action="">
        <div className="search-row">
          <input className="input-realtor" placeholder="Nome do Consultor" />
          <input className="input-city-cep" placeholder="Cidade ou CEP" />
          <button className="searchButton">Buscar</button>
        </div>
        <h4>Encontre um consultor pro seu próximo imóvel aqui</h4>
      </form>
    </SearchRealtor>

  )
}
