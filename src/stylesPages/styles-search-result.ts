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
  }

  .pagination {
      display: flex;
      gap:1rem;
      flex-direction: column;
      width: 100%;
     }

`
