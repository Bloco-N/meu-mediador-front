import { SearchResultContextType } from "@/types/SearchResultContextType"
import SearchContext from "context/SearchResultContext"
import { useContext } from "react"
import styled from "styled-components"
import profileIcon from '@/../public/profile.svg'
import Image from "next/image"
import Pagination from "components/Pagination"

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .list{
    height: 80%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 4rem;
    gap: 2rem;
    .card{
      display: flex;
      gap: 1rem;
    }
  }
`

export default function SearchResult(){

  const { searchResult } = useContext(SearchContext) as SearchResultContextType

  console.log(searchResult)

  return (
    <Container>

      <div className="list">
        {searchResult.list.map(item => (
          <div className="card" key={item.id }>
            <Image src={profileIcon} alt='profile icon'/>
            <p>{item.firstName} {item.lastName}</p>
            
            
          </div>
        ))}
      </div>
        <Pagination currentPage={searchResult.currentPage} totalOfPages={searchResult.totalOfPages}/>
    </Container>
  )
}