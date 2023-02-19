import Layout from 'components/Layout';
import styled from "styled-components";

const SearchRealtor = styled.div`
    width: 60vw;
    height: 30vh;
    margin: auto;
    margin-top: 15vh;
    .search-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 23px 51px;
        gap: 2rem;
    }
`

export default function Home() {
  return (
    <>
      <Layout>

        <SearchRealtor className="card">
          <div className="search-row">
            <input className="input-realtor" placeholder="Nome do Consultor" />
            <input className="input-city-cep" placeholder="Cidade ou CEP" />
            <button className="searchButton">Buscar</button>
          </div>
          <h4>Encontre um consultor pro seu próximo imóvel aqui</h4>
        </SearchRealtor>

      </Layout>
    </>
  )
}
