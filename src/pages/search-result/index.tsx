import { SearchResultContextType } from "@/types/SearchResultContextType"
import SearchContext from "context/SearchResultContext"
import { useContext } from "react"
import Pagination from "components/Pagination"
import { MainInfo } from "@components/index"
import InfoFooter from "components/InfoFooter"
import { useRouter } from "next/router"
import * as C from './styles'

export default function SearchResult(){ 

  const { searchResult } = useContext(SearchContext) as SearchResultContextType;
  const { query } = useRouter();
  const idSearch = query.idSearch;
  const router = useRouter();

  return (
    <C.Container>
      <div className="list">
        {searchResult?.list?.map(item => (
          <div className="teste" onClick={() => router.push(`/profile/${Number(idSearch) == 1 ? "realtor/" : "agency/"}${item.id}`)} key={item.id}>
            <MainInfo lastExp={{
              name: item.agencyName,
              pic: item.agencyPic,
              agencyId: item.agencyName
            }} isRealtor={true} userSigned={item} isProfile={false} pdfPage={false}/>
          </div>
        ))}
   
      </div>
      <div className="pagination">
          <Pagination currentPage={searchResult.currentPage} totalOfPages={searchResult.totalOfPages}/>
          <InfoFooter/>     
        </div>    
    </C.Container>

  )
}