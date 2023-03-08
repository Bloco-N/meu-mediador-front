import '@/styles/globals.css'
import { UserCard } from '@/types/UserCard'
import { UserList } from '@/types/UserList'
import Layout from 'components/Layout'
import SearchContext from 'context/SearchContext'
import SearchResultContext from 'context/SearchResultContext'
import UserContext from 'context/UserContext'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { User } from 'types/User'

export default function App({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState<User>({
    token:''
  })

  const [search, setSearch] = useState('')

  const [searchResult, setSearchResult] = useState<UserList>({
    list: [] as UserCard [],
    currentPage: 0,
    totalOfPages: 0
  })

  useEffect(() => {
    setUser({
      token: localStorage.getItem('token') as string
    })
  }, [])

  return (
    <SearchContext.Provider value = {{search, setSearch}}>
      <SearchResultContext.Provider value = {{ searchResult, setSearchResult}}>
        <UserContext.Provider value = {{user, setUser}}>      
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </SearchResultContext.Provider>
    </SearchContext.Provider>
    ) 
}
