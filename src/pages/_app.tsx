import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react"
import Layout from 'components/Layout'
import type { AppProps } from 'next/app'
import ModalWrapper from 'components/ModalWrapper'

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {

  return (
    <SessionProvider session={session}>
      <ModalWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalWrapper>
    </SessionProvider>
    
    ) 
}
