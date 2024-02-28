import { SearchResultContextType } from "@/types/SearchResultContextType"
import SearchContext from "context/SearchResultContext"
import { useContext } from "react"
import styled from "styled-components"
import Pagination from "components/Pagination"
import Link from "next/link"
import MainInfo from "components/MainInfo"
import { useEffect } from 'react';
import InfoFooter from "components/InfoFooter"
import { useRouter } from "next/router"

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;

  .list{
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* padding-left: 4rem; */
    gap: 2rem;

    &:last-child {
      margin-bottom: 390px;
    }
    .pagination {
      margin: 0 auto;
      @media (max-width: 768px) {
        padding-bottom: 30px; 
      }
    }
    a{
      width: 95%;
      .card{
        height: 100%;
        width: 100%;
        padding: 2rem;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }

  @media (max-width: 900px) {
    .list {
      padding: 0;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
   font-size: 1.6rem;
   position: relative;

   .list {
    padding: 0 38px; 

    a {
        width: 100%;
      }
   }
  }
`

export default function SearchResult(){ 

  const { searchResult, setSearchResult } = useContext(SearchContext) as SearchResultContextType;
  const { query } = useRouter();
  const idSearch = query.idSearch;

  // useEffect(() => {
  //   console.log(searchResult)
  //   if(!searchResult){
  //     const savedSearchResult = localStorage.getItem('searchResult');
  //     if (savedSearchResult) {
  //       setSearchResult(JSON.parse(savedSearchResult));
  //     }
  //   }
  // }, [setSearchResult]);
  return (
    <Container>
      <div className="list">
        {searchResult?.list?.map(item => (
          <Link href={`/profile/${Number(idSearch) == 1 ? "realtor/" : "agency/"}` + item.id} key={item.id }>
            <MainInfo lastExp={{
              name: item.agencyName,
              pic: item.agencyPic,
              agencyId: item.agencyName
            }} isRealtor={true} userSigned={item} isProfile={false} pdfPage={false}/>
          </Link>
        ))}
        <div className="pagination">
          <Pagination currentPage={searchResult.currentPage} totalOfPages={searchResult.totalOfPages}/>
        </div>       
          <InfoFooter/>     
      </div>
    </Container>

  )
}