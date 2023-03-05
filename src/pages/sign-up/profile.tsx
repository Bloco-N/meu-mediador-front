import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;

`

const ChooseProfileTitle = styled.div`
  width: 100%;
  font-weight: normal;
  padding: 2rem;
  h1{
    
    font-weight: normal;
  }
  `

const ViewProfile = styled.div`
    width: 80rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5rem;
`

const NameProfile = styled.div`
    width: 20rem;
    height: 10rem;
    background-color: var(--base);
`

const DescriptionProfile = styled.div`
    width: 65rem; 
    margin: auto;
    display: none;
    text-align: center;
    align-items: center;
    padding: 2rem;
    h3{
      font-weight: normal;
    }
`

const ChooseProfile = styled.div`
    height: 25rem;
    gap: 2rem;
    display: flex;
    align-items: center;
    background-color: var(--text);
    flex-direction: column;
    padding: 4rem;
    border-radius: 2rem;
    background-color: rgba(78, 47, 39, 0.6);
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.25);
`

const Profile = () => {

  // Client Description
    function showClientDescription() {
        if (typeof window !== 'undefined') {

            const showClientDescription = document.querySelector(".description-client-profile") as HTMLElement;
            showClientDescription.style.display = "block";

        }
    }

    function hideClientDescription() {
        if (typeof window !== 'undefined') {

            const hideClientDescription = document.querySelector(".description-client-profile") as HTMLElement;
            hideClientDescription.style.display = "none";
        }
    }

    // Realtor Description
    function showRealtorDescription() {
        if (typeof window !== 'undefined') {

            const showRealtorDescription = document.querySelector(".description-realtor-profile") as HTMLElement;
            showRealtorDescription.style.display = "block";

        }
    }

    function hideRealtorDescription() {
        if (typeof window !== 'undefined') {

            const hideRealtorDescription = document.querySelector(".description-realtor-profile") as HTMLElement;
            hideRealtorDescription.style.display = "none";
        }
    }

    // Agency Description
    function showAgencyDescription() {
        if (typeof window !== 'undefined') {

            const showAgencyDescription = document.querySelector(".description-agency-profile") as HTMLElement;
            showAgencyDescription.style.display = "block";

        }
    }

    function hideAgencyDescription() {
        if (typeof window !== 'undefined') {

            const hideAgencyDescription = document.querySelector(".description-agency-profile") as HTMLElement;
            hideAgencyDescription.style.display = "none";
        }
    }

    return (
      <Container>
        <ChooseProfileTitle className="card">
            <h1>Selecione o tipo de perfil que deseja criar</h1>
        </ChooseProfileTitle>

        <ChooseProfile className="choose-profile">

            <ViewProfile className="view-profile">

                <Link className="link choose-profile-client" href="/sign-up/client" // const sign up default
                    onMouseEnter={showClientDescription}
                    onMouseLeave={hideClientDescription}>

                    <NameProfile className="card choose-profile-client">
                        Cliente
                    </NameProfile>

                </Link>

                <Link className="link choose-profile-realtor" href="/sign-up/realtor" // const sign up default
                    onMouseEnter={showRealtorDescription}
                    onMouseLeave={hideRealtorDescription}>
                    <NameProfile className="card choose-profile-realtor">
                        Consultor
                    </NameProfile>
                </Link>

                <Link className="link choose-profile-agency" href="/sign-up/agency" // const sign up agency
                    onMouseEnter={showAgencyDescription}
                    onMouseLeave={hideAgencyDescription}>
                    <NameProfile className="card choose-profile-agency">
                        Agência
                    </NameProfile>
                </Link>

            </ViewProfile>

            <DescriptionProfile className="description-client-profile">
                <h3>Está em busca de um consultor para conquistar seu próximo imóvel?</h3>
            </DescriptionProfile>

            <DescriptionProfile className="description-realtor-profile">
                <h3>Divulgue suas vendas, atraia clientes e se associe a sua empresa</h3>
            </DescriptionProfile>

            <DescriptionProfile className="description-agency-profile">
                <h3>Cadastre sua empresa para associar seus consultores e divulgar seus imóveis a venda</h3>
            </DescriptionProfile>

        </ChooseProfile>
      </Container>



    );
};

export default Profile;