import Layout from "components/Layout";
import Link from "next/link";
import styled from "styled-components";

const ChooseProfileTitle = styled.div`
    text-align: center;
    margin: auto;
    background-color: var(--surface-2);
    width: 35vw;
    border-radius: 1rem;
`

const ChooseProfileContainer = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: row;
    margin: auto;
    margin-top: 10vh;
    justify-content: space-between;
`

const ProfileContainer = styled.div`
    width: 20vw;
    height: 20vw;
`

const ProfileDescriptionContainer = styled.div`
    width: 60vw;
    height: 10vh;
    margin: auto;
    margin-top: 10vh;
    display: none;
`

const Profile = () => {
    return (
        <Layout>

            <ChooseProfileTitle>
                <h1>Selecione o tipo de perfil que deseja criar</h1>
            </ChooseProfileTitle>

            <ChooseProfileContainer className="choose-profile">

                <Link className="link choose-profile-client" href="/sign-up">

                    <ProfileContainer className="card choose-profile-client">

                        <button className="profileButton">Cliente</button>

                    </ProfileContainer>
                </Link>

                <Link className="link choose-profile-realtor" href="/sign-up">
                    <ProfileContainer className="card choose-profile-realtor">
                        <button className="profileButton">Consultor</button>
                    </ProfileContainer>
                </Link>

                <Link className="link choose-profile-agency" href="/sign-up">
                    <ProfileContainer className="card choose-profile-agency">
                        <button className="profileButton">Agência</button>
                    </ProfileContainer>
                </Link>

            </ChooseProfileContainer>

            <ProfileDescriptionContainer className="card description-client-profile">
                <h4>Está em busca de um consultor para conquistar seu próximo imóvel?</h4>
            </ProfileDescriptionContainer>

            <ProfileDescriptionContainer className="card description-client-realtor">
                <h3>Crie seu perfil e atraia clientes</h3>
            </ProfileDescriptionContainer>

            <ProfileDescriptionContainer className="card description-client-agency">
                <h3>Cadastre sua empresa para associar seus consultores e divulgar seus imóveis a venda</h3>
            </ProfileDescriptionContainer>

        </Layout>
    );
};

export default Profile;