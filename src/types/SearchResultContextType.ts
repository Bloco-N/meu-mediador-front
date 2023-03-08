import { Dispatch, SetStateAction } from "react"
import { UserList } from "./UserList"

export type SearchResultContextType = {
  searchResult: UserList
  setSearchResult: Dispatch<SetStateAction<UserList>>
}