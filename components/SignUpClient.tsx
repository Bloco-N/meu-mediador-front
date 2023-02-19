import styled from "styled-components";

const SignUp = styled.div`
    width: 30vw;
    height: 75vh;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(78, 47, 39, 0.6);
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    border-radius: 1rem;
    padding: 30px 35px;
    gap: 2rem;
    h2 {
        padding-bottom: 1vw;
        margin-top: -6vw;
    }
    .fullName {
        display: flex;
        flex-direction: row;
        gap: 1vw;
    }
    .signUpButton {
        margin-top: 2vw;
        margin-bottom: -7vw;
    }
`

const SignUpClient = () => {
    return (
        <SignUp>

            <h2>Cadastro</h2>

            <div className="fullName">
                <input className="input-name" placeholder="Nome" />
                <input className="input-name" placeholder="Sobrenome" />
            </div>

            <input className="input-sign-up" type="email" placeholder="E-mail" />
            <input className="input-sign-up" type="password" placeholder="Senha" />
            <input className="input-sign-up" type="password" placeholder="Confirmar Senha" />

            <button className="signUpButton">Cadastrar</button>
        </SignUp>
    );
};

export default SignUpClient;