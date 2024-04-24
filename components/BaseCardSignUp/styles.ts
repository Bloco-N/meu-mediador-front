import styled from "styled-components";

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:2rem; 
  width: 100% !important;


  .full-name {
      width: 100%;
      display: flex;
      gap: 2rem;
    }

    input {
      height: 50px;
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

export const ContainerOAuth = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const ContainerTerms = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const CardSignUp = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;


export const ContainerBaseCardSignUp = styled.div<{ isMobileDevice?:boolean}>`
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
  max-width: 600px;
  width: 100%;
  padding: 1rem;
  margin: 2rem;
  justify-content: center;
  align-items: center;

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

  .check_box {
      all: revert !important;
    }
    button:disabled,
    button[disabled] {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    }
`;