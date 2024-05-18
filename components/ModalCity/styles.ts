import styled from 'styled-components';

export const Container = styled.div`
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  
  form{
    background-color: #bababac7;
    backdrop-filter: blur(0.3rem);
    -webkit-backdrop-filter: blur(0.3rem);
    position: relative;
    min-height: 50rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    select{
      width: 50%;
      
      @media (max-width: 768px) {
        height: 50px;
      }
    }
    @media (max-width: 600px) {
      width: 80%;
    }
  }
  .close-icon{
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
  .close{
    cursor: pointer;
    position: absolute;
    top: 1em;
    right: 1em;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
    gap: 1rem;
    p{
      background-color: var(--surface);
      color: var(--surface-2);
      padding: 1rem;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  h3{
    margin-top: 1em;
    margin-bottom: 2rem;
  }
  h4{
    font-size: 2rem;
    font-style: italic;
    color: var(--surface-2);
  }
  .divBtn{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 1em;
    gap:100px;

    @media (max-width: 600px) {
      width: 80%;
      gap:50px
    }
  }
`