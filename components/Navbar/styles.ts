import { isMobileDevice } from "@/utils";
import styled from "styled-components";

interface INavbar {
  path: string;
}

interface LogoProps {
    width: number;
    path?:string;
    isMobileDevice?:boolean;
  }

  export const ContainerNavbar = styled.section`
  flex:1;
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
  `

export const ContentNavbar = styled.section<{isMobileDevice:boolean}>`
  flex:1;
  display: flex;
  flex-direction:column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Nav = styled.div<INavbar>`
  flex:1;
  flex-direction: row;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.path === "/" ? "transparent" : "#dedddd")} !important;
  max-height: 69px !important;
  height: 100%;
  z-index: 1;

  ${({ path }) => path === "/" && `
    padding-top:4rem;
    padding-bottom:4rem;
  `}


  @media (max-width:727px) {
      align-items: center !important;
      justify-content: center !important;
  }

  @media (max-width:768px) {
    background-color: ${(props) => (props.path === "/" && "#cfcfcf")} !important;
  }

  .logo-area {
    height: 100%;
  }

  .left-side {
    z-index: 10;
    margin-right: 2rem;
    
    .box-icon-search{
        svg{
          width: 30px;
          height: 30px;
        }

        svg:hover{
          color:green;
        }
    }

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
    width: 150px;
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
    min-width: 70px;
    z-index: 1 !important;


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

    @media only screen and (max-width: 767px) {
      background-color: transparent;
      border: none;
    }


    @media only screen and (max-width: 900px) {
      width: 85px;
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
      padding:1rem;
      border-radius: 0 0 1rem 1rem;
      top: 99%;
      left: -1px;
      border: solid 0.8px var(--border-color);
      background-color: var(--surface);
      border-top-color: transparent;
      animation: fadeIn 0.3s;

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
        left: ${(props) => (props.path === "/" ? "-10.5px" : "-13px")};
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
    gap: 2rem;
    min-width: 100px;
    ${({ path }) => path === "/" && `margin-top: 30px;`}


    @media only screen and (max-width: 900px) {
      width:20%;
      margin-right:3rem
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
        font-size: 14px;
        padding: 0 1rem;
        width: 16rem;

      }

      select {
        min-width:40px;
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



    /* @media only screen and (max-width: 1344px) {
      .inputs-search input,
      .inputs-search select {
        height: 28px;
      }

      .searchButton {
        min-width: 10%;
        height: 28px;
      }
    } */
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 69px !important;

  @media (max-width:727px) {
      max-width: 650px;
      width: 100%;
  }
`;

export const BoxSearch = styled.div<{path?:string}>`
  display: flex;
  align-items: center !important;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  height: 69px !important;

  ${({ path }) => path === "/" && `margin-top: 30px;`}
  
  ${({ path }) => path === "/" && `
    position: absolute;
    justify-content: center !important;
    padding-top:10px;
    z-index:0;

    @media(max-width:768px){
      justify-content: start !important;
      padding-left:2rem;
    }
  `}

  .box-image{
    width:20%;
    ${({ path }) => path === "/" && `width:30%;`}
    padding:2rem;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const LogoImage = styled.img<LogoProps>`
  cursor: pointer;
  object-fit: cover;
  background-position:center;
  ${
    ({ isMobileDevice }) => !isMobileDevice && `
            width: 100%;` 
    }
  
  ${({ path }) => path === "/" && `
    z-index:0;
    width: 100%

    @media(width: 1920px) {
      padding-top:2rem;
    }

    @media(width: 1745.45px) {
      width: 100%
      padding-top:2rem;
    }
  `}
`;

// Modal
export const ContainerModal = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 1rem;
`
export const HeaderActionsModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height:30px;
  width: 100%;

  svg:hover{
    color: red;
  }
`
export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100% !important;
  padding: 1rem;
  gap: 1rem;

      input,
      select {
        flex: 1;
        height: 50px;
        border-radius: 1rem;
        border: 1px solid #3a2e2c5a;
        font-size:16px;
        padding: 0 1rem;
        width:200px !important;
      }
`
export const BoxInput = styled.div``
export const FooterActionsModal = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  width: 100%;
`
