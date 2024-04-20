import styled from "styled-components"

export const Container = styled.div`
  height: 100%; 
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  padding-top: 80px;
  gap:1rem;

  .list{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 2rem;
    margin-bottom: 15rem;

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
      position: fixed;
      bottom: 0;
      flex-direction: column;
      width: 100%;
      margin-top: 5rem;
      @media (max-width: 768px) {
        height: 15%;
      }
 }

  /* @media (max-width: 900px) {
    .list {
      padding: 0;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
   font-size: 1.6rem;
   position: relative;
   padding-top: 40px;

   .list {
    padding: 0 38px; 

    .teste{
        width: 100%;
      }
   }
  } */
`
