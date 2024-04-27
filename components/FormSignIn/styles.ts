import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100vw;
  height: 600px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const SignInContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.form`
  background-color: #e8e8e8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid var(--border-color);
  background-color: var(--surface);
  border-radius: 3rem;
  text-align: center;
  gap: 18px;
  max-width: 580px;
  width: 80%;
  height: auto;
  padding: 1rem;
  margin: 1rem;
  justify-content: center;
  align-items: center;

  input {
    color: #3a2e2c;
    opacity: 1;
    font-weight: 600;
    height: 60px;

    @media (max-width: 768px) {
      height: 50px;
      background-color: #fff;
    }
  }

  input::placeholder {
    opacity: 0.8;
    font-weight: 500;
    color: #3a2e2c;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
`;

export const ContainerInputs = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  width: 90%;
`;

export const Input = styled.input`
  background-color: #fff;
`;

export const ErrorText = styled.p``;

export const ForgotPasswordLink = styled(Link)`
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const OrSeparator = styled.div``;

export const BorderTop = styled.div``;

export const OrText = styled.div``;

export const BottomCta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CreateAccountLink = styled(Link)``;

export const ContainerOAuth = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Div38px = styled.div`
  height: 38px;
  margin-top: 20px; /* Altere conforme necessário */
`;
