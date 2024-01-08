import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react"
import Layout from 'components/Layout'
import type { AppProps } from 'next/app'
import ModalWrapper from 'components/ModalWrapper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {

  return (
    <SessionProvider session={session}>
        <ModalWrapper>
      <ToastContainer autoClose={3000} limit={1}/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalWrapper>
    </SessionProvider>
    
    ) 
}
