import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from './Navbar';

type LayoutProps = {
  children: ReactNode
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  main{
    width: 100%;
    height: 80%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export default function Layout({ children } : LayoutProps) {

    const [path, setPath] = useState('')
    const router = useRouter()

    useEffect(() => {
      setPath(router.pathname)
    }, [router])

    return (
        <Container className={path === '/' ? 'home' : ''}>
          <Head>
              <title>Meoagent</title>
              <meta name="description" content="Generated by create next app" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/meoagent-favicon.png" />
          </Head>

          <Navbar />
          <main>{children}</main>
        </Container>
        
    )
}