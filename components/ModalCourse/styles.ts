import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    background-color: #bababac7;
    backdrop-filter: blur(0.3rem);
    -webkit-backdrop-filter: blur(0.3rem);
    position: relative;
    height: 25rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    input {
      width: 80%;
    }
    @media (max-width: 700px) {
      width: 80%;
    }
  }
  p {
    cursor: pointer;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
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
`;
