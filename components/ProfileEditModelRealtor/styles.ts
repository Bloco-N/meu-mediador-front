import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  top: 0px;
  form{
    background-color: #BABABA;
    position: relative;
    height: auto;
    width: 90%;
    max-width: 90rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    gap: 1rem;
    overflow-y: scroll;
    textarea{
      min-height: 20rem;
      @media (max-width: 650px) {
        min-height: 15rem;
        width:90%;
      }
    }
    input{
      min-width: 30rem;
      height: 65px;
      @media (max-width: 650px) {
        height: 50px;
      }
    }    

    h3{
      margin-bottom: 2rem;
    }
    .input-group{
      display: flex;

     
      @media (max-width: 650px) {
        button{
        width: 80%;
      }
        flex-direction: column;
        align-items: center;
      }
      gap: 1rem;
      justify-content: center;
      width: 100%;
      select{
        width: 50%;
        height: 65px;
        @media (max-width: 650px) {
        height: 50px;
      }
      }
    }
    .options{
      @media (max-width: 650px) {
        flex-direction: row;
        button{
          @media (max-width: 400px) {
            width: 10px;
          }
        }
      }
    }
  }
  p{
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
    color: white;
    border-radius: 1rem;
    font-weight: bold;
  }
`