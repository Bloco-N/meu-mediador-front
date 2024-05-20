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
    background-color: #bababac7;
    backdrop-filter: blur(0.3rem);
    -webkit-backdrop-filter: blur(0.3rem);
    position: relative;
    height: auto;
    width: 75%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 4rem;
    gap: 1rem;
    @media (max-width: 1200px) {
      width: 75%;
    }
    @media (max-width: 768px) {
      width: 90%;
      overflow-y: scroll;
    }
    .all-infos {
      display: flex;
      gap: 2rem;
      @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
      }
      .infos {
        display: flex;
        gap: 2rem;
        .inputs {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 50%;
        }
        .selections {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 50%;
        }
        select {
          width: 100%;
          height: 65px;
          @media (max-width: 768px) {
            height: 45px;
          }
        }
      }
      .image-place {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 1200px) {
          max-height: 25rem;
          max-width: 40rem;
          margin-left: calc(50% - 20rem);
        }
        @media (max-width: 500px) {
          max-height: 20rem;
          max-width: 30rem;
          margin-left: calc(50% - 15rem);
        }
        img {
          opacity: 0.7;
          border-radius: 1rem;
          max-height: 25rem;
          max-width: 40rem;
          object-fit: cover;
          @media (max-width: 500px) {
            max-height: 20rem;
            max-width: 30rem;
          }
        }
        label {
          position: absolute;
          top: 9rem;
          right: 0.5rem;
          @media (max-width: 1200px) {
            top: 1rem;
          }
        }
      }
    }
    label {
      background-color: var(--base);
      padding: 1rem;
      border-radius: 1rem;
      cursor: pointer;
    }
    .buttons {
      display: flex;
      width: auto;
      gap: 2rem;
      .buttondelete {
        background: #c24343;
        color: white;
        font-size: 2rem;
        text-align: center;
        border-radius: 1rem;
        cursor: pointer;
        padding: 1.5rem;
        min-width: 10rem;
      }
    }
    h3{
      font-size: 25px;
      @media (max-width: 768px) {
        font-size: 20px;
      }
    }
  }
  input {
    width: 100%;
    height: 65px;
    @media (max-width: 768px) {
      height: 45px;
    }
  }
  .input-titulo {
    width: 1050px;
    @media (max-width: 1500px) {
      width: 100%;
    }
  }
  h3 {
    margin-bottom: 2rem;
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
  input::placeholder {
    text-align: center;
  }
`;
