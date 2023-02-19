import styled from "styled-components";

const SearchRealtor = styled.div`
    width: 60vw;
    height: 30vh;
    display: flex;
    margin: auto;
    margin-top: 15vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(78, 47, 39, 0.6);
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    border-radius: 1rem;
    .search-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 23px 51px;
        gap: 2rem;
    }
`

const FindRealtor = () => {
    return (
        <SearchRealtor>
            <div className="search-row">
                <input className="input-realtor" placeholder="Nome do Consultor" />
                <input className="input-city-cep" placeholder="Cidade ou CEP" />
                <button className="searchButton">Buscar</button>
            </div>
            <h4>Encontre um consultor pro seu próximo imóvel aqui</h4>
        </SearchRealtor>
    );
};

export default FindRealtor;