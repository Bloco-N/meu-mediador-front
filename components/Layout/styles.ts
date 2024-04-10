import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  main {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    @media (max-width: 768px) {
      height: auto;
      justify-content: start;
    }
  }
  .div-main {
    width: 100%;
    height: 100%;
  }
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  img {
    width: 60%;
    margin-top: -5%;
  }
  h1 {
    position: absolute;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    img {
      width: 150%;
      margin-top: -10%;
    }
    h1 {
      position: absolute;
      font-size: 22px;
      margin-left: 30px;
    }

    .spinner {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: radial-gradient(farthest-side, #454545 94%, #0000) top/9px 9px
          no-repeat,
        conic-gradient(#0000 30%, #454545);
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - 9px),
        #000 0
      );
      animation: spinner-c7wet2 1s infinite linear;
    }

    @keyframes spinner-c7wet2 {
      100% {
        transform: rotate(1turn);
      }
    }
  }
`;