import Layout from "components/Layout";
import Link from "next/link";
import styled from "styled-components";

const SignInContainer = styled.div`
    width: 28vw;
    height: 60vh;
    margin: auto;
    gap: 2.5rem;
    h2 {
        padding-bottom: 2vh;
        margin-top: -5vh;
    }
    h5 {
        margin-top: 3vh;
        margin-bottom: -5vh;
    }
    .signInButton {
        margin-top: 3vh;
    }
`

const SignIn = () => {
    return (
        <Layout>

            <SignInContainer className="card">

                <h2>Login</h2>

                <input className="input-sign-up" type="email" placeholder="E-mail" />
                <input className="input-sign-up" type="password" placeholder="Senha" />

                <Link className="forgot-password" href="/">Esqueci minha senha</Link>

                <button className="signInButton">Entrar</button>

                <h5>Ainda não tem uma conta? Cadastre-se<Link className="create-account" href="/sign-up/profile"> aqui</Link></h5>

            </SignInContainer>


        </Layout>
    );
};

export default SignIn;