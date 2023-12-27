import styles from '../src/styles/depositions.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Depositions } from "./Depositions";
import { useMediaQuery } from 'usehooks-ts'
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import user from '../public/user.svg'

export const Carousel = () => {
  const matches = useMediaQuery('(min-width: 601px) and (max-width: 900px)')
  const matchesMobile = useMediaQuery('(max-width: 600px)')

  const [match, setMatch] = useState(false)
  const [matchMobile, setMatchMobile] = useState(false)

  useEffect(() => {
    if(matches) {
      setMatch(true)
      setMatchMobile(false)
    } else if(matchesMobile) {
      setMatchMobile(true)
      setMatch(false)
    } else {
      setMatch(false)
      setMatchMobile(false)
    }
  }, [matches, matchesMobile])

  var settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
  };

  return(
    <div className={styles.carouselComponent} >
      <Slider {...settings} slidesToShow={ match ? 2 : matchMobile ? 1 : 3 } >
        <Depositions 
          photo={user}
          text="“Virei fã do Meoagent, grande aliado de qualquer consultor e que tem me ajudado muito a reforçar minha credibilidade e conseguir novos clientes!”"
          name="Wilson Silva" 
          title="Consultor imobiliário Remax" 
        />
        <Depositions 
          photo={user}
          text="“O Meoagent está na minha lista de sites obrigatórios para trabalhar, sentia muita falta de ter meu portfólio completo para apresentar ao cliente, agora tenho isso e muito mais!” " 
          name="Julia Carvalho" 
          title="Consultora ERA imobiliária" 
        />
        <Depositions 
          photo={user}
          text="“Plataforma meritocrática, excelente para profissionalizar o setor e trazer qualidade para o recrutamento de consultores. Obrigatória para toda agência estar posicionada!”" 
          name="Daniel Baptista" 
          title="Broker imobiliário DS Imobiliária" 
        />
        <Depositions 
          photo={user}
          text="“A plataforma é muito completa, recomendei para todos na minha agência, faz total sentido para o consultor imobiliário!”" 
          name="Palmira António" 
          title="Consultora KW Portugal" 
        />
        <Depositions 
          photo={user}
          text="“O consultor vive de imagem e credibilidade, ter um site para consolidar todo seu histórico, dados, serviços, números, é reforçar a imagem e credibilidade de uma maneira nunca vista, o site é uma maravilha.”" 
          name="Fabiene Dantas" 
          title="Consultora Century 21" 
        />
      </Slider>
    </div>
  )
}