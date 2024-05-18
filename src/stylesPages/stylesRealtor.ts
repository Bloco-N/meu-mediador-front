import styled from "styled-components";

interface Realtor {
    sessionProfile: boolean;
  }
  
 export const Container = styled.div<Realtor>`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    padding: 0px 32px 32px 32px;
    margin-top: ${(props) => (props.sessionProfile ? "-60px" : "60px")};
    gap: 2rem;
    margin-top: 20px;


    @media only screen and (max-width: 768px) {
      padding: 0 32px;
    }
    .plus {
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
    }
    .hide-profile {
      background-color: #d3d2d2;
      width: 65%;
      height: 140px;
      max-width: calc(100% - 270px);
      position: fixed;
      z-index: 5;
      top: 0;
      right: 0;
    }
    .labelDialogReport {
      text-align: center;
    }
    .divButton {
      display: flex;
      position: relative;
      right: 90px;
      top: 80px;
      align-items: center;
      max-height: 75px;
      height: 100%;
      padding: 5px;
      width: 100%;
      box-sizing: border-box;
  
      @media (max-width: 768px) {
        max-height: 20%;
        position: static;
      }
    }
    .divButtonConfirm {
      display: flex;
      justify-content: space-around;
      width: 100%;
  
      @media (max-width: 768px) {
        flex-direction: row;
      }
    }
  
    .icon {
      width: 10%;
      margin-top: 1em;
      max-width: 100%;
      max-height: 100%;
  
      @media (max-width: 768px) {
        width: 18%;
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
      font-size: 2em;
  
      @media (max-width: 768px) {
        font-size: 2em;
        border: 20px solid rgb(245, 197, 199);
        width: 100%;
      }
  
      h1 {
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
  
      button {
        @media (max-width: 768px) {
          font-size: 15px;
          padding: 0.5rem;
          min-width: 8rem;
          height: 30px;
        }
      }
    }
  
    .buttonNo {
      background-color: #c14341;
    }
  `;