import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 2rem;
  gap: 2rem;

  .plus {
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
  }

  .divButton {
    display: flex;
    left: -10px;
    top: 80px;
    align-items: center;
    justify-content: flex-end;
    max-height: 75px;
    height: 100%;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;

    @media only screen and (max-width: 768px) {
      max-height: 20%;
    }
  }

  .divButtonConfirm {
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media only screen and (max-width: 768px) {
      flex-direction: row;
    }
  }

  .icon-img {
    width: 10%;
    max-width: 100%;
    max-height: 100%;

    @media only screen and (max-width: 768px) {
      width: 20%;
    }
  }

  .divMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(245, 197, 199);
    border: 50px solid rgb(245, 197, 199);
    box-sizing: border-box;
    border-radius: 20px;
    text-align: center;

    @media only screen and (max-width: 768px) {
      border: 15px solid rgb(245, 197, 199);
      min-width: 280px;
    }

    h1 {
      font-size: 20px; /* Default font size */
      @media only screen and (max-width: 768px) {
        font-size: 15px;
      }
    }

    button {
      font-size: 16px; /* Default font size */
      @media only screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
  }

  .buttonNo {
    background-color: #c14341;

    @media only screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
`;