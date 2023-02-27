import Layout from "components/Layout";
import styled from "styled-components";

const ForgotPasswordContainer = styled.div`
    width: 30vw;
    height: 50vh;
    margin: auto;
    margin-top: 15vh;
    padding: 3rem 3.5rem;
    gap: 2.5rem;
    h2 {
        margin-top: -8vh;
        padding-bottom: 5vh;
    }
    button {
        margin-bottom: -10vh;
        margin-top: 2vh;
    }
`

const ForgotPassword = () => {
    return (
        <Layout>

            <ForgotPasswordContainer className="card">

                <h2>Recuperar Senha</h2>

                <h4>Informe um email para recuperar sua senha</h4>

                <input className="input-forgot-password" type="email" placeholder="E-mail" />

                <button className="forgotPasswordButton">Enviar</button>

            </ForgotPasswordContainer>

        </Layout>
    );
};

export default ForgotPassword;