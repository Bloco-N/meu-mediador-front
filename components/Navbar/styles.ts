import styled from "styled-components";
import subLogo from '/sublogo.png';

interface INavbar {
  path: string;
}

interface LogoProps {
    width: number;
  }

export const Nav = styled.div<INavbar>`
  flex-direction: row;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #dedddd !important;
  height: 69px;

  .logo-area {
    height: 100%;
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
    padding-top: 2rem;
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
      top: 30px;
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
      margin-right: ${(props) => (props.path === "/" ? "14px" : "0")};
      align-items: ${(props) => (props.path === "/" ? "end" : "center")};
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
        left: ${(props) => (props.path === "/" ? "-10px" : "-13px")};
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
    min-height: 35px;
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

  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-width: 100px;

    @media only screen and (max-width: 900px) {
        margin-left: 10px;
      /* flex-direction: column; */
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
  display: flex;
  justify-content: center;

  form {
    background: transparent;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-self: center;
    padding: 2rem;

    .search-row {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      width: 100%;
    }

    .inputs-search {
      display: flex;
      gap: 2rem;
      width: 100%;
      justify-content: center;
      align-items: center;

      input,
      select {
        flex: 1;
        height: 50px;
        border-radius: 1rem;
        border: 1px solid #3a2e2c5a;
        font-size: 16px;
        padding: 0 1rem;
      }
    }

    .searchButton {
      min-width: 5vw;
      height: 50px;
      border-radius: 1rem;
      padding: 0 1rem;
      font-size: 16px;
    }

    .input-realtor::placeholder,
    .input-city-cep::placeholder {
      font-size: 15px;
    }



    @media only screen and (max-width: 1344px) {
      .inputs-search input,
      .inputs-search select {
        height: 28px;
      }

      .searchButton {
        min-width: 10%;
        height: 28px;
      }
    }
  }
`;

export const Container = styled.div`
position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 5;
`;

export const BoxSearch = styled.div`
  display: flex;
  margin-left: 4rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const LogoImage = styled.img<LogoProps>`
  cursor: pointer;
  width: ${(props) => props.width}px;
  object-fit: cover;
  background-position:center;

  @media only screen and (max-width: 1344px) {
    width: 12vw;
  }
`;