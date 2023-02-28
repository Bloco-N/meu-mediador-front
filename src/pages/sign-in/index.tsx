import Link from "next/link";
import styled from "styled-components";

const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form{
    text-align: center;
    width: 30%;
    height: 45rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
  }
`

const SignIn = () => {
    return (
      <SignInContainer>

        <form className="card" action="">

          <h2>Login</h2>

          <input className="input-sign-up" type="email" placeholder="E-mail" />
          <input className="input-sign-up" type="password" placeholder="Senha" />

          {/* <Link className="forgot-password" href="/forgot-password">Esqueci minha senha</Link> */}

          <button>Entrar</button>

          <h5>Ainda não tem uma conta? <Link className="create-account" href="/sign-up/profile">Cadastre-se aqui</Link></h5>
        </form>


      </SignInContainer>

    );
};

export default SignIn;