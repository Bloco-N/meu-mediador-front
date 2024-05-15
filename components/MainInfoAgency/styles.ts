import styled from "styled-components";

type ContainerProps = {
    isProfile: boolean
  }
  
  export const Container = styled.div<ContainerProps>`
    position: relative;
  
    min-height: ${props => props.isProfile ? '40rem' : '20rem'};
    @media only screen and (max-width: 900px){
      min-height: ${porps => porps.isProfile ? '60rem': '40rem'};
      height: 100%;
  
    }
    .main-info{
      .top{
        position: absolute;
        width: 100%;
        height: 22rem;
        top: 0;
        left: 0;
        .label-back{
          background-color: var(--surface);
          border-radius: 50%;
          height: 4rem;
          width: 4rem;
          position: absolute;
          top: 1rem;
          right: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            position: unset;
          }
        }
  
        .deletAccount-back{
          background-color: #c14341;
          border-radius: 50%;
          height: 4rem;
          width: 4rem;
          position: absolute;
          top: 1rem;
          right: 7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            position: unset;
          }
        }
      }
      display: flex;
      align-items: center;
      background-color: var(--surface);
      padding: 3rem;
      border-radius: 3rem;
      height: 100%;
      gap: 1rem;
      .cover-photo{
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
        border-top-left-radius: 3rem;
        border-top-right-radius: 3rem;
        object-fit: cover;
      }
      .profile{      
        height: ${porps => porps.isProfile ? '20rem': '10rem'};
        width: ${porps => porps.isProfile ? '20rem': '10rem'};
        border-radius: 50%;
        object-fit: cover;
        position: relative;
        @media only screen and (max-width: 900px){
          margin-bottom: unset;
        }
      }
      @media only screen and (max-width: 900px){
        flex-direction: column;
      }
      .sub-content {
        margin-top: ${(props) => (props.isProfile ? "20rem" : "unset")};
        margin-left: ${(props) => (props.isProfile ? "2rem" : "2rem")};
        display: flex;
        gap: 1rem;
        justify-content: ${(props) => (props.isProfile ? "" : "space-between")};
        width: 100%;
  
        @media only screen and (max-width: 900px) {
          flex-direction: column;
          gap: 2rem;
          margin-top: unset;
          margin-left: unset;
          width: 100%;
        }
      }
      .about{
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        min-width: 15rem;
        color: var(--surface-2);
        @media only screen and (max-width: 900px){
          align-items: center;
          min-width: 100%;
        }
      }
      .about-2{
        position: relative;
        @media only screen and (max-width: 900px){
          align-items: center;
          text-align: center;
          min-width: 100%;
        }
        
        width: 100%;
        display: flex;
        color: var(--surface-2);
        flex-direction: column;
        justify-content: flex-end;
        gap: 0.5rem;
        
        p{
          gap: .5rem;
          font-size:15px;
          overflow-wrap: break-word;
        }
  
        .cities{
          width: 100%;
          display: flex;
          font-size: 14px;
          flex-wrap: wrap;
          span{
            margin-right: 5px;
            margin-left: 5px;
            font-size: 15px;
  
          }
          b{
            font-size: 15px;
          }
          @media only screen and (max-width: 900px) {
          position: unset;
          bottom: 8rem;
          justify-content: center;
        }
        }
      }
      .contact{
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 2rem;
        position: absolute;
        bottom: 8rem;
        right: 2rem;
        @media only screen and (max-width: 900px){
          position: unset;
        }
        .icon{
          height: 3rem;
          width: 3rem;
          cursor: pointer;
          opacity: 0.7;
          transition: all .5s;
          :hover{
            opacity: 1;
          }
        }
      }
      .current-agency{
        background-color: var(--surface);
        display: flex;
        align-items: center;
        gap: 2rem;
        padding: 1rem;
        border-radius: 1rem;
        position: absolute;
        bottom: ${porps => porps.isProfile ? '20rem': 'unset'};
        right: 2rem;
        @media only screen and (max-width: 900px){
          position: unset;
        }
        .agency{
          height: 3rem;
          width: 3rem;
        }
      }
      .profile-pointer{
        cursor: pointer;
      }
      h1{
        font-weight: normal;
      }
      h3{
        color: var(--star);
      }
    }
  `
  
  export const ResponsiveImage = styled.img`
    width: 100%;
    cursor:pointer;
  `;