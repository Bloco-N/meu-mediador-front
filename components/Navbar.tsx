import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "./ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from '../public/profile.svg'
import { useRouter } from "next/router";

const Nav = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 6rem;
    position: relative;
    @media only screen and (max-width: 450px){
      padding: 1rem;
      align-items: center;
    }
    .logo{
      height: 5rem;
      @media only screen and (max-width: 450px){
        height: 3rem;
      }
    }
    .left-side{
      display: flex;
      align-items: center;
      gap: 3rem;
    }
    .locale{
      width: 5rem;
      height: 5rem;
      background-color: transparent;
      border: none;
      padding: 0.2rem;
      font-size: 1.3rem;
      option{
        background-color: transparent;
        padding: 1rem;
      }
    }
    a {
        text-decoration: none;
    }
    p{
      font-size: 1.8rem;
      cursor: pointer;
    }
    .login{
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-top: 1rem;
      position: absolute;
      top: 3rem;
      right: 6rem;
      transition: all .5s;
      background-color: var(--surface);
      border: solid 0.1rem var(--border-color );
      width: 15rem;
      text-align: center;
      border-radius: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      transition: all .5s;
      z-index: 2;
      @media only screen and (max-width: 500px){
        position: relative;
        top: 0;
        right: 0;
      }
    }
    .selection{
      position: absolute;
      display: flex;
      align-items: center;
      right: 25rem;
      gap: 1rem;
      background-color: var(--surface);
      border-radius: 1rem;
      padding: 1rem;
      height: 5rem;
      @media (max-width: 500px) {
        position: relative;
        right: 0;

      }
      @media only screen and (max-width: 250px){
      }
    }
    .profile{
      cursor: pointer;
      border-radius: 50%;
      object-fit: cover;
    }
`

const Navbar = () => {

    const { user } = useContext(UserContext) as UserContextType

    const [open, setOpen] = useState(false)

    const [flag, setFlag] = useState('GB')

    const [defaultLocale, setDefaultLocale] = useState('')

    const [openProfile, setOpenProfile] = useState(false)

    const [pic, setPic] = useState('')

    const router = useRouter()

    const { id } = router.query

    const pdfPage = router.query.pdf?true:false;
    useEffect(() => {
      let locale = localStorage.getItem('locale')
      if(!locale) locale = router.locale as string
      const localeSet = document.getElementById('locale-set') as HTMLSelectElement
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
      }else{
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
        <Nav>
            <Link href="/">
                <h1><img className="logo" src="/meoagent-logo.png" alt="Meoagent-logo" /></h1>
            </Link>
            {pdfPage || <>
              <div className="left-side">
                <div className="selection border">
                  <Image
                    alt="United States"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
                    width={20}
                    height={20}
                  />
                  <select id="locale-set" onChange={e => changeLocation(e)} className="locale">
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                    <option value="es">ES</option>
                  </select>
                </div>
                {user.token ? (
                    <Image onClick={() => setOpenProfile(!openProfile)} className="profile" src={pic ? pic :  profileIcon} alt={'Profile'} width={60} height={60}/>
                ): (
                    <div
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                      className = { open ? 'login' : 'login closed'}
                      >
                      <p>
                        LOGIN
                      </p>
                      <LoginMoldal open={ open } setOpen = { setOpen }/>
                    
                    </div>
                )}
              </div>

              <ProfileMoldal open={openProfile} setOpen={setOpenProfile}/>
            </>
              }
        </Nav>
    );
};

export default Navbar;