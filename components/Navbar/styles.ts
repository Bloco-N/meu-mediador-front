import styled from "styled-components";

interface INavbar {
    path: string;
}
  
export const Nav = styled.div<INavbar>`
  flex-direction: row;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  .img-absolute {
    /* position: absolute; */
    margin-left: ${(props) => (props.path == "/" ? "2rem" : "4rem")};
    cursor: pointer;
    @media only screen and (max-width: 1400px) {
      margin-left: 2rem;
    }
    @media only screen and (max-width: 768px) {
      position: relative;
      /* margin-left: ${(props) => (props.path == "/" ? "2rem" : "0")}; */
    }
  }
  .logo-area {
    height: 100%;
  }
  .logo {
  }
  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    min-width: 100px;
    &:has(.profile) {
      align-items: center;
    }
    &:has(.profile) ~ .card {
      animation: fadeInProfile 0.4s;
    }
    @keyframes fadeInProfile {
      from {
        transform: translateY(-125px);
        opacity: 0;
      }
      to {
        transform: translateY(initial);
        opacity: 1;
      }
    }
  }
  .card {
    border: 0;
    background-color: transparent;
  }
  .locale {
    width: 5rem;
    height: 5rem;
    background-color: transparent;
    border: none;
    padding: 0.2rem;
    font-size: 1.3rem;
    option {
      background-color: transparent;
      padding: 1rem;
    }
  }
  a {
    text-decoration: none;
  }
  p {
    font-size: 1.8rem;
    cursor: pointer;
  }
  .login {
    position: relative;
    width: 125px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transition: all 0.5s;
    background-color: var(--surface);
    border: solid 0.1rem var(--border-color);
    text-align: center;
    border-radius: 1rem;
    transition: all 0.5s, border-radius 0s;

    .online {
      /* position: absolute; */
      top: 30px;
      /* right: -5; */
      width: 15;
      height: 15;
      border-radius: 50%;
      background-color: green;
      border: 2px solid white;
    }

    &:has(div) {
      border-radius: 1rem 1rem 0 0;
    }

    @media only screen and (max-width: 900px) {
      width: 85px;
      background-color: transparent;
      border: none;
      margin-right: ${(props) => (props.path == "/" ? "14px" : "0")};
      align-items: ${(props) => (props.path == "/" ? "end" : "center")};
    }

    p {
      width: 100%;
      position: relative;
      display: flex;
      align-items: end;
      justify-content: center;
      z-index: 4;
      background-color: inherit;
      border-radius: 1rem;
      transition: border-radius 0s;
      font-size: 16px;

      &:hover {
        border-radius: 1rem 1rem 0 0;
        transition: border-radius 0.4s;
      }
    }

    div {
      position: absolute;
      background: inherit;
      width: calc(100% + 2px);
      border-radius: 0 0 1rem 1rem;
      top: 99%;
      left: -1px;
      border: solid 0.8px var(--border-color);
      background-color: var(--surface);
      border-top-color: transparent;
      animation: fadeIn 0.3s;
      z-index: 9999;

      a {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: end;
        &:last-child::after {
          display: none;
        }

        &::after {
          content: "";
          position: absolute;
          width: 80%;
          height: 1px;
          background: rgba(0, 0, 0, 0.4);
          top: 100%;
        }
      }
      a p {
        font-size: 1.8rem;
      }

      @media only screen and (max-width: 768px) {
        top: 140%;
        left: ${(props) => (props.path == "/" ? "-10px" : "-13px")};
        margin-left: 10px;
      }
    }

    @keyframes fadeIn {
      from {
        transform: translateY(-30px);
        opacity: 1;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  .selection {
    display: flex;
    align-items: center;
    right: 25rem;
    gap: 1rem;
    background-color: var(--surface);
    border-radius: 1rem;
    padding: 1rem;
    height: 35px;
  }
  .profile {
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
    @media only screen and (max-width: 768px) {
      margin-right: 13px;
      width: 55px;
      height: 55px;
    }
  }
  @media only screen and (max-width: 1400px) {
    right: 4rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
    right: 0;
    height: 120px;
    justify-content: space-between;
    .locale-area {
      display: none;
    }
    .logo-area {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
    }
    .logo {
      /* height: 80px; */
    }
    .profile {
    }
    .left-side {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0rem;
      min-width: 100px;
    }
  }
  @media only screen and (max-width: 900px) {
    position: relative;
    height: ${(props) => (props.path == "/" ? "90px" : "120px")};
    .locale-area {
    }
    .logo-area {
      display: flex;
      height: 50px;
    }
    .logo {
    }
    .profile {
    }
    .left-side {
    }
  }

  .logo-full {
    position: relative;
    margin-left: 100px;
    @media only screen and (max-width: 900px) {
      position: relative;
      margin-left: 13.3rem;
      width: 200px;
    }
  }
`;
export const SearchRealtor = styled.div`
  /* position: absolute; */
  background-color: blue;
  /* left: 32rem; */
  display: flex;
  /* width: 700px;
  height: 70px; */
  border: 0px;

  form {

    background: #e9e9e985;
    max-width: 100%;
    flex-direction: row;
    display: flex;
    flex-wrap:wrap;
    backdrop-filter: blur(5px);
    padding: 1rem 1rem;
    border-radius: 1rem;
    .search-row {
      display: flex;
      flex-direction: row;
      min-width: 12rem;
      justify-content: flex-start;
      align-items: center;
      gap: 2rem;
      width: 100%;
      height: 100%;
      .input-city-cep {
        margin: 0;
        position: relative;
        min-width: 12rem;
        height: 100%;
        border-radius: 1rem;
        border: 1px solid #3a2e2c5a;
        font-size: 16px;
      }
      .input-realtor {
        /* width: 108%; */
        min-width: 12rem;
        height: 100%;
        border-radius: 1rem;
        border: 1px solid #3a2e2c5a;
        font-size: 16px;
      }

      .input-realtor::placeholder,
      .input-city-cep::placeholder {
        font-size: 15px; /* Define o tamanho da fonte do placeholder */
      }

      .searchButton {
        padding: 0;
        width: 80%;
        min-width: 12rem;

        height: 100%;
        border-radius: 1rem;
        font-size: 16px;
      }

      select {
        border-radius: 1rem;
        height: 100%;
        border: none;
        background-color: none;
        font-size: 18px;
        padding: 0 18px;
        border: 1px solid #3a2e2c5a;
        width: 108%;
        padding-left: 6px;

        @media only screen and (max-width: 1100px) {
          height: 28px;
          padding: 0 5px;
          font-size: 16px;
          width: 175px;
        }
      }
    }
  }
  /* @media only screen and (max-width: 1400px) {
    left: 29rem;
  }
  @media only screen and (max-width: 1100px) {
    position: relative;
    left: 0rem;
    display: flex;
    width: 100%;
    padding-right: 80px;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 0;
    border: 0px;
    form {
      .search-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
        height: 100%;
        .input-city-cep {
          width: 140px;
          height: 25px;
          padding: 1rem;
        }
        .input-realtor {
          width: 140px;
          height: 25px;
          padding: 1rem;
        }
        .searchButton {
          width: 140px;
          height: 25px;
        }
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    width: 450px;
    form {
      .search-row {
        .input-city-cep {
          width: 175px;
          height: 28px;
        }
        .input-realtor {
          width: 175px;
          height: 28px;
        }
        .searchButton {
          width: 160px;
        }
      }
    }
  } */
`;

export const Container = styled.div`
    width: 100%;
    background-color: red;
    display:flex;
    height: 150px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap:5;
`