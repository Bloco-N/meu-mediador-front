import { SearchResultContextType } from "@/types/SearchResultContextType"
import SearchContext from "context/SearchResultContext"
import { useContext } from "react"
import styled from "styled-components"
import Pagination from "components/Pagination"
import Link from "next/link"
import MainInfo from "components/MainInfo"

const Container = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .list{
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 4rem;
    a{
      width: 90%;
      .card{
        height: 100%;
        width: 100%;
        padding: 2rem;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
`

export default function SearchResult(){

  const { searchResult } = useContext(SearchContext) as SearchResultContextType

  return (
    <Container>

      <div className="list">
        {searchResult.list.map(item => (
          <Link href={'/profile/realtor/' + item.id} key={item.id }>
            <MainInfo realtor={item} isProfile={false}/>
          </Link>
        ))}
      </div>
        <Pagination currentPage={searchResult.currentPage} totalOfPages={searchResult.totalOfPages}/>
    </Container>
  )
}