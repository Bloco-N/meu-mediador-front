import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import { UserContextType } from "types/UserContextType";
import ProfileMoldal from "./ProfileMoldal";

const Nav = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 6rem;
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
      background-color: var(--base);
      width: 15rem;
      text-align: center;
      border-radius: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      transition: all .5s;
      z-index: 2;
    }
    .profile{
      cursor: pointer;
    }
`

const Navbar = () => {

    const { user } = useContext(UserContext) as UserContextType

    const [open, setOpen] = useState(false)

    const [openProfile, setOpenProfile] = useState(false)

    return (
        <Nav>
            <Link href="/">
                <h1>Meoagent</h1>
            </Link>
            {user.token ? (
                <Image onClick={() => setOpenProfile(!openProfile)} className="profile" src={'/profile.svg'} alt={'Profile'} width={60} height={60}></Image>
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

            <ProfileMoldal open={openProfile} setOpen={setOpenProfile}/>

        </Nav>
    );
};

export default Navbar;