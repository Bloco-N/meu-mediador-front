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
    background-color: #bababa;
    position: relative;
    height: auto;
    width: 60%;
    padding: 4rem 0;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    h3 {
      margin-bottom: 4rem;
    }
    div {
      display: flex;
      gap: 2rem;
      width: 80%;
      justify-content: center;
      align-items: center;
    }
    .dates-inputs {
      flex-wrap: nowrap;
      justify-content: center;
      @media (max-width: 800px) {
        flex-wrap: wrap;
      }

      .dates-input-group {
        gap: 2rem;
        width: auto;
        @media (max-width: 800px) {
          width: 100%;
        }
      }

      p.label-text-inputs {
        cursor: pointer;
        display: block;
        height: auto;
        width: auto;
        position: initial;
        background-color: transparent;
        color: var(--surface2);
        font-weight: bold;
        @media (max-width: 800px) {
          width: 80px;
          font-size: 14px;
        }
      }
    }

    input[type="text"] {
      width: 70%;
      @media (max-width: 1400px) {
        width: 80%;
      }
    }

    @media (max-width: 800px) {
      width: 80%;
    }
    @media (max-width: 500px) {
      height: 58rem;
    }
    .dates-inputs {
      /* width: 100%; */
      /* display: flex;
      flex-direction: row;
      justify-content: flex-start; */
      @media (max-width: 500px) {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 80%;
        input {
          width: 150px;
          height: 30px;
        }
      }
    }
  }
  p {
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
`;
