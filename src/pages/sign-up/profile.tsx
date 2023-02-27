import Layout from "components/Layout";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const ChooseProfileTitle = styled.div`
    text-align: center;
    margin: auto;
    background-color: var(--surface-2);
    width: 35vw;
    border-radius: 1rem;
`

const ViewProfile = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: row;
    margin: auto;
    margin-top: 10vh;
    justify-content: space-between;
`

const NameProfile = styled.div`
    width: 20vw;
    height: 20vw;
`

const DescriptionProfile = styled.div`
    width: 65vw;
    height: 8vh;
    margin: auto;
    margin-top: 10vh;
    display: none;
    text-align: center;
    align-items: center;
    padding-top: 2vh;
`

const ChooseProfile = styled.div`
    display: flex;
    flex-direction: column;
`

const Profile = () => {

    // Client Description
    function showClientDescription() {
        if (typeof window !== 'undefined') {

            const showClientDescription = document.querySelector(".description-client-profile");
            showClientDescription.style.display = "block";

        }
    }

    function hideClientDescription() {
        if (typeof window !== 'undefined') {

            const hideClientDescription = document.querySelector(".description-client-profile");
            hideClientDescription.style.display = "none";
        }
    }

    // Realtor Description
    function showRealtorDescription() {
        if (typeof window !== 'undefined') {

            const showRealtorDescription = document.querySelector(".description-realtor-profile");
            showRealtorDescription.style.display = "block";

        }
    }

    function hideRealtorDescription() {
        if (typeof window !== 'undefined') {

            const hideRealtorDescription = document.querySelector(".description-realtor-profile");
            hideRealtorDescription.style.display = "none";
        }
    }

    // Agency Description
    function showAgencyDescription() {
        if (typeof window !== 'undefined') {

            const showAgencyDescription = document.querySelector(".description-agency-profile");
            showAgencyDescription.style.display = "block";

        }
    }

    function hideAgencyDescription() {
        if (typeof window !== 'undefined') {

            const hideAgencyDescription = document.querySelector(".description-agency-profile");
            hideAgencyDescription.style.display = "none";
        }
    }

    return (

        <Layout>

            <ChooseProfileTitle>
                <h1>Selecione o tipo de perfil que deseja criar</h1>
            </ChooseProfileTitle>

            <ChooseProfile className="choose-profile">

                <ViewProfile className="view-profile">

                    <Link className="link choose-profile-client" href="/sign-up" // const sign up default
                        onMouseEnter={showClientDescription}
                        onMouseLeave={hideClientDescription}>

                        <NameProfile className="card choose-profile-client">
                            <button className="profileButton">Cliente</button>
                        </NameProfile>

                    </Link>

                    <Link className="link choose-profile-realtor" href="/sign-up" // const sign up default
                        onMouseEnter={showRealtorDescription}
                        onMouseLeave={hideRealtorDescription}>
                        <NameProfile className="card choose-profile-realtor">
                            <button className="profileButton">Consultor</button>
                        </NameProfile>
                    </Link>

                    <Link className="link choose-profile-agency" href="/sign-up" // const sign up agency
                        onMouseEnter={showAgencyDescription}
                        onMouseLeave={hideAgencyDescription}>
                        <NameProfile className="card choose-profile-agency">
                            <button className="profileButton">Agência</button>
                        </NameProfile>
                    </Link>

                </ViewProfile>

                <DescriptionProfile className="card description-client-profile">
                    <h3>Está em busca de um consultor para conquistar seu próximo imóvel?</h3>
                </DescriptionProfile>

                <DescriptionProfile className="card description-realtor-profile">
                    <h3>Divulgue suas vendas, atraia clientes e se associe a sua empresa</h3>
                </DescriptionProfile>

                <DescriptionProfile className="card description-agency-profile">
                    <h3>Cadastre sua empresa para associar seus consultores e divulgar seus imóveis a venda</h3>
                </DescriptionProfile>

            </ChooseProfile>


        </Layout>
    );
};

export default Profile;