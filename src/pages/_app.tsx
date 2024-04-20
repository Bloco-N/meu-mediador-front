import '@/styles/globals.css'
import Layout from '@components/Layout/Layout'
import type { AppProps } from 'next/app'
import ModalWrapper from 'components/ModalWrapper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from 'components/Providers/Providers'


export default function App({ Component, pageProps:{session, ...pageProps}}: AppProps) {
  return (
    <Providers>
        <ModalWrapper>
          <ToastContainer autoClose={3000} limit={1}/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalWrapper>
    </Providers>
    
    ) 
}