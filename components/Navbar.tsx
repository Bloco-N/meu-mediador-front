import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';

const Nav = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 4.5rem 8rem;
`

const Navbar = () => {
    return (
        <Nav>
            <h1>Meu mediador</h1>
            <Link href="/sign-in">
                <Image src={'/profile.svg'} alt={'Profile'} width={60} height={60}></Image>
            </Link>
        </Nav>
    );
};

export default Navbar;