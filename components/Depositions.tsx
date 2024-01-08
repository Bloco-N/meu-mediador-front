import styles from '../src/styles/depositions.module.css'
import Image from 'next/image'

type DepositionsProps = {
  photo?: any
  text: string
  name: string
  title: string
}

export const Depositions = ({ photo, text, name, title }: DepositionsProps) => {
  return(
    <div className={styles.card} >
      <div className={styles.photo} >
        <Image width={100} height={100} src={photo} alt='imagem do consultor' />
      </div>

      <p> {text} </p>

      <div>
        <p> {name} </p>
        <span> {title} </span>
      </div>
    </div>
  )
}