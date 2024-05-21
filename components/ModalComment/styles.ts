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
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding: 4rem 0;
    @media (max-width: 1000px) {
      width: 60%;
      height: 70rem;
    }
    @media (max-width: 654px) {
      width: 80%;
      gap: 1rem;
      height: 65rem;
    }
    @media (max-width: 376px) {
      gap: 0.1rem;
      gap: 1.5rem;
      padding-top: 2.5rem;

      @media (max-width: 600px) {
        width: 80%;
        height: auto;
        padding-top: 2rem;
      }
    }

    textarea {
      min-height: 10rem;
      @media (max-width: 600px) {
        width: 85%;
        min-height: 20rem;
      }
    }

    button {
      @media (max-width: 600px) {
        margin-bottom: 2em;
      }
    }
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 80%;

    p {
      font-weight: bold;
    }
    @media (max-width: 376px) {
      height: 8rem;
    }
  }

  .desableForm {
    height: 20rem;
  }
  .redirect {
    position: absolute;
    top: 50%;
    font-weight: bold;
    text-align: center;
    a {
      text-decoration: underline;
      color: #000;
    }
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 2.5rem;
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

    @media (max-width: 600px) {
      top: 2.5%;
    }
  }

  .star-svg {
    @media (max-width: 900px) {
      width: 3.5rem !important;
    }
    @media (max-width: 400px) {
      width: 3.5rem !important;
    }
  }
  select {
    width: 26%;
    height: 3.5rem;
    padding: 0.5rem;
    font-size: 16px;
    text-align: center;
    overflow: auto;

    @media (max-width: 600px) {
      width: 40%;
      font-size: 12px;
    }
  }

  input {
    width: 26%;
    text-align: left;
    font-size: 14px;

    @media (max-width: 600px) {
      width: 27%;
      font-size: 10px;
    }
  }

  .redirectContainer {
    position: absolute;
    top: 40%;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 50%;

    @media (max-width: 600px) {
      font-size: 10px;
    }

    .styledLink {
      margin-left: 5px;
      margin-right: 0;
    }

    .redirectMessage {
      display: inline;
    }
    .divLabel {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .link {
      text-decoration: underline;
    }
  }
`;
