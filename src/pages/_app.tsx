import '@/styles/globals.css'
import Layout from 'components/Layout'
import UserContext from 'context/UserContext'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { User } from 'types/User'

export default function App({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState<User>({
    token:''
  })

  useEffect(() => {
    setUser({
      token: localStorage.getItem('token') as string
    })
  }, [])

  return (
    <UserContext.Provider value = {{user, setUser}}>      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
    ) 
}
