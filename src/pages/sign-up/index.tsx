import Layout from "components/Layout";
import styled from "styled-components";

const SignUpContainer = styled.div`
    width: 30vw;
    height: 75vh;
    margin: auto;
    padding: 3rem 3.5rem;
    gap: 2.5rem;
    h2 {
        padding-bottom: 2vh;
        margin-top: -10vh;
    }
    .fullName {
        display: flex;
        flex-direction: row;
        gap: 1vw;
    }
    .signUpButton {
        margin-top: 6vh;
        margin-bottom: -10vh;
    }
`

const SignUp = () => {
    return (
        <>
            <Layout>

                <SignUpContainer className="card">

                    <h2>Cadastro</h2>

                    <div className="fullName">
                        <input className="input-name" placeholder="Nome" />
                        <input className="input-name" placeholder="Sobrenome" />
                    </div>

                    <input className="input-sign-up" type="email" placeholder="E-mail" />
                    <input className="input-sign-up" type="password" placeholder="Senha" />
                    <input className="input-sign-up" type="password" placeholder="Confirmar Senha" />

                    <button className="signUpButton">Cadastrar</button>
                </SignUpContainer>

            </Layout>

        </>
    );
};

export default SignUp;