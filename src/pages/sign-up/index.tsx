import styled from "styled-components";

const SignUpContainer = styled.div`
  width: 100%;
  form{
    width: 30%;
    height: 55rem;
    margin: auto;
    padding: 3rem 3.5rem;
    gap: 2.5rem;

    .full-name{
      display: flex;
      gap: 2rem;
    }

  }
`

const SignUp = () => {
    return (

      <SignUpContainer>

        <form className="card" action="">

          <h2>Cadastro</h2>

          <div className="full-name">
              <input className="input-name" placeholder="Nome" />
              <input className="input-name" placeholder="Sobrenome" />
          </div>

          <input className="input-sign-up" type="email" placeholder="E-mail" />
          <input className="input-sign-up" type="password" placeholder="Senha" />
          <input className="input-sign-up" type="password" placeholder="Confirmar Senha" />

          <button>Cadastrar</button>

        </form>

      </SignUpContainer>

    );
};

export default SignUp;