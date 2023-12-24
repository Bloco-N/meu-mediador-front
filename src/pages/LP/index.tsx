import styles from '../../styles/lp.module.css'
import Image from 'next/image'

import man from '../../../public/man-form.webp'

const LP = () => {
  return(
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
    </div>
  )
}

export default LP