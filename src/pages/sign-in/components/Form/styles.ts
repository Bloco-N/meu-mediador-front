import styled from "styled-components";
import Link from "next/link";
import { isMobileDevice } from "@/utils";

export const Container = styled.div`
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SignInContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  gap: 4;
`;

export const Card = styled.form`
  background-color: #e8e8e8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: .1rem solid var(--border-color);
  background-color: var(--surface);
  border-radius: 3rem;
  text-align: center;
  gap: 18px;
  max-width: 340px;
  width: 100%;
  height: auto;
  padding: 1rem;
  margin: 1rem;
  justify-content: center;
  align-items: center;


  ${
    !isMobileDevice() && `

            @media only screen and (max-width: 1280px){
            margin-top:5rem;
            
        }
        @media only screen and (max-width: 1098px){
            margin-top: 15rem;
            
        }

        @media only screen and (max-width: 768px){
            margin-top: 25rem;
        }
    
        @media only screen and (max-width: 640px){
            margin-top: 35rem;
        }

        @media only screen and (max-width: 384px){
            margin-top: 45rem;
        }

        @media only screen and (max-width: 480px){
            margin-top: 50rem;
        }    
    `
  }

  input {
    color: #3a2e2c;
    opacity: 1;
    font-weight: 600;
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
`

export const Input = styled.input``;

export const ErrorText = styled.p``;

export const ForgotPasswordLink = styled(Link)``;

export const OrSeparator = styled.div``;

export const BorderTop = styled.div``;

export const OrText = styled.div``;

export const BottomCta = styled.div`
  display: flex;
  gap: 5px;
  white-space: nowrap;

  h5{
    font-size: 14px;
  }
`;

export const CreateAccountLink = styled(Link)`
text-align: center;
font-size:14px`;

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
