import styled from "styled-components";

type ContainerProps = {
    isProfile: boolean;
  };

export const Container = styled.div<ContainerProps>`
position: relative;
height: 100%;
display: flex;
justify-content: center;
z-index:1;
background-color: #d3d2d2 !important;

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

  .pdf-back{
          background-color: var(--surface);
          border-radius: 50%;
          height: 4rem;
          width: 4rem;
          position: absolute;
          top: 1rem;
          right: 17rem;
          display: flex;
          align-items: center;
          justify-content: center;

          img{
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
    width: 100%;
    flex-wrap: wrap;
    justify-content: ${(props) => (props.isProfile ? "" : "space-between")};
    /* justify-content: space-between; */

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
    
    p{
      display: flex;
      gap:2px;
      white-space: nowrap !important;
      flex-wrap: wrap;
    }

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
    align-items: end;


    @media(max-width:768px) {
      position: static;
    }

    @media(max-width:1280px) {
      right: 59%;
    }

    @media(max-width:1097.14px) {
      right: 52%;
    }

    @media(max-width:960px) {
      right: 56%;
    }



    ${(props) => (props.isProfile && `
      justify-content: center;
      position:absolute;
      bottom:50px;
      right:10px;
    `)}


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

  .current-agency {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    min-width: 180px;
    
    ${(props) => (props.isProfile && `
        position: absolute;
        bottom:52%;
        right:20px;
    `)}
    

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

.icon-agency {
  display: flex;
  align-items: center;
  white-space: nowrap;
  justify-content: center;

  a {
    display: flex;
    justify-content: center;
  }
}
`;

// Upload images
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 800px;

`;

export const Divider = styled.div`
  border-top: 2px dashed #ccc;
  margin: 2rem 0;
  width: 100%;
`;

export const FileInputContainer = styled.div`
  label{
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    gap: 1rem;

    img {
      height: 2rem;
      width: 2rem;
      bottom: 2rem;
      right: 2rem;
      cursor: pointer;
    }
  }

  div{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;
  }

  border: 2px dashed #ccc;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SelectedImage = styled.img<{profileRadius?:boolean;}>`
  max-height: 200px;
  display: block;
  margin: 10px auto;
  border-radius: ${({ profileRadius }) => profileRadius ? '50%' : '10px'};
  object-fit: cover;
  position: relative;  

`;

export const HeaderChangePictures = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  align-items: center;
  justify-content: end;
  overflow: hidden;
  margin-top: 10px;
`;

export const ProgressBar = styled.div`
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: #f3f3f3;  
  overflow: hidden;
  border-radius: 10px;
`;

export const Progress = styled.div<{ width: number }>`
  padding: .05em;
  background-color: #4caf50;
  text-align: end;
  width: ${({ width }) => width}%;
  height: 20px;

  p{
    position: absolute;
    right: 0;
    font-weight: bold;
    padding-right: 5px;
    
  }
`;

export const ResponsiveImage = styled.img`
width: 100%;
cursor:pointer;
`;

export const ButtonUpload =  styled.button`
  all: unset;
  color: #fff;
  font-size: 14px;
  background: var(--surface-2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  padding: .8rem;
  width: 25%;
  margin: 1rem;
`

export const PreviewCardProfile =  styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
  background-color: var(--surface);
`

export const PreviewCardProfileTop =  styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  height: 200px;
`

export const PreviewCardProfileBottom =  styled.div`
position: relative;
  display: flex;
  width: 90%;
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
  justify-content: end;
  align-items: center;
  gap:5rem;
`

export const PreviewProfileImage =  styled.img`
    position: absolute;
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    object-fit: cover;
    bottom: -50px;
    left: 20px;
    z-index: 1;
`

export const PreviewProfileCoverImage =  styled.img`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  object-fit: cover;`
