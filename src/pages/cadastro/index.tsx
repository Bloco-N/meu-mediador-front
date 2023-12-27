import styles from '../../../src/styles/lp.module.css'
import Image from 'next/image'

import man from '../../../public/man-form.webp'
import finalMan from '../../../public/man-final.webp'
import { Carousel } from 'components/Carousel'

export default function Cadastro() {
  return (
    <>
    <div className={styles.container} >
      <div className={styles.hero} >
        <div className={styles.contentSection1} >
          <div className={styles.textDiv} >
            <h1>A ferramenta obrigatória para todo consultor imobiliário</h1>
            <a href="#">100% gratuito - Cadastre-se agora!</a>
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
          <div className={styles.formDiv} >
            <div className={styles.divImage} >
              <Image src={man} alt='man pointing' />
              <p>Preencha o formulário abaixo e crie seu cadastro!</p>
            </div>
            <div className={styles.form} >
              <form action="">
                <div>
                  <select name="type">
                    <option value="" disabled selected>Sou consultor</option>
                    <option value="Consultor">Consultor</option>
                    <option value="Agência">Agência</option>
                    <option value="Cliente">Cliente</option>
                  </select>
                </div>
                <div>
                  <input type="text" name='name' id='name' placeholder='Nome' />
                </div>
                <div>
                  <input type="text" name='lastname' id='lastname' placeholder='Sobrenome' />
                </div>
                <div>
                  <input type="text" name='email' id='email' placeholder='Email' />
                </div>
                <div>
                  <input type="password" name='password' id='password' placeholder='Senha' />
                </div>
                <div>
                  <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirme sua senha' />
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
          <h2>O que os consultores imobiliários falam do Meoagent</h2>
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
          <a href="#">Quero me cadastrar no Meoagent agora!</a>
        </div>
      </div>
      <footer className={styles.footer} >Copyright © 2023 Meoagent – Todos os direitos reservados</footer>
    </div>
    </>
  )
}