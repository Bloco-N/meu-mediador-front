import Image from "next/image";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
import { UserContextType } from "@/types/UserContextType";
import { useRouter } from "next/router";

const FooterStyle = styled.div`
    display: none;
    background-color: transparent;
    width: 100%;
    height: 90px;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 25px 0 30px 0;
    position: relative;
    @media (max-width: 820px) {
        display: flex;
      }
    
    .selection{
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 80px;
      right: 25rem;
      gap: 1rem;
      background-color: #fff;
      border-radius: 1rem;
      padding: 1rem;
      height: 5rem;
      transform: translateY(-5px);
      z-index: 8888;
    }
    .locale{
      width: 40px;
      max-height: 60px;
      height: 100%;
      background-color: #fff;
      border: none;
      padding: 0.2rem;
      font-size: 1.3rem;
      border-radius: 0;

      option{
        background-color: transparent;
        padding: 1rem;
        width: 100%;
        border-radius: 0;
      }
    }
`

const Footer = () => {

    const { user } = useContext(UserContext) as UserContextType

    const [flag, setFlag] = useState('PT')
    const [defaultLocale, setDefaultLocale] = useState('pt')

    const [pic, setPic] = useState('')

    const router = useRouter()

    const { id } = router.query

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      let locale = localStorage.getItem('locale')
      if(!locale) locale = router.locale as string
      const localeSet = document.getElementById('locale-set-footer') as HTMLSelectElement
      localeSet.value = locale
      setDefaultLocale(locale)
      
      if(locale === 'en'){
        setFlag('GB')
      }else{
        setFlag(locale.toUpperCase())
      }
      
      if(id && typeof id === 'string'){
        const finalPath = router.asPath.replace('[id]', id)
        router.push(finalPath, finalPath, { locale })
      }else if(id){
        router.push(router.asPath, router.asPath, { locale })
      }
      
    }, [])

    const changeLocation = (e:React.ChangeEvent<HTMLSelectElement>) => {
      const locale = e.target.value as string
      localStorage.setItem('locale', locale)
      router.push(router.asPath, router.asPath, { locale })
      setDefaultLocale(locale)
      if(locale === 'en'){
        setFlag('GB')
      }else{
        setFlag(locale.toUpperCase())
      }

    }

    useEffect(() => { console.log(defaultLocale)}, [defaultLocale])

    useEffect(() => {
      const profilePicture = localStorage.getItem('pic')
      if(profilePicture === "undefined") return
      if(user.profilePicture) setPic(user.profilePicture)
      else if(profilePicture && profilePicture !== 'null') setPic(profilePicture)
    }, [user])

    return (
      <>
        <FooterStyle>
            <div className="selection border">
                  <Image
                    alt="United States"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
                    width={20}
                    height={20}
                  />
                  <select id="locale-set-footer" name="language" onChange={e => changeLocation(e)} className="locale">
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                    <option value="es">ES</option>
                  </select>
                </div>
        </FooterStyle>
        </>
    );
};

export default Footer;