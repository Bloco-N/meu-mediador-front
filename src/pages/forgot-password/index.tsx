import styled from "styled-components";

const ForgotPasswordContainer = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  h4{
    font-size: 1.3rem;
  }
  h2{
    margin-bottom: 2rem;
  }
  padding: 2rem 3rem;
`

const ForgotPassword = () => {
    return (
      <ForgotPasswordContainer className="card">

          <h2>Recuperar Senha</h2>

          <input className="input-forgot-password" type="email" placeholder="E-mail" />
          <h4>Informe um email para recuperar sua senha</h4>

          <button className="forgotPasswordButton">Enviar</button>

      </ForgotPasswordContainer>
    );
};

export default ForgotPassword;