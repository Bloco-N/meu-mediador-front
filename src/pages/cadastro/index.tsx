import styles from '../../../src/styles/lp.module.css'
import Image from 'next/image'

import man from '../../../public/man-form.webp'
import finalMan from '../../../public/man-final.webp'
import { Carousel } from 'components/Carousel'
import { useState } from 'react'
import router from 'next/router'
import Link from 'next/link'
import { useMediaQuery } from 'usehooks-ts'

export default function Cadastro() {
  const matches = useMediaQuery('(min-width: 1400px)')
  const matchesTablet = useMediaQuery('(max-width: 1180px)')

  const [type, setType] = useState<"consultor" | "cliente" | "agência">("consultor")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const onSubmit = (e: any) => {
    if(type === "agência") {
      fetchAgencyData()
    } else if(type === "cliente") {
      fetchClientData()
    } else if(type === "consultor") {
      fetchRealtorData()
    } else {
      alert("Ops, algo errado!")
      e.preventDefault()
    }
  }

  const fetchAgencyData = async() => {
    if(password != confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    const urlFetch = process.env.NEXT_PUBLIC_API_URL + "/agency/sign-up";
    const body = {
      name,
      email,
      password,
    }

    const response = await fetch(urlFetch, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) router.push("/sign-in/agency");
  }

  const fetchClientData = async() => {
    if(password != confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    const urlFetch = process.env.NEXT_PUBLIC_API_URL + "/client/sign-up";
    const body = {
      name,
      lastName,
      email,
      password,
    }

    const response = await fetch(urlFetch, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) router.push("/sign-in/client");
  }

  const fetchRealtorData = async() => {
    if(password != confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    const urlFetch = process.env.NEXT_PUBLIC_API_URL + '/realtor/sign-up'
    const body = {
      name,
      lastName,
      email,
      password,
    }

    const response = await fetch(urlFetch, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if(response.ok) router.push('/sign-in/realtor')
  }

  return (
    <>
    <div className={styles.container} >
      <div className={styles.hero} >
        <div className={styles.contentSection1} >
          <div className={styles.textDiv} style={{ paddingTop: type === "agência" && matches ? '100px' : type === "agência" && matchesTablet ? '80px' : '' }} >
            <h1>A ferramenta obrigatória para todo consultor imobiliário</h1>
            <Link href="/sign-up/profile">100% gratuito - Cadastre-se agora!</Link>
            <p>
            Tenha mais negócios e eleve sua faturação, seja encontrado por mais clientes, consultores e tenha toda sua trajetória vitoriosa no imobiliário registrada!
            </p>
            <br />
            <p>
            O Meoagent é um site gratuito onde você pode cadastrar seu currículo, imóveis, serviços, histórico, tudo relacionado ao imobiliário! Eleve sua credibilidade para outro nível e seja encontrado por recrutadores.
            </p>
            <br />
            <p>
            O Meoagent é um site feito para consultores, agências e clientes. Solução completa, fácil de usar e meritocrática!
            </p>
          </div>
          <div id='cadastro' className={styles.formDiv} >
            <div className={styles.divImage} >
              <Image src={man} alt='man pointing' />
              <p>Preencha o formulário abaixo e crie seu cadastro!</p>
            </div>
            <div className={styles.form} >
              <form onSubmit={(e) => onSubmit(e)}>
                <div>
                  <select value={type} onChange={(e: any) => setType(e.target.value)} name="type">
                    <option value="consultor">Consultor</option>
                    <option value="agência">Agência</option>
                    <option value="cliente">Cliente</option>
                  </select>
                </div>
                <div>
                  <input 
                    required
                    type="text" 
                    name='name' 
                    id='name' 
                    placeholder='Nome' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                { type === "agência" ? '' : (
                  <div>
                    <input 
                      required
                      type="text" 
                      name='lastname' 
                      id='lastname' 
                      placeholder='Sobrenome' 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                ) }
                <div>
                  <input 
                    required
                    type="text" 
                    name='email' 
                    id='email' 
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    required
                    type="password" 
                    name='password' 
                    id='password' 
                    placeholder='Senha' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    required
                    type="password" 
                    name='confirmPassword' 
                    id='confirmPassword' 
                    placeholder='Confirme sua senha' 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div >
                  <input className={styles.submitButton} type="submit" value="Criar meu cadastro no Meoagent agora!" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.diagonalDiv}>
        <div className={styles.title2} >
          <h2>O que consultores imobiliários falam do Meoagent</h2>
        </div>
        <div className={styles.carouselDiv} >
          <Carousel />
        </div>
      </div>
      <div className={styles.finalDiv} >
        <div className={styles.textFinal} >
          <h3>O que é o Meoagent?</h3>
          <p>
            O Meoagent é uma plataforma criada em Portugal, especializada no setor imobiliário que visa facilitar a conexão, visibilidade e troca de informação entre consultores, agências e clientes em todo o mundo.
          </p>

          <h4>O site é para qual público?</h4>
          <ul>
            <li>Para o consultor que quer levar sua credibilidade para outro nível.</li>
            <li>Para o consultor que quer aumentar seu faturamento.</li>
            <li>Para a agência que quer encontrar e recrutar os melhores consultores.</li>
            <li>Para a agência que quer levar sua credibilidade para outro nível.</li>
            <li>Para clientes que querem contratar serviços dos melhores consultores e agências imobiliárias.</li>
          </ul>
        </div>
        <div className={styles.finalImage} >
          <Image src={finalMan} alt='man with a laptop' />
          <a href="#cadastro">Quero me cadastrar no Meoagent agora!</a>
        </div>
      </div>
      <footer className={styles.footer} >Copyright © 2023 Meoagent – Todos os direitos reservados</footer>
    </div>
    </>
  )
}