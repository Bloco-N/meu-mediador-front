import styled from "styled-components"

export const Container = styled.div`
  height: 100%; 
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  padding-top:2rem;
  gap:1rem;

  .list{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 2rem;
    margin-bottom: 2rem;

    .teste{
      width: 95%;
      cursor: pointer;
      .card{
        height: 100%;
        width: 100%;
        padding: 2rem;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .actions-bar{
      display: flex;
      width: 95%;
      align-items: flex-end;
      justify-content: end;
    }
  }
  
  .pagination {
      display: flex;
      gap:1rem;
      flex-direction: column;
      width: 100%;
     }
`

export const BaseFilterPopover = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  width: 100%;
  background-color: var(--surface);
  border-radius: 0.5em;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderBaseFilterPopover =  styled.div`
  width: 100%;
  padding: 1rem 1rem .2em 1rem;
`

export const Divider =  styled.div`
  width: 100%;
  height: .01em;
  background-color: #757575;
`

export const TextHeader =  styled.h4`
  font-weight: bold;
  font-size: 16px;
  color: #757575;
`

export const TextList =  styled.p`
  font-weight: 300;
  color: #757575;
`

export const FooterBaseFilterPopover =  styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;

  button{
    all: unset;
    color: #fff;
    font-size:1.5rem;
    background: var(--surface-2);
    text-align: center;
    border-radius: 1rem;
    cursor: pointer;
    padding: 1rem;
    min-width: 10rem;
  }

`