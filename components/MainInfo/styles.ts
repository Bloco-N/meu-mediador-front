import styled from "styled-components";

type ContainerProps = {
    isProfile: boolean;
  };

export const Container = styled.div<ContainerProps>`
position: relative;
height: 100%;

min-height: ${(props) => (props.isProfile ? "40rem" : "20rem")};
@media only screen and (max-width: 900px) {
  min-height: ${(props) => (props.isProfile ? "60rem" : "40rem")};
  height: 100%;
}

.main-info {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(--surface);
  padding: 3rem;
  height: 100%;
  gap: 1rem;
  border-radius: 30px;

  .top {
    position: absolute;
    width: 100%;
    height: 22rem;
    top: 0;
    left: 0;

    .label-back {
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

      img {
        position: unset;
      }
    }
  }

  .cover-photo {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    object-fit: cover;
  }

  .profile {
    height: ${(props) => (props.isProfile ? "20rem" : "10rem")};
    width: ${(props) => (props.isProfile ? "20rem" : "10rem")};
    border-radius: 50%;
    object-fit: cover;
    position: relative;

    @media only screen and (max-width: 900px) {
      margin-bottom: unset;
    }
  }

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }

  .sub-content {
    margin-top: ${(props) => (props.isProfile ? "20rem" : "unset")};
    margin-left: ${(props) => (props.isProfile ? "2rem" : "2rem")};
    display: flex;
    gap: 1rem;
    /* justify-content: ${(props) => (props.isProfile ? "" : "space-between")}; */
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    @media only screen and (max-width: 900px) {
      flex-direction: column;
      gap: 2rem;
      margin-top: unset;
      margin-left: unset;
      width: 100%;
    }
  }

  .about {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => (props.isProfile ? "" : "center")};
    gap: 0.4rem;
    min-width: 25%;
    max-width: 300px;
    flex-wrap: wrap;
    color: var(--surface-2);
    text-align: center;
    width: 100%;
    align-items: flex-start;

    h1 {
      font-size: 32px;
    }

    @media only screen and (max-width: 900px) {
      align-items: center;
      min-width: 100%;
      h1 {
        font-size: 28px;
      }
    }
  }

  .about-2 {
    position: relative;
    min-width: ${(props) => (props.isProfile ? "35rem" : "35rem")};
    max-width: 300px;
    width: 100%;
    align-items: flex-start;

    @media only screen and (max-width: 900px) {
      align-items: center;
      text-align: center;
      min-width: 100%;
    }

    display: flex;
    color: var(--surface-2);
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.5rem;

    p {
      overflow-wrap: break-word;
    }

    .bottom {
      display: flex;
      flex-direction: row;

      .bottom-1,
      .bottom-2 {
        width: 20rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    li {
      text-align: left;
    }

    .link-city {
      text-decoration: underline;
    }
    b {
      font-size: 16px;
    }

    p {
      font-size: 16px;
    }

    .cities {
      width: 100%;
      display: flex;
      font-size: 14px;
      flex-wrap: wrap;

      span {
        margin-right: 5px;
        margin-left: 1px;
        font-size: 15px;
      }

      @media only screen and (max-width: 900px) {
        position: unset;
        bottom: 8rem;
        justify-content: center;

        b {
          font-size: 15px;
        }

        p {
          font-size: 15px;
        }
      }
    }
  }

  .contact {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    position: absolute;
    bottom: 8rem;
    right: 2rem;
    width: 100%;
    align-items: flex-start;

    @media only screen and (max-width: 900px) {
      position: unset;
      bottom: 8rem;
      right: 2rem;
    }

    @media only screen and (max-width: 1400px) {
      right: 14rem;
      bottom: 4rem;
    }

    .icon {
      height: 3rem;
      width: 3rem;
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.5s;

      :hover {
        opacity: 1;
      }
    }

    .icon-facebook {
      height: 3.5rem;
      width: 3.5rem;
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.5s;
      margin-top: 1em;

      :hover {
        opacity: 1;
      }
    }
  }

  .current-agency {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    position: ${(props) => (props.isProfile ? "absolute" : "")};
    bottom: ${(props) => (props.isProfile ? "20rem" : "unset")};
    width: 180px;
    

    @media only screen and (max-width: 900px) {
      position: unset;
      width: 180px;
      white-space: nowrap;
    }

    .agency {
      height: 3rem;
      width: 3rem;
    }
  }

  .profile-pointer {
    cursor: pointer;
  }

  h1 {
    font-weight: normal;
  }

  h3 {
    color: var(--star);
  }

  p {
    font-size: 16px;
  }

  @media (width < 768px) {
    p {
      font-size: 14px;
    }
  }

  background: #fff;
}

.about-3 {
  gap: 0.5rem;
  margin-top: 0.3em;
  width: fit-content;
  min-width: 240px;

  p {
    margin-bottom: 0.5rem;
    font-size: 16px;
  }

  @media only screen and (max-width: 900px) {
    align-items: center;
    text-align: center;
    min-width: 100%;
  }

  .popup {
    position: unset;
    z-index: 40;
  }

  @media only screen and (max-width: 900px) {
    p {
      font-size: 15px;
    }
  }
}

.icon-agency {
  display: flex;
  align-items: center;
  white-space: nowrap;
  justify-content: flex-start;

  a {
    display: flex;
    justify-content: center;
  }

  @media(max-width:1097.14px){
    width: 42%;
  }

  @media(max-width:960px){
    width: 40%;
  }

  @media(max-width:768px){
    width: 100%;
    justify-content: center;
  }
}
`;