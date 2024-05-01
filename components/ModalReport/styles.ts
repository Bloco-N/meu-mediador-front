import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  form {
    position: relative;
    height: 65rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-top: 4rem;
    background-color: gray;
    opacity: 1;
    @media (max-width: 600px) {
      width: 80%;
    }
    div {
      display: flex;
      align-items: center;

      gap: 2rem;
      width: 80%;
      p {
        font-weight: bold;
      }
    }
  }
  textarea {
    margin-top: 8px;
    min-height: 20rem;
    width: 100%;
    border: solid 0.1rem var(--border-color);
  }
  .redirect {
    position: absolute;
    top: 50%;
    font-weight: bold;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 3rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
  }

  input {
    border-radius: 10px;
    margin-top: 8px;
  }

  .botoes {
    margin-top: 8px;
    display: flex !important;
    justify-content: space-between;
    max-width: 100%;
  }
  .modal {
    padding: 10px;
    border-radius: 20px;
    border-color: var(--border-color);
    border-style: solid;
    background-color: var(--base) !important;
  }
  .text-center {
    text-align: center;
  }
  .aviso-msg {
    max-width: 100%;
    text-align: center;
    margin-top: 16px;
  }
`;
