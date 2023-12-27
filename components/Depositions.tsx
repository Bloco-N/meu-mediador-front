import styles from '../src/styles/depositions.module.css'

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

      </div>

      <p> {text} </p>

      <div>
        <p> {name} </p>
        <span> {title} </span>
      </div>
    </div>
  )
}